import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersModel } from 'app/models/users/users.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from 'app/services/users.service';
import { ToastService } from 'app/services/toast.service';
import { CompanyService } from 'app/services/company.service';
import { CompanyModel } from 'app/models/company/companies.model';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {

  sub: Subscription;
  user: UsersModel;
  companies: CompanyModel[];
  userRole: string[];
  isCompanyAdminSelected: boolean;
  showOrganisationList: boolean;
  isCreatePasswordAutomaticallySelected: boolean;
  showLoader: boolean = false;
  isRoleAdmin: boolean;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: UsersService,
    private toastService: ToastService,
    private companyService: CompanyService,
    private authService: AuthService) {
    this.user = new UsersModel();
    this.userRole= this.authService.currentUser.roles;
  }
  ngOnInit() {
    this.getCompanies();
    this.sub = this.route.params.subscribe(params => {
      var id = params['id'];
      if (id) {
        this.getUser(id);
      } else {
        this.router.navigate(['/not-found']);
      }
    });

  }
  ngOnDestroy(){
  }

  getUser(id: number) {
    this.userService.getUserById(id).subscribe(
      respData => {
        this.user = new UsersModel(respData);
        this.isRoleAdmin = this.user.roles.some( x => x == "System Admin");
      },
      error => {
        if (error.error) {
          this.toastService.showError(error.error);
        } else {
          this.toastService.showError("Some error occured");
        }
        this.router.navigate(['/not-found']);
      }
    );
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe(respData => {
      this.companies = respData;
    },
      error => {
        if (error.error) {
          this.toastService.showError(error.error);
        } else {
          this.toastService.showError("Some error occured");
        }
      }
    );
  }

  isRoleSelected(event) {

    if(this.isRoleAdmin) {
      if (this.user.roles.some(x => x == "System Admin" )) {
        return;
      }
      this.user.roles.push("System Admin");
    }
    else {
      this.user.roles = [];
      this.user.roles.push("User");
    }
  }

  cancelButton() {
    this.router.navigate(['/users']);
  }
  saveButton() {
    this.user.companyId = Number(this.user.companyId);
    this.showLoader = true;
    this.userService.editUser(this.user).subscribe(respData => {
      this.toastService.showSuccess("User was edited successfully");
      this.router.navigate(['/users']);
    },
      error => {
        if (error.error) {
          this.toastService.showError(error.error);
        } else {
          this.toastService.showError("Some error occured");
        }
        this.showLoader = false;
      }
    );
  }
}
