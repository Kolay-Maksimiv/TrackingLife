import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { HttpClientService } from 'app/shared/http-client/http-client.service';
import { AuthService } from 'app/auth/auth.service';
import { BalanceModel } from 'app/models/balance/balanceModel';
import { ListItemsModel } from 'app/models/abstract/listItemsModel';


@Injectable({ providedIn: 'root' })
export class BalanceService {
    myHeaders: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json;");

    constructor(private http: HttpClient, private router: Router, private _authService: AuthService) {
    }

    getBalance() {
        return this.http.get<BalanceModel>(HttpClientService.BALANCES_CONTROLLER, { headers: this.myHeaders, params: {
        }})
            .pipe(tap(resData => {
            }));
    }
}
