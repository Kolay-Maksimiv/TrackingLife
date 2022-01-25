import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsersModel } from 'app/models/users/users.model';
import { tap } from 'rxjs/operators';
import { HttpClientService } from 'app/shared/http-client/http-client.service';
import { UsersSearchFilter } from 'app/models/users/usersSearchFilter';
import { ListItemsModel } from 'app/models/abstract/listItemsModel';
import { CreateUserModel } from 'app/models/auth/create-user.model';
import { environment } from 'environments/environment';
import { AuthService } from 'app/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  myHeaders: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json;");

  constructor(private http: HttpClient, private router: Router, private _authService: AuthService) {
  }

  getUsers() {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'queally_spa');
    return this.http.get<UsersModel[]>(HttpClientService.USERS_CONTROLLER, { headers: this.myHeaders })
      .pipe(tap(resData => {
      }));
  }

  getUserById(id: number) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'queally_spa');
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
    return this.http.get<UsersModel>(HttpClientService.USERS_CONTROLLER.concat("/", id.toString()), { headers: this.myHeaders })
      .pipe(tap(resData => {
      }));
  }

  createUser(data: CreateUserModel) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'queally_spa');
    return this.http.post(HttpClientService.CREATEUSER_CONTROLLER, data, { headers: this.myHeaders })
      .pipe(tap(resData => {
      }));
  }

  editUser(data: UsersModel) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'queally_spa');
    return this.http.put(HttpClientService.USERS_CONTROLLER, data, { headers: this.myHeaders })
      .pipe(tap(resData => {
      }));
  }

  getUsersByFilter(filter: UsersSearchFilter) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'queally_spa');

    return this.http.get<ListItemsModel>(HttpClientService.USERS_CONTROLLER, {
      headers: this.myHeaders, params: {
        searchKeyWordByName: filter.searchKeyWordByName,
        searchKeyWordByEmail: filter.searchKeyWordByEmail,
        searchKeyWordByCompany: filter.searchKeyWordByCompany,
        searchByAccessLevel: filter.searchByAccessLevel,
        isRemoved: String(filter.isRemoved),
        pageNumber: String(filter.pageNumber),
        take: String(filter.take),
        orderType: String(filter.orderType)
      }
    })
      .pipe(tap(resData => {
      }));
  }

  activateUser(id: string) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'queally_spa');
    return this.http.post(HttpClientService.ACTIVATE_USER.concat("/", id.toString()), null, { headers: this.myHeaders })
      .pipe(tap(resData => {
      }));
  }

  deleteUser(id: string) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'queally_spa');
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.delete(HttpClientService.USERS_CONTROLLER.concat("/", id.toString()), { headers: this.myHeaders })
      .pipe(tap(resData => {
      }));
  }

  

  exportCsv() {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'queally_spa');
    return this.http.get(HttpClientService.EXPORT_CSV, { headers: this.myHeaders, responseType: 'blob'} 
     ).pipe(tap(resData => {
    }));
  }
}

