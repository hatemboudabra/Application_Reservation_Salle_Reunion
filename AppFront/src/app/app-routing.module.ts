import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { ListMeetingComponent } from './dashboard/list-meeting/list-meeting.component';
import { AuthGuard } from './guards/auth.guard';
import { AddRommComponent } from './dashboard/add-romm/add-romm.component';
import { UpdateRommComponent } from './dashboard/update-romm/update-romm.component';
import { ListUsersComponent } from './dashboard/list-users/list-users.component';
import { ListMeetingusComponent } from './dashboard-user/list-meetingus/list-meetingus.component';
import { AjouterReservationComponent } from './dashboard-user/ajouter-reservation/ajouter-reservation.component';
import { ListReservationComponent } from './dashboard-user/list-reservation/list-reservation.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  
  {path:'home',component: HomeComponent},
  {path: '', redirectTo:'home', pathMatch: 'full'},
 // {path: '', redirectTo:'login', pathMatch: 'full'},
 { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboardus', component: DashboardUserComponent, children:[
    {path: 'listreservation', component: ListReservationComponent},
    { path: 'ajouterreserv/:id', component:AjouterReservationComponent },
    {path: 'listmeetingus', component: ListMeetingusComponent},
   
  ]},
  { path: 'dashboard',canActivate:[AuthGuard], component: DashboardComponent , children:[
    {path: '', redirectTo:'dashboard/listusers', pathMatch: 'full'},
    { path: 'listroom', component: ListMeetingComponent},
    { path: 'add-room', component:AddRommComponent },
    { path: 'updateroom/:id', component:UpdateRommComponent },
    { path: 'listusers', component:ListUsersComponent }


]}

];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]})
export class AppRoutingModule { }