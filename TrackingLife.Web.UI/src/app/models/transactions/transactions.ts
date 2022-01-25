import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { HttpClientService } from 'app/shared/http-client/http-client.service';
import { AuthService } from 'app/auth/auth.service';
import { BalanceModel } from 'app/models/balance/balanceModel';
import { ListItemsModel } from 'app/models/abstract/listItemsModel';
import { TransactionsFilter } from './transactionFilter';
import { CreateTransactionModel } from '../auth/create-user.model';


@Injectable({ providedIn: 'root' })
export class TransactionsService {
    myHeaders: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json;");

    constructor(private http: HttpClient, private router: Router, private _authService: AuthService) {
    }

    getTransactions(filter: TransactionsFilter) {
        return this.http.get<ListItemsModel>(HttpClientService.TRANSACTION_CONTROLER, { headers: this.myHeaders, params: {
            pageNumber: String(filter.pageNumber),
            take: String(filter.take),
            balanceId: String(filter.balanceId)
        }})
            .pipe(tap(resData => {
            }));
    }

    createTransactions(data: CreateTransactionModel) {

        return this.http.post(HttpClientService.TRANSACTION_CONTROLER, data, { headers: this.myHeaders })
          .pipe(tap(resData => {
          }));
      }
}
