import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientService } from 'app/shared/http-client/http-client.service';
import { UserVisitingDto } from 'app/models/analytics/userVisitingDto.model';
import { AnalyticsPeriod } from 'app/enums/AnalyticsPeriod';
import { tap } from 'rxjs/operators';
import { UsersCommentDto } from 'app/models/analytics/usersCommentDto.model';
import { NewsEmojiDto } from 'app/models/analytics/newsEmojiDto.model';
import { PopularNewsDto } from 'app/models/analytics/popularNewsDto.model';
import { PopularCategoriesDto } from 'app/models/analytics/popularCategoriesDto.model';
import { NotificationDto } from 'app/models/analytics/notificationDto.model';
import { ViewsNewsDto } from 'app/models/analytics/viewsNewsDto.model';
import { OpenedAppDto } from 'app/models/analytics/openedAppDto.model';
import { AuthService } from 'app/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AnalyticsService{
    myHeaders: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json;");

    constructor(private http: HttpClient, private router: Router, private _authService: AuthService) {
    }

    getRegistrationAnalitics(period: AnalyticsPeriod) {
        this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
            let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
            this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
            this.myHeaders = this.myHeaders.append('Authorization', token);
            this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    
        return this.http.get<UserVisitingDto[]>(HttpClientService.ANALYTICS_GETREGISTRATION, { headers: this.myHeaders, params: {
            period:  String(period)
        }})
          .pipe(tap(resData => {
          }));
      }

      getLogInAnalitics(period: AnalyticsPeriod) {
        this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
            let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
            this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
            this.myHeaders = this.myHeaders.append('Authorization', token);
            this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    
        return this.http.get<UserVisitingDto[]>(HttpClientService.ANALYTICS_GETLOGIN, { headers: this.myHeaders, params: {
            period:  String(period)
        }})
          .pipe(tap(resData => {
          }));
      }

      getCommentAnalitics(period: AnalyticsPeriod) {
        this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
            let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
            this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
            this.myHeaders = this.myHeaders.append('Authorization', token);
            this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    
        return this.http.get<UsersCommentDto[]>(HttpClientService.ANALYTICS_GETCOMMENT, { headers: this.myHeaders, params: {
            period:  String(period)
        }})
          .pipe(tap(resData => {
          }));
      }

      getEmojiAnalitics(period: AnalyticsPeriod) {
        this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
            let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
            this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
            this.myHeaders = this.myHeaders.append('Authorization', token);
            this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    
        return this.http.get<NewsEmojiDto[]>(HttpClientService.ANALYTICS_GETEMOJI, { headers: this.myHeaders, params: {
            period:  String(period)
        }})
          .pipe(tap(resData => {
          }));
      }

      getPopularNewsAnalitics(period: AnalyticsPeriod) {
        this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
            let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
            this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
            this.myHeaders = this.myHeaders.append('Authorization', token);
            this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    
        return this.http.get<PopularNewsDto[]>(HttpClientService.ANALYTICS_GETPOPULARNEWS, { headers: this.myHeaders, params: {
            period:  String(period)
        }})
          .pipe(tap(resData => {
          }));
      }

      getPopularCategoriesAnalitics(period: AnalyticsPeriod) {
        this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
            let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
            this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
            this.myHeaders = this.myHeaders.append('Authorization', token);
            this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    
        return this.http.get<PopularCategoriesDto[]>(HttpClientService.ANALYTICS_GETPOPULARNCATEGORIES, { headers: this.myHeaders, params: {
            period:  String(period)
        }})
          .pipe(tap(resData => {
          }));
      }

      getNotificationAnalitics(period: AnalyticsPeriod) {
        this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
            let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
            this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
            this.myHeaders = this.myHeaders.append('Authorization', token);
            this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    
        return this.http.get<NotificationDto[]>(HttpClientService.ANALYTICS_GETNOTIFICATION, { headers: this.myHeaders, params: {
            period:  String(period)
        }})
          .pipe(tap(resData => {
          }));
      }

      getOpenAppNotificationAnalitics(period: AnalyticsPeriod) {
        this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
            let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
            this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
            this.myHeaders = this.myHeaders.append('Authorization', token);
            this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    
        return this.http.get<NotificationDto[]>(HttpClientService.ANALYTICS_GETOPENAPPNOTIFICATION, { headers: this.myHeaders, params: {
            period:  String(period)
        }})
          .pipe(tap(resData => {
          }));
      }

      getViewsNewsAnalitics(period: AnalyticsPeriod) {
        this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
            let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
            this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
            this.myHeaders = this.myHeaders.append('Authorization', token);
            this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    
        return this.http.get<ViewsNewsDto[]>(HttpClientService.ANALYTICS_GETVIEWSNEWS, { headers: this.myHeaders, params: {
            period:  String(period)
        }})
          .pipe(tap(resData => {
          }));
      }

      getOpenAppAnalitics(period: AnalyticsPeriod) {
        this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
            let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
            this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
            this.myHeaders = this.myHeaders.append('Authorization', token);
            this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    
        return this.http.get<OpenedAppDto[]>(HttpClientService.ANALYTICS_GETOPENEDAPPANALYTICS, { headers: this.myHeaders, params: {
            period:  String(period)
        }})
          .pipe(tap(resData => {
          }));
      }
}
