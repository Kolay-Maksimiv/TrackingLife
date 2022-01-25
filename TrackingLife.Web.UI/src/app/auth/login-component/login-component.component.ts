import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginModel } from 'app/models/auth/login-model';
import { AuthService } from '../auth.service';
import pageSettings from 'app/config/page-settings';
import { ToastService } from 'app/services/toast.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponent implements OnDestroy {
  pageSettings = pageSettings;
  error: string = null;
  showLoader: boolean = false;

  constructor(private authService: AuthService,
    private toastService: ToastService,
    private router: Router) {
    this.pageSettings.pageWithoutSidebar = true;
    this.pageSettings.pageEmpty = true;
  }

  ngOnDestroy() {
    this.pageSettings.pageEmpty = false;
  }

  submitLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.showLoader = true;
    let loginData = new LoginModel(form.value.email, form.value.password, true);


    this.authService.login(loginData).subscribe(respData => {

      if (!respData.roles.includes("System Admin") && respData.roles.includes("User")) {
        this.toastService.showError('Only admins can access portal.');
        this.authService.logout();
      }
      localStorage.setItem('dataSource', respData.token);

      this.router.navigate(['/']);
    },
      error => {
        console.log(error.error);
        this.error = "Your email or password is incorrect. Please try again"
        this.showLoader = false;
      }
    );

    form.reset();
  }

}
