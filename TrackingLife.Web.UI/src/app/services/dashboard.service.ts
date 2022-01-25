import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { DashboardResponceModel } from 'app/models/dashboard/dashboard.model';
import { tap } from 'rxjs/operators';
import { HttpClientService } from 'app/shared/http-client/http-client.service';
import { DashboardFilter } from 'app/models/dashboard/dashboardFilter';
import { AuthService } from 'app/auth/auth.service';


@Injectable({ providedIn: 'root' })
export class DashboardService {
  myHeaders: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json;");

  constructor(private http: HttpClient, private router: Router, private _authService: AuthService) {
  }

  getDashbordData(filter: DashboardFilter) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
        let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
        this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
        this.myHeaders = this.myHeaders.append('Authorization', token);
        this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    return this.http.get<DashboardResponceModel>(HttpClientService.ANALYTICS_DASHBOARD, { headers: this.myHeaders, params:
       {
         dateFrom: filter.dateFrom.toDateString(),
         dateTo: filter.dateTo.toDateString() ,
         companyId: String(filter.companyId)
      }})
      .pipe(tap(resData => {
      }));
  }

}