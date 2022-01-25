import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './auth/login-component/login-component.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { NewsComponent } from './components/news/news.component';
import { UsersComponent } from './components/users/users.component';
import { NewsCreateComponent } from './components/news-create/news-create.component';
import { NewsEditComponent } from './components/news-edit/news-edit.component';
import { NewsDetailsComponent } from './components/news-details/news-details.component';
import { UserEditComponent } from './components/user-management/user-edit/user-edit.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserCreateComponent } from './components/user-management/user-create/user-create.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WellnessCategoryComponent } from './components/wellness-room/wellness-category/wellness-category.component';
import { CreateCategoryComponent } from './components/wellness-room/wellness-category/create-category/create-category.component';
import { EditCategoryComponent } from './components/wellness-room/wellness-category/edit-category/edit-category.component';
import { WellnessLinkComponent } from './components/wellness-room/wellness-link/wellness-link.component';
import { CreateLinkComponent } from './components/wellness-room/wellness-link/create-link/create-link.component';
import { EditLinkComponent } from './components/wellness-room/wellness-link/edit-link/edit-link.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', data: { title: 'Dashboard' } },

  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'registration', component: RegistrationComponent, data: { title: 'Create User' } },
  { path: 'news', component: NewsComponent, data: { title: 'News' } },
  { path: 'users', component: UsersComponent, data: { title: 'User Management' } },
  { path: 'users/create', component: UserCreateComponent, data: { title: 'Create Usert' } },
  { path: 'users/edit/:id', component: UserEditComponent, data: { title: 'Edit User' } },
  { path: 'news/add', component: NewsCreateComponent, data: { title: 'Create News' } },
  { path: 'news/:id', component: NewsDetailsComponent, data: { title: 'News Details' } },
  { path: 'news/edit/:id', component: NewsEditComponent, data: { title: 'Edit News' } },
  { path: 'wellnessroom/category', component: WellnessCategoryComponent, data: { title: 'Wellness Category' } },
  { path: 'wellnessroom/category/create', component: CreateCategoryComponent, data: { title: 'Create Category' } },
  { path: 'wellnessroom/category/edit/:id', component: EditCategoryComponent, data: { title: 'Edit Category' } },
  { path: 'wellnessroom/category/:id/link', component: WellnessLinkComponent, data: { title: 'Category Links' } },
  { path: 'wellnessroom/category/:id/link/create', component: CreateLinkComponent, data: { title: 'Create Links' } },
  { path: 'wellnessroom/category/:id/link/edit/:linkId', component: EditLinkComponent, data: { title: 'Edit Links' } },
  
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
