import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './auth/login-component/login-component.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', data: { title: 'Dashboard' } },

  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'registration', component: RegistrationComponent, data: { title: 'Registration' } },
  // { path: 'news', component: NewsComponent, data: { title: 'News' } },
  // { path: 'users', component: UsersComponent, data: { title: 'User Management' } },
  // { path: 'users/create', component: UserCreateComponent, data: { title: 'Create Usert' } },
  // { path: 'users/edit/:id', component: UserEditComponent, data: { title: 'Edit User' } },
  // { path: 'news/add', component: NewsCreateComponent, data: { title: 'Create News' } },
  // { path: 'news/:id', component: NewsDetailsComponent, data: { title: 'News Details' } },
  // { path: 'news/edit/:id', component: NewsEditComponent, data: { title: 'Edit News' } },
  // { path: 'wellnessroom/category', component: WellnessCategoryComponent, data: { title: 'Wellness Category' } },
  // { path: 'wellnessroom/category/create', component: CreateCategoryComponent, data: { title: 'Create Category' } },
  // { path: 'wellnessroom/category/edit/:id', component: EditCategoryComponent, data: { title: 'Edit Category' } },
  // { path: 'wellnessroom/category/:id/link', component: WellnessLinkComponent, data: { title: 'Category Links' } },
  // { path: 'wellnessroom/category/:id/link/create', component: CreateLinkComponent, data: { title: 'Create Links' } },
  // { path: 'wellnessroom/category/:id/link/edit/:linkId', component: EditLinkComponent, data: { title: 'Edit Links' } },
  
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
