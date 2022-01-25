import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { BalanceModel } from 'app/models/balance/balanceModel';
import { TransactionsFilter } from 'app/models/transactions/transactionFilter';
import { TransactionsService } from 'app/models/transactions/transactions';
import { BalanceService } from 'app/services/balanceService';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

@Input() balanceId: number;
  public uniqueAccount: string;
  public currentBalance: number;
  public lastTransactionDateTime: Data;
  public balanceList: BalanceModel
  public filter: TransactionsFilter;
  public itemsPerPage: number = 10;
  public page: number = 1;
  public previousPage: number;
  public length: number = 0;
  public balances: BalanceModel[] = [];
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private balanceService : BalanceService,
    private transactionsService: TransactionsService,
    private route: ActivatedRoute) {
      
     }

  ngOnInit() {
    this.filter = new TransactionsFilter(1, this.itemsPerPage, this.balanceId);
    this.getBalanceUser();
  }


 public getBalanceUser() {
    this.balanceService.getBalance().subscribe((respData: BalanceModel) => {
      this.balanceId = respData.id;
      this.uniqueAccount = respData.uniqueAccount.toUpperCase();
      this.currentBalance = respData.currentBalance;
      this.lastTransactionDateTime = respData.lastTransactionDateTime;
      this.getTransactionsUser(this.balanceId);
      this.initFilter(this.balanceId);
    })
  }

  public getTransactionsUser(id: number) {
    this.filter.balanceId = id;
    this.transactionsService.getTransactions(this.filter).subscribe(respData =>{
      this.balances = respData.items;
      this.length = respData.counts;
      this.isLoading = false;
    })
  }

  initFilter(id: number) {
    this.filter.pageNumber = this.page;
    this.filter.take = this.itemsPerPage;
    this.getTransactionsUser(id);
  }
  
  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.page = page;
      this.getBalanceUser();
    }
  }

  createTransaction() {
    this.router.navigate(['/balance/create-transaction']);
  }
}
