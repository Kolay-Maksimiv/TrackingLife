import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './auth/login-component/login-component.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { BalanceComponent } from './components/balance/balance.component';
import { TransactionCreateComponent } from './components/transaction-create/transaction-create.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', data: { title: 'Balance ' } },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'registration', component: RegistrationComponent, data: { title: 'Create User' } },
  { path: '', component: BalanceComponent, data: { title: 'Balance' } },
  { path: 'balance', component: BalanceComponent, data: { title: 'Balance' } },
  { path: 'balance/create-transaction', component: TransactionCreateComponent, data: { title: 'Transaction Create' } },
  
  { path: 'reset-password', component: ResetPasswordComponent, data: { title: 'Reset Password' } },
  { path: 'forgot-password', component: ForgotPasswordComponent, data: { title: 'Forgot Password' } },

  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule],
  declarations: []
})


export class AppRoutingModule { }
