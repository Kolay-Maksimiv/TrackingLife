import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable()
export class HttpClientService {
  private static readonly API: string = environment.apiUrl;
  public static readonly WEB: string = environment.webUrl;
  public static readonly TOKEN: string = environment.tokenUrl;

  // IdentityServer
  public static readonly IDENTITY_SERVER_CONNECT = HttpClientService.TOKEN + '/connect/token';
  // Login Controller
  public static readonly LOGIN_CONTROLLER = HttpClientService.API + '/Accounts/login';
  public static readonly FORGOTPASSWORD_CONTROLLER = HttpClientService.API + '/Accounts/forgot-password';
  public static readonly RESETPASS_CONTROLLER = HttpClientService.API + '/Accounts/reset-password';
  public static readonly UPDATEPASS_CONTROLLER = HttpClientService.API + '/Accounts/password';
  public static readonly REGISTRATION_CONTROLLER = HttpClientService.API + '/Accounts/registration';
  public static readonly CREATEUSER_CONTROLLER = HttpClientService.API + '/Accounts/create';

  // Categories Controller
  public static readonly BALANCES_CONTROLLER = HttpClientService.API + "/accountBalances";
  public static readonly TRANSACTION_CONTROLER  = HttpClientService.API + "/transactions";


   public static readonly ACCOUNTS_CONTROLLER = HttpClientService.API + "/accounts";
   public static readonly ACCOUNTS_RESTORE_PASSWORD = HttpClientService.ACCOUNTS_CONTROLLER + "/restore-password";
   public static readonly ACCOUNTS_PASSWORD = HttpClientService.ACCOUNTS_CONTROLLER + "/password";

   
  private readonly loginUrl: string = environment.loginUrl;

  constructor(private httpClient: HttpClient,
    private router: Router) {
  }

  public get(url: string,
    params?: any | null,
    isNonAuthRequest?: boolean | false): Observable<any> {
    return this.httpClient.get(url, this.getOptions(params, false, isNonAuthRequest));
  }

  public post(url: string,
    body?: any | null,
    params?: any | null,
    isFormData?: boolean | false,
    isNonAuthRequest?: boolean | false): Observable<any> {
    return this.httpClient.post(url, body, this.getOptions(params, isFormData, isNonAuthRequest));
  }

  public put(url: string,
    body?: any | null): Observable<any> {
    return this.httpClient.put(url, body, this.getOptions());
  }

  public delete(url: string,
    params?: any | null): Observable<any> {
    return this.httpClient.delete(url, this.getOptions(params));
  }

  public getToken() {
    //let token = this._authService.accessToken;
    //TODO uncomment

    //token = this.localStorage.getData(DBkeys.ACCESS_TOKEN);

    //if (token === null)
    //  this.router.navigate([this.loginUrl]);
    //return token;
  }

  private getOptions(params?,
    isFormData?,
    isNonAuthRequest?) {
    let options = {
      headers: this.getAuthHeaders(isFormData, isNonAuthRequest),
      params: params
    };
    return options;
  }

  private getAuthHeaders(isFormData?: boolean, isNonAuthRequest?: boolean): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('client_id', 'news_now_spa');

    if (!isNonAuthRequest) {
      let token = 'Bearer ' + this.getToken();
      headers = headers.append('Authorization', token);
    }

    if (!isFormData)
      headers = headers.append('Content-Type', 'application/json');

    return headers;
  }
}
