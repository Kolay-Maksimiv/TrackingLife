import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { LoginModel } from 'app/models/auth/login-model';
import { User } from 'app/models/auth/user.model';
import { RegistrationModel } from 'app/models/auth/registration.model';
import { JwtHelper } from 'app/helper/jwtHelper';
import { HttpClientService } from 'app/shared/http-client/http-client.service';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTime: any;
  private _jwtHelper = new JwtHelper();
  myHeaders: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient, private router: Router, private _authService: AuthService) {
  }

  private refreshTokenTimeout;

  private startRefreshTokenTimer() {
    var accessToken = localStorage.getItem('access_token');

    const jwtToken = JSON.parse(atob(accessToken.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now();

    console.log(`Next refresh in ${timeout / 1000}s`);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  getAccessToken() {
    return 'Bearer ' + localStorage.getItem('access_token');
  }

  refreshToken() {

    this.myHeaders = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");

    var refreshToken = localStorage.getItem('refresh_token')

    let refreshBody = new URLSearchParams();
    refreshBody.set('refresh_token', refreshToken);
    refreshBody.set('grant_type', "refresh_token");
    refreshBody.set('client_id', "queally_spa");

    return this.http.post<LoginResponseModel>(HttpClientService.IDENTITY_SERVER_CONNECT, refreshBody.toString(), { headers: this.myHeaders })
      .pipe(tap(result => {
        localStorage.setItem('access_token', result.access_token);
        localStorage.setItem('refresh_token', result.refresh_token);

        this.startRefreshTokenTimer();
      }));

  }

  login(data: LoginModel) {

    this.stopRefreshTokenTimer();

    this.myHeaders = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");

    let loginBody = new URLSearchParams();
    loginBody.set('username', data.email);
    loginBody.set('password', data.password);
    loginBody.set('grant_type', "password");
    loginBody.set('client_id', "queally_spa");

    return this.http.post<LoginResponseModel>(HttpClientService.IDENTITY_SERVER_CONNECT, loginBody.toString(), { headers: this.myHeaders })
      .pipe(tap(response => {
        var accessToken = response.access_token;

        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', response.refresh_token);

        const jwtToken = JSON.parse(atob(accessToken.split('.')[1]));
        response.roles = jwtToken.role;

        this.startRefreshTokenTimer();
      }));
  }

  registration(data: RegistrationModel) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
    const jsonData = JSON.stringify(data);
    return this.http.post(HttpClientService.REGISTRATION_CONTROLLER, jsonData, { headers: this.myHeaders })
      .pipe(tap(resData => {
        this.router.navigate(['/users']);
      }));
  }

  forgotPasswordCodeRequest(email: string) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    var data = {
      Email: email,
      CallbackUrl: environment.webUrl
    };
    return this.http.post(HttpClientService.FORGOTPASSWORD_CONTROLLER, data, { headers: this.myHeaders })
      .pipe(tap(resData => {
      }));
  }

  forgotPasswordCodeSubmit(email: string, code: string) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    var data = {
      Email: email,
      Code: code,
      CallbackUrl: environment.webUrl
    };
    return this.http.post<{ token: string }>(HttpClientService.RESETPASS_CONTROLLER, data, { headers: this.myHeaders })
      .pipe(tap(resData => {
      }));
  }

  forgotPasswordPasswordSubmit(email: string, code: string, newPassword: string, confirmPassword: string, token: string) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    var data = {
      UserName: email,
      Code: code,
      NewPassword: newPassword,
      ConfirmPassword: confirmPassword,
      Token: token,
      CallbackUrl: environment.webUrl
    };
    return this.http.post<{ token: string }>(HttpClientService.UPDATEPASS_CONTROLLER, data, { headers: this.myHeaders })
      .pipe(tap(resData => {
      }));
  }

  logout() {
    this.stopRefreshTokenTimer();

    if (this.tokenExpirationTime) {
      clearTimeout(this.tokenExpirationTime);
    }
    this.tokenExpirationTime = null;

    this.router.navigate(['/login']);

    localStorage.removeItem('access_token');
  }

  get currentUser(): User {
    var token = localStorage.getItem('access_token');

    if (!token) {
      this.logout();
      return null;
    }

    if (!this.refreshTokenTimeout) {
      this.startRefreshTokenTimer();
    }

    return this.decodeUserFromToken(token);
  }

  private decodeUserFromToken(token: string): User {
    if (!token) return null;

    let decoded = this._jwtHelper.decodeToken(token);

    let currentUser = new User(null, null, null, null, null, null, null, null, null);

    currentUser.id = decoded['id'];
    currentUser.email = decoded['email'];
    currentUser.firstName = decoded['firstName'];
    currentUser.lastName = decoded['lastName'];
    currentUser.organisationName = localStorage.getItem('organisationName');
    currentUser.imageUrl = decoded['avatarUrl'];
    currentUser.roles = decoded['role'];
    return currentUser;
  }

  public resetPassword(model): Observable<any> {

    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.post(HttpClientService.ACCOUNTS_PASSWORD,
      { ...model, callbackUrl: environment.webUrl }, { headers: this.myHeaders });
  }

}
