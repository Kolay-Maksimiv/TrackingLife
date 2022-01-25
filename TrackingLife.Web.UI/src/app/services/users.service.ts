import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsersModel } from 'app/models/users/users.model';
import { tap } from 'rxjs/operators';
import { HttpClientService } from 'app/shared/http-client/http-client.service';
import { ListItemsModel } from 'app/models/abstract/listItemsModel';
import { CreateUserModel } from 'app/models/auth/create-user.model';
import { environment } from 'environments/environment';
import { AuthService } from 'app/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  myHeaders: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json;");

  constructor(private http: HttpClient, private router: Router, private _authService: AuthService) {
  }
  createUser(data: CreateUserModel) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let token = this._authService.getAccessToken();
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'queally_spa');
    return this.http.post(HttpClientService.CREATEUSER_CONTROLLER, data, { headers: this.myHeaders })
      .pipe(tap(resData => {
      }));
  }
}

