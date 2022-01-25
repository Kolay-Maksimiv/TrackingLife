import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import pageSettings from 'app/config/page-settings';
import { AuthService } from '../auth.service';
import { ToastService } from 'app/services/toast.service';
import { LoginModel } from 'app/models/auth/login-model';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  @Input()
  pattern: string | RegExp	
  isValidPassword: boolean;
  isMatchPassword: boolean;
  pageSettings = pageSettings;
  
  email: string;
  code: string;
  token: string;
  isEmailSent: boolean = false;
  isChangePasswordAllowed: boolean;
  newPassword:string;
  confirmPassword: string;

  isCodeGenerated: boolean = false;
  showLoader: boolean = false;

  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/)])
});

  constructor(private authService: AuthService,
    private toastService: ToastService,
    private router: Router) { 
    this.pageSettings.pageWithoutSidebar = true;
    this.pageSettings.pageEmpty = true;
  }

  ngOnInit() {this.isValidPassword = true,
    this.isMatchPassword = true
  }

  ngOnDestroy() {
    this.pageSettings.pageEmpty = false;
 }

 submitEmail(){
   if(this.isCodeGenerated == true){
    this.showLoader = true;
    this.authService.forgotPasswordCodeSubmit(this.email,this.code).subscribe(respData => {
      this.isCodeGenerated = true;
      this.token = respData.token;
      this.isChangePasswordAllowed = true;
      this.toastService.showSuccess("Code was confirmed");
      this.showLoader = false;
      if (this.emailForm.invalid) {
        this.emailForm.get('email').markAsTouched();
    }
   },
   error=>{
    if (error.error) {
      this.toastService.showError(error.error);
    } else {
      this.toastService.showError("Some error occured");
    }
    this.showLoader = false;
   }
   );
   }
   else {
    this.showLoader = true;
    this.authService.forgotPasswordCodeRequest(this.email).subscribe(respData => {
       this.isCodeGenerated = true;
       this.toastService.showSuccess("Enter the code from email");
       this.showLoader = false;
    },
    error=>{
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

  returnForgotPassword () {
    this.isEmailSent = false;
    this.isCodeGenerated = false;
    this.isChangePasswordAllowed = false;
  }

  clickIsEmailSent(): void  {
    this.isEmailSent = true;
    this.isCodeGenerated = false;
    this.isChangePasswordAllowed = true;
  }

 submitChangePassword(){
  this.pattern = /^(?=\D*\d)(?=\W*\w)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,30}$/;
  var isCorrectPassword = this.newPassword.match(this.pattern);
  
  if(isCorrectPassword != null){
    this.isValidPassword = true;
  } else{
    this.isValidPassword = false;
    this.isMatchPassword = true;
    return false;
  }
  if(this.newPassword != this.confirmPassword){
    this.isMatchPassword = false;
    return false;
  } else{
    this.isMatchPassword = true;
  }
    this.showLoader = true;
   this.authService.forgotPasswordPasswordSubmit(this.email,this.code, this.newPassword, this.confirmPassword, this.token).subscribe(respData => {
    this.toastService.showSuccess("Password was changed");
    var model = new LoginModel(this.email, this.newPassword, false);
    this.authService.login(model).subscribe(respData => {

      localStorage.setItem('dataSource', respData.token);


    if (respData.roles.includes("System Admin")) {
      this.router.navigate(['home']);
    } else {
      this.authService.logout();

    }

  },
  error => {
      console.log(error.error);
  }
  );
 },
 error=>{
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
