import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnalyticsPeriod } from 'app/enums/AnalyticsPeriod';
import { CreateTransactionModel, CreateUserModel } from 'app/models/auth/create-user.model';
import { TransactionsService } from 'app/models/transactions/transactions';
import { ToastService } from 'app/services/toast.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent implements OnInit {
  sub: Subscription;
  user: CreateTransactionModel;
  userRole: string;
  isCreatePasswordAutomaticallySelected: boolean;
  showLoader: boolean = false;
  form = new CreateUserViewModel().form;
  isRoleAdmin: boolean = false;

  constructor(private router: Router,
    private toastService: ToastService,
    private transactionsService: TransactionsService) {
    this.user = new CreateTransactionModel();
    this.user.status = AnalyticsPeriod.Income;
  }

  ngOnInit() { }

  cancelButton() {
    this.router.navigate(['/balance']);
  }

  saveButton() {
    debugger
    this.showLoader = true;
    this.user.balanceId = 10;
    this.transactionsService.createTransactions(this.user).subscribe(respData => {
          this.toastService.showSuccess("Transaction was created successfully");
          this.router.navigate(['/balance']);
        },
          error => {
            if (error.error) {
              this.toastService.showError(error.error);
            } else {
              this.toastService.showError("Some error occured");
              this.form.get('currentBalance').markAsTouched();
            }
            this.showLoader = false;
          }
        );
  }

  isNewRoleSelected(event){
    if(this.isRoleAdmin){
      this.user.status = AnalyticsPeriod.Income;
    }
    else {
      this.user.status = AnalyticsPeriod.Costs;
    }
  }

}
class CreateUserViewModel {
  public form: FormGroup = new FormGroup({
     firstName: new FormControl('',[Validators.required]),
     lastName: new FormControl('',[Validators.required]),
     phone: new FormControl('',[Validators.pattern("[0-9]{12}")]),
     email: new FormControl('',[Validators.required]),
     password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.pattern(/^.*(?=.*\d)(?=.*[$@$!%*?&])((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)]),
     confirmPassword: new FormControl('',[Validators.required,Validators.minLength(6),Validators.pattern(/^.*(?=.*\d)(?=.*[$@$!%*?&])((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)])
    });
}
