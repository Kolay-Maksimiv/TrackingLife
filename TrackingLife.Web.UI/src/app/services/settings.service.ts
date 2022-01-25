import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { HttpClientService } from 'app/shared/http-client/http-client.service';
import { SettingsModel } from 'app/models/settings/settings.model';
import { AuthService } from 'app/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  myHeaders: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json;");

  constructor(private http: HttpClient, private router: Router, private _authService: AuthService) {
  }

  getSettings() {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
        this.myHeaders = this.myHeaders.append('Authorization', token);
        this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
        this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
    return this.http.get<SettingsModel>(HttpClientService.SETTINGS_CONTROLLER, { headers: this.myHeaders })
      .pipe(tap(resData => {
      }));
  }

  edit(data: SettingsModel) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    return this.http.put(HttpClientService.SETTINGS_CONTROLLER, data, { headers: this.myHeaders})
      .pipe(tap(resData => {
      }));
  }
}
