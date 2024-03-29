import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './dashboard/footer/footer.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { RegisterComponent } from './register/register.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { NavbaruserComponent } from './dashboard-user/navbaruser/navbaruser.component';
import { FormsModule } from '@angular/forms';
import { ListMeetingComponent } from './dashboard/list-meeting/list-meeting.component';
import { AddRommComponent } from './dashboard/add-romm/add-romm.component';
import { UpdateRommComponent } from './dashboard/update-romm/update-romm.component';
import { ListUsersComponent } from './dashboard/list-users/list-users.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FooterComponent,
    NavbarComponent,
    HeaderComponent,
    RegisterComponent,
    DashboardUserComponent,
    NavbaruserComponent,
    ListMeetingComponent,
    AddRommComponent,
    UpdateRommComponent,
    ListUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
