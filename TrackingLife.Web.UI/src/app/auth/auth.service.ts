import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { LoginModel } from 'app/models/auth/login-model';
import { User } from 'app/models/auth/user.model';
import { RegistrationModel } from 'app/models/auth/registration.model';
import { JwtHelper } from 'app/helper/jwtHelper';
import { HttpClientService } from 'app/shared/http-client/http-client.service';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  //   user = new Subject<User>();
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTime: any;
  private _jwtHelper = new JwtHelper();
  myHeaders: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient, private router: Router) {
  }

  login(data: LoginModel) {

    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.post<LoginResponseModel>(HttpClientService.LOGIN_CONTROLLER, data, { headers: this.myHeaders })
      .pipe(tap(resData => {

        localStorage.setItem('dataSource', resData.token);
        localStorage.setItem('organisationName', resData.organisationName);

       let expiresIn = JSON.parse(localStorage.getItem('dataSource')).expires_in;

        const espirationDate = new Date(new Date().getTime() + +expiresIn * 1000); //*1000 convert from seconds to miliseconds // getTime() get time in miliseconds

        const user = new User(resData.email,
          resData.roles,
          resData.firstName,
          resData.lastName,
          resData.imageUrl,
          resData.organisationName,
          resData.userId, 
          JSON.parse(localStorage.getItem('dataSource')).access_token,
          espirationDate);

        localStorage.setItem('currentUser', JSON.stringify(user));
        this.user.next(user);
        this.autoLogout(+expiresIn * 1000);
      }));
  }

  registration(data: RegistrationModel) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
    const jsonData = JSON.stringify(data);
    return this.http.post(HttpClientService.REGISTRATION_CONTROLLER, jsonData, { headers: this.myHeaders })
      .pipe(tap(resData => {

        this.router.navigate(['/login']);
        //var loginModel = new LoginModel(resData.email, resData.password);
        //this.login(loginModel);
      }));
  }

  forgotPasswordCodeRequest(email: string){
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

  forgotPasswordCodeSubmit(email: string, code: string){
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
    
    var data = {
      Email: email,
      Code: code,
      CallbackUrl: environment.webUrl
    };
    return this.http.post<{token: string}>(HttpClientService.RESETPASS_CONTROLLER, data, { headers: this.myHeaders })
    .pipe(tap(resData => {
    }));
  }

  forgotPasswordPasswordSubmit(email: string, code: string,newPassword: string, confirmPassword: string, token: string){
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
    return this.http.post<{token: string}>(HttpClientService.UPDATEPASS_CONTROLLER, data, { headers: this.myHeaders })
    .pipe(tap(resData => {
    }));
  }


  logout() {
    this.user.next(null);

    if (this.tokenExpirationTime) {
      clearTimeout(this.tokenExpirationTime);
    }
    this.tokenExpirationTime = null;

    this.router.navigate(['/login']);

    localStorage.removeItem('dataSource');
    localStorage.removeItem('currentUser');
  }

  autoLogin() {
    if (!localStorage.getItem('userSource')) {
      return;
    }
    
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if(currentUser != null){
      if(new Date(currentUser._tokenExpirationDate).getTime() < new Date().getTime()){
        return;
      }
    }

    const userData: {
      email: string,
      roles: string[],
      firstName: string,
      lastName: string,
      imageUrl: string,
      organisationName: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userSource'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.roles,
      userData.firstName,
      userData.lastName,
      userData.imageUrl,
      userData.organisationName,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);

      //userData._tokenExpirationDate = JSON.parse(localStorage.getItem('dataSource')).expires_in;
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime() // getTime() get time in miliseconds
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTime = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  get currentUser(): User {
    if(JSON.parse(localStorage.getItem('dataSource')) == null 
      || JSON.parse(localStorage.getItem('dataSource')) == undefined
      || JSON.parse(localStorage.getItem('currentUser')) == null ){
      this.logout();
      return null;
    }

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if(currentUser != null){
      if(new Date(currentUser._tokenExpirationDate).getTime() > new Date().getTime()){
        var token = JSON.parse(localStorage.getItem('dataSource')).access_token;
      }else{
        this.logout();
        return null;
      }
    }
    return this.decodeUserFromToken(token);
  }

  getTokenIfValid(){
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if(currentUser != null){
      if(new Date(currentUser._tokenExpirationDate).getTime() > new Date().getTime()){
        var token = JSON.parse(localStorage.getItem('dataSource')).access_token;
        return token;
      }else{
        return null;
      }
    }
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
    currentUser.roles = decoded['roles'];
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
