import { Component, OnInit } from '@angular/core';
import { UsersModel } from 'app/models/users/users.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'app/services/users.service';
import { CompanyService } from 'app/services/company.service';
import { ToastService } from 'app/services/toast.service';
import { AuthService } from 'app/auth/auth.service';
import { Subscription } from 'rxjs';
import { CompanyModel } from 'app/models/company/companies.model';
import { CreateUserModel } from 'app/models/auth/create-user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  sub: Subscription;
  user: CreateUserModel;
  companies: CompanyModel[];
  userRole: string;
  isCreatePasswordAutomaticallySelected: boolean;
  showLoader: boolean = false;
  form = new CreateUserViewModel().form;
  isRoleAdmin: boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: UsersService,
    private toastService: ToastService,
    private companyService: CompanyService,
    private authService: AuthService) {
    this.user = new CreateUserModel();
    this.user.role = "User";
  }

  ngOnInit() {
      this.getCompaniesList();
  }

  cancelButton() {
    this.router.navigate(['/users']);
  }

  saveButton() {
    this.showLoader = true;
    this.user.companyId = Number(this.user.companyId);
    this.userService.createUser(this.user).subscribe(respData => {
          this.toastService.showSuccess("User was created successfully");
          this.router.navigate(['/users']);
        },
          error => {
            if (error.error) {
              this.toastService.showError(error.error);
            } else {
              this.toastService.showError("Some error occured");
              this.form.get('firstName').markAsTouched();
              this.form.get('lastName').markAsTouched();
              this.form.get('email').markAsTouched();
              this.form.get('password').markAsTouched();
            }
            this.showLoader = false;
          }
        );
  }

  getCompaniesList() {
    this.companyService.getCompanies().subscribe((respData: CompanyModel[]) =>
    {
      this.companies = respData;
    },
    error => {
      if (error.error) {
        this.toastService.showError(error.error);
      } else {
        this.toastService.showError("Some error occured");
      }
    });
  }

  isNewRoleSelected(event){
    if(this.isRoleAdmin){
      this.user.role = "System Admin";
    }
    else {
      this.user.role = "User";
    }
  }

  isCreatePasswordAutomatically(event){
    this.isCreatePasswordAutomaticallySelected = event.target.checked;
    this.user.password = null;
    this.user.confirmPassword = null;
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
