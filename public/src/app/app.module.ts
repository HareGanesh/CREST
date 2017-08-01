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

import { UniversityHomeComponent } from './components/universityhome/universityhome.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
//import { OrganizationComponent } from './components/organization/organization.component';

import {EventsComponent} from './components/events/events.component';

import {UniversityTransMappingComponent} from './components/UniversityTransMap/UniversityTransMapping.component';
import {OrganizationTransMappingComponent} from './components/OrganizationTransMap/OrganizationTransMapping.component';

import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import { RegisterstudentComponent } from './components/register/registerstudent/registerstudent.component';
import { RegistereventComponent } from './components/events/registerevent/registerevent.component';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/auth.guard';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';


import { OrganizationComponent } from './components/organization/organization.component';
 import { OrganizationroleComponent } from './components/organizationrole/organizationrole.component';

import { EqualValidator } from './services/password.match.directive';
import { AddUniversityComponent } from './components/university/add-university/add-university.component';
import { UniversityRoleMasterComponent } from './components/university//university-role-master/university-role-master.component';
import { OrganizationRoleMasterComponent } from './components/organization//organization-role-master/organization-role-master.component';
import { UniversityComponent } from './components/university/university.component';
import { UniversitydashboardComponent } from './components/universitydashboard/universitydashboard.component';

import {TooltipModule} from "ngx-tooltip";
import { UniversityroleComponent } from './components/universityrole/universityrole.component';

import { StudentListComponent } from './components//student-list/student-list.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { ChangepasswordPopupComponent } from './components/changepasswordPopup/changepasswordPopup.component';
import { EventstudentapprovallistComponent } from './components/universitydashboard/eventstudentapprovallist/eventstudentapprovallist.component'; 
 import {AccordionModule} from "ng2-accordion";
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {ToastOptions} from 'ng2-toastr';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CustomOption } from './custom-option';
import { Ng2SmartTableModule } from 'ng2-smart-table';

const appRoutes: Routes = [

  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent ,canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'student', component: RegisterstudentComponent},
   {path:'studentList', component: StudentListComponent},

  {path:'organization', component: OrganizationComponent},
  {path:'eventinfo/:id', component: RegistereventComponent},
  {path: 'eventDetails/:id', component: EventsComponent },
{path:'UniversityTransMapping', component: UniversityTransMappingComponent},
{path:'OrganizationTransMapping', component: OrganizationTransMappingComponent},
{path: 'university/:id', component: UniversityComponent },	
  
  {path: 'universityrole', component: UniversityRoleMasterComponent },
  {path: 'organizationrole', component: OrganizationRoleMasterComponent },
{path: 'universitydashboard', component: UniversitydashboardComponent },
{path: 'adduniversityroledetail', component: UniversityroleComponent },
 {path: 'addorganizationrole', component: OrganizationroleComponent },
{path: 'changepassword', component: ChangepasswordComponent },
{path: 'universityhome', component: UniversityHomeComponent},
	{path:'eventstudentapprovallist', component: EventstudentapprovallistComponent}
  // {path:'eventinfo/:id', component: RegistereventComponent},
  // {path: 'eventDetails/:id', component: EventsComponent }	

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
	EventsComponent,
	UniversityTransMappingComponent,
	OrganizationTransMappingComponent,
	UniversityComponent,
	AddUniversityComponent,
	UniversityRoleMasterComponent,
	OrganizationRoleMasterComponent,
	UniversitydashboardComponent,
	UniversityroleComponent,
	OrganizationroleComponent,
	StudentListComponent,
	ChangepasswordComponent,
	ChangepasswordPopupComponent,
	EventstudentapprovallistComponent,
	UniversityHomeComponent
	 

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
	MultiselectDropdownModule,
	TooltipModule,
	AccordionModule,
	BrowserAnimationsModule,
	ToastModule.forRoot(),
	Ng2SmartTableModule
  ],
  providers: [ValidateService, AuthService, AuthGuard, {provide: ToastOptions, useClass: CustomOption}],
  bootstrap: [AppComponent]
})
export class AppModule { }
