import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Title } from '@angular/platform-browser';
import pageSettings from 'app/config/page-settings';

import { AuthService } from 'app/auth/auth.service';
import { ToastService } from 'app/services/toast.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent implements OnInit, OnDestroy {
    pageSettings = pageSettings;
    private _email: string;
    private _token: string;
    public isLoaded: boolean = false;
    public isResetPassword: boolean = false;
    public isConfirmation: boolean = false; 
    public form = new ResetPasswordViewModel().form;
    public dontMatchPassword = false;
    NewPassword: string;

    constructor(private route: ActivatedRoute,
        // private accountService: AccountsService,
        // private _alertService: AlertService,
        private router: Router,
        private authService : AuthService,
        private titleService: Title,
        private toastService: ToastService,)
    {
        this.pageSettings.pageWithoutSidebar = true;
        this.pageSettings.pageEmpty = true;

        this.route.queryParams.subscribe(params => {
            this._email = params['email'];
            this._token = params['token'];
        });
    }

    public ngOnInit(): void {
        this.titleService.setTitle('Reset-password');
    }

    ngOnDestroy() {
        this.pageSettings.pageEmpty = false;
      }
    
    public resetPassword(ResetPasswordViewModel): void {
        let newpassword = this.form.value.NewPassword;
        let confirmPassword = this.form.value.ConfirmPassword;
        if (newpassword != "" && confirmPassword != "" && newpassword != confirmPassword ) {
            this.dontMatchPassword = true;
        }
        else {
            ResetPasswordViewModel.UserName = this._email;
            ResetPasswordViewModel.Token = this._token;
            this.authService.resetPassword(ResetPasswordViewModel)
                .subscribe( resData => {
                      this.isConfirmation = true;
                      this.isResetPassword = true;
                        // this._alertService.success('Your password has been changed, please login using your new password.',
                        //     'Success!');
                    },
                    (errorMessage) => {
                        //let modifiedString = this._registerService.prepareModelError(errorMessage.error);
                        //this._alertService.error(errorMessage.error);
                        this.isLoaded = false;
                    });
                    this.isLoaded = true;
        }
    }
  
 validateForm() {   
        if (this.form.invalid) {
            this.form.get('NewPassword').markAsTouched();
            this.form.get('ConfirmPassword').markAsTouched();
        }
    }

isConfirmationReset() {
    this.isConfirmation = true;
  this.isResetPassword = true;
} 
}


class ResetPasswordViewModel {
    public form: FormGroup = new FormGroup({
        UserName: new FormControl('', [Validators.nullValidator]),
        Token: new FormControl('', [Validators.nullValidator]),
        NewPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^.*(?=.*\d)(?=.*[$@$!%*?&])((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)]),
        ConfirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^.*(?=.*\d)(?=.*[$@$!%*?&])((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)])
    });
}
