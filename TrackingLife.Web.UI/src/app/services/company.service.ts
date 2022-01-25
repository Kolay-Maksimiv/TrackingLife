import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { CompanyModel } from 'app/models/company/companies.model';
import { catchError, tap } from 'rxjs/operators';
import { HttpClientService } from 'app/shared/http-client/http-client.service';
import { AuthService } from 'app/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  myHeaders: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json;");

  constructor(private http: HttpClient, private router: Router, private _authService: AuthService) {
  }

  getCompanies() {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
        let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
        this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
        this.myHeaders = this.myHeaders.append('Authorization', token);
        this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    return this.http.get<CompanyModel[]>(HttpClientService.COMPANIES_CONTROLLER, { headers: this.myHeaders})
      .pipe(tap(resData => {
      }));
  }

  getCompanyById(id: number) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
        let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
        this.myHeaders = this.myHeaders.append('Authorization', token);
        this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
        this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
        //NEWS_CONTROLLER
    return this.http.get<CompanyModel>(HttpClientService.COMPANIES_CONTROLLER.concat("/", id.toString()), { headers: this.myHeaders })
      .pipe(tap(resData => {
      }));
  }

  createCompany(data: CompanyModel) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    return this.http.post(HttpClientService.POST_CONTROLLER, data, { headers: this.myHeaders})
      .pipe(tap(resData => {
      }));
  }


  editCompany(data: CompanyModel) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    return this.http.put(HttpClientService.POST_CONTROLLER, data, { headers: this.myHeaders})
      .pipe(tap(resData => {
      }));
  }

  deleteCompany(id: number) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.delete(HttpClientService.POST_CONTROLLER.concat("/", id.toString()), { headers: this.myHeaders })
      .pipe(tap(resData => {
      }));
  }

}
