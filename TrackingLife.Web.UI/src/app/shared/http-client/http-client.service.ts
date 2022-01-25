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
  // public static readonly CATEGORIES_DROPDOWNLIST_CONTROLLER = HttpClientService.CATEGORIES_CONTROLLER + "/dropdownlist";
  // public static readonly CATEGORIES_GET_BY_FILTER_CONTROLLER = HttpClientService.CATEGORIES_CONTROLLER + "/GetCategoriesByFilter";

  // News Controller
  public static readonly NEWS_CONTROLLER = HttpClientService.API + "/news";
  public static readonly NEWS_СREATE_CONTROLLER = HttpClientService.NEWS_CONTROLLER + "/add-news";
  public static readonly NEWS_DETAILS_CONTROLLER = HttpClientService.NEWS_CONTROLLER + "/Details";
  public static readonly NEWS_CONTROLLER_UPLOAD = HttpClientService.NEWS_CONTROLLER + "/upload";
  public static readonly NEWS_CONTROLLER_FILE_UPLOAD = HttpClientService.NEWS_CONTROLLER + "/upload-external";
  public static readonly NEWS_CONTROLLER_FILE_DOWNLOAD = HttpClientService.NEWS_CONTROLLER + "/download";
  public static readonly NEWS_CONTROLLER_FILE_ATTACH = HttpClientService.NEWS_CONTROLLER + "/attach";
  public static readonly NEWS_CONTROLLER_EDIT = HttpClientService.NEWS_CONTROLLER + "/edit";


  // Companies Controller
  public static readonly COMPANIES_CONTROLLER = HttpClientService.API + "/companies";

  // Users Controller
  public static readonly USERS_CONTROLLER = HttpClientService.API + "/users";
  public static readonly ACTIVATE_USER = HttpClientService.USERS_CONTROLLER + "/activate";
  public static readonly EXPORT_CSV = HttpClientService.USERS_CONTROLLER + "/export";

  // Companies Controller
  public static readonly POST_CONTROLLER = HttpClientService.API + "/companies";
  public static readonly EDIT_COMPANY = HttpClientService.POST_CONTROLLER + "/edit";
  public static readonly CREATE_COMPANY = HttpClientService.POST_CONTROLLER + "/create";
  public static readonly DELETE_COMPANY = HttpClientService.POST_CONTROLLER + "/delete";


  // Settings Controller
  public static readonly SETTINGS_CONTROLLER = HttpClientService.API + "/settings";

   // AccountController

   public static readonly ACCOUNTS_CONTROLLER = HttpClientService.API + "/accounts";
   public static readonly ACCOUNTS_RESTORE_PASSWORD = HttpClientService.ACCOUNTS_CONTROLLER + "/restore-password";
   public static readonly ACCOUNTS_PASSWORD = HttpClientService.ACCOUNTS_CONTROLLER + "/password";

   //AnalyticsConroller
   public static readonly ANALYTICS_CONTROLLER = HttpClientService.API + "/Analytics";
   public static readonly ANALYTICS_DASHBOARD = HttpClientService.ANALYTICS_CONTROLLER + "/dashboard";
   public static readonly ANALYTICS_GETREGISTRATION = HttpClientService.ANALYTICS_CONTROLLER + "/get-registration-analitics";
   public static readonly ANALYTICS_GETLOGIN= HttpClientService.ANALYTICS_CONTROLLER + "/get-login-analitics";
   public static readonly ANALYTICS_GETCOMMENT= HttpClientService.ANALYTICS_CONTROLLER + "/get-comment-analitics";
   public static readonly ANALYTICS_GETEMOJI= HttpClientService.ANALYTICS_CONTROLLER + "/get-emoji-analitics";
   public static readonly ANALYTICS_GETPOPULARNEWS= HttpClientService.ANALYTICS_CONTROLLER + "/get-popular-articles-analitics";
   public static readonly ANALYTICS_GETPOPULARNCATEGORIES= HttpClientService.ANALYTICS_CONTROLLER + "/get-popular-categories-analitics";
   public static readonly ANALYTICS_GETNOTIFICATION= HttpClientService.ANALYTICS_CONTROLLER + "/get-notification-analitics";
   public static readonly ANALYTICS_GETOPENAPPNOTIFICATION= HttpClientService.ANALYTICS_CONTROLLER + "/get-openapp-notification";
   public static readonly ANALYTICS_GETVIEWSNEWS= HttpClientService.ANALYTICS_CONTROLLER + "/get-views-news-analitics";
   public static readonly ANALYTICS_GETOPENEDAPPANALYTICS= HttpClientService.ANALYTICS_CONTROLLER + "/get-openapp-analytics";
  
   //WellnessCategoryController
   public static readonly WELLNESS_CATEGORY_CONTROLLER = HttpClientService.API + "/wellness-categories";
   public static readonly CREATE_WELLNESS_CATEGORY = HttpClientService.WELLNESS_CATEGORY_CONTROLLER + "/add-wellness-category";
   public static readonly WELLNESS_CATEGORY_UPLOAD = HttpClientService.WELLNESS_CATEGORY_CONTROLLER + "/upload";

   //WellnessLinkController
   public static readonly WELLNESS_LINK_CONTROLLER = HttpClientService.API + "/wellness-links";
   public static readonly GET_WELLNESS_LINK = HttpClientService.WELLNESS_LINK_CONTROLLER + "/get-links";
   public static readonly CREATE_WELLNESS_LINK = HttpClientService.WELLNESS_LINK_CONTROLLER + "/add-wellness-link";
   public static readonly WELLNESS_LINK_UPLOAD = HttpClientService.WELLNESS_LINK_CONTROLLER + "/upload";
   public static readonly WELLNESS_LINK_UPLOADFILE = HttpClientService.WELLNESS_LINK_CONTROLLER + "/upload-file";
   
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
