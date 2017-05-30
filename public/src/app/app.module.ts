import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import {EventsComponent} from './components/events/events.component';



import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import { RegisterstudentComponent } from './components/register/registerstudent/registerstudent.component';
import { RegistereventComponent } from './components/events/registerevent/registerevent.component';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/auth.guard';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';


import { OrganizationComponent } from './components/organization/organization.component';


import { EqualValidator } from './services/password.match.directive';



const appRoutes: Routes = [

  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent ,canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'student', component: RegisterstudentComponent},


  {path:'organization', component: OrganizationComponent},
  {path:'eventinfo/:id', component: RegistereventComponent},
  {path: 'eventDetails/:id', component: EventsComponent },


  {path:'eventinfo/:id', component: RegistereventComponent},
  {path: 'eventDetails/:id', component: EventsComponent }	

]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    RegisterstudentComponent,


    OrganizationComponent,


	RegistereventComponent,
	EqualValidator,
	EventsComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
	MultiselectDropdownModule
  ],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
