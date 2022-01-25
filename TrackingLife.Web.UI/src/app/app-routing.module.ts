import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './auth/login-component/login-component.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserCreateComponent } from './components/user-management/user-create/user-create.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', data: { title: 'Dashboard' } },


  { path: '', component: LoginComponent, data: { title: 'Login' } },
  { path: 'registration', component: RegistrationComponent, data: { title: 'Create User' } },

  { path: 'users/create', component: UserCreateComponent, data: { title: 'Create Usert' } },
  // { path: 'users/edit/:id', component: UserEditComponent, data: { title: 'Edit User' } },
  
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
