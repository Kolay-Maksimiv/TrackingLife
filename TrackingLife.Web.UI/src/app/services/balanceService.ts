import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { HttpClientService } from 'app/shared/http-client/http-client.service';
import { AuthService } from 'app/auth/auth.service';
import { BalanceModel } from 'app/models/balance/balanceModel';


@Injectable({ providedIn: 'root' })
export class BalanceService {
    myHeaders: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json;");

    constructor(private http: HttpClient, private router: Router, private _authService: AuthService) {
    }

    getBalance() {
        this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
        let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
        let token = 'Bearer ' + accessToken;
        this.myHeaders = this.myHeaders.append('Authorization', token);
        this.myHeaders = this.myHeaders.append('client_id', 'trackingLife_spa');
        this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

        return this.http.get<BalanceModel[]>(HttpClientService.BALANCE_CONTROLLER, { headers: this.myHeaders })
            .pipe(tap(resData => {
            }));
    }
}
