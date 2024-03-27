import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { ListMeetingComponent } from './dashboard/list-meeting/list-meeting.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: '', redirectTo:'login', pathMatch: 'full'},
  { path: 'register', component: RegisterComponent },
  { path: 'dashboardus', component: DashboardUserComponent},
  { path: 'dashboard',canActivate:[AuthGuard], component: DashboardComponent , children:[
    {path: '', redirectTo:'dashboard', pathMatch: 'full'},
    { path: 'listroom', component: ListMeetingComponent},
]}
 
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]})
export class AppRoutingModule { }
