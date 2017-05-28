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
<<<<<<< HEAD

=======
<<<<<<< HEAD
=======
>>>>>>> a891def34267f263a94e9653d07caa5f8c1b706e
import {EventsComponent} from './components/events/events.component';
>>>>>>> 8b8b0725f512b220ad2a4f5feceb519223f5a8b3


import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import { RegisterstudentComponent } from './components/register/registerstudent/registerstudent.component';
import { RegistereventComponent } from './components/events/registerevent/registerevent.component';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/auth.guard';
<<<<<<< HEAD

import { OrganizationComponent } from './components/organization/organization.component';

=======
<<<<<<< HEAD
import { OrganizationComponent } from './components/organization/organization.component';
=======
>>>>>>> a891def34267f263a94e9653d07caa5f8c1b706e
import { EqualValidator } from './services/password.match.directive';
>>>>>>> 8b8b0725f512b220ad2a4f5feceb519223f5a8b3


const appRoutes: Routes = [

  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent ,canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'student', component: RegisterstudentComponent},
<<<<<<< HEAD

  {path:'organization', component: OrganizationComponent},
  {path:'eventinfo/:id', component: RegistereventComponent},
  {path: 'eventDetails/:id', component: EventsComponent }	


=======
<<<<<<< HEAD
  {path:'organization', component: OrganizationComponent}
=======
  {path:'eventinfo/:id', component: RegistereventComponent},
  {path: 'eventDetails/:id', component: EventsComponent }	

>>>>>>> 8b8b0725f512b220ad2a4f5feceb519223f5a8b3
>>>>>>> a891def34267f263a94e9653d07caa5f8c1b706e
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
<<<<<<< HEAD

    OrganizationComponent,
=======
<<<<<<< HEAD
    OrganizationComponent
=======
>>>>>>> a891def34267f263a94e9653d07caa5f8c1b706e
	RegistereventComponent,
	EqualValidator
	,
	EventsComponent
<<<<<<< HEAD

=======
>>>>>>> 8b8b0725f512b220ad2a4f5feceb519223f5a8b3
>>>>>>> a891def34267f263a94e9653d07caa5f8c1b706e
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
