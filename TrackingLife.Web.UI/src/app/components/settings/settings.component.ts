import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersModel } from 'app/models/users/users.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastService } from 'app/services/toast.service';
import { CompanyModel } from 'app/models/company/companies.model';
import { AuthService } from 'app/auth/auth.service';
import { SettingsService } from 'app/services/settings.service';
import { SettingsModel } from 'app/models/settings/settings.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit, OnDestroy {

  sub: Subscription;
  model: SettingsModel;
  userRole: string[];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private settinsService: SettingsService,
    private toastService: ToastService,
    private authService: AuthService) {
    this.model = new SettingsModel();
    this.userRole = this.authService.currentUser.roles;
  }

  ngOnInit() {
    this.settinsService.getSettings().subscribe(respData => {
      this.model = respData;
    },
      error => {
        console.log(error.error);
        this.toastService.showError("Some error occured");
      });
  }

  ngOnDestroy() {
  }

  get() {
    this.settinsService.getSettings().subscribe(
      respData => {
        this.model = new SettingsModel(respData);
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


  cancelButton() {
    this.router.navigate(['/']);
  }

  saveButton() {
    this.settinsService.edit(this.model).subscribe(respData => {
      this.toastService.showSuccess("Edited successfully");
      this.router.navigate(['/']);
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
}
