import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
username: String;
  Pwd: String;
submitted = false;
public model:Object;
  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService,
	public toastr: ToastsManager, public vcr: ViewContainerRef
	)
	{
	
this.toastr.setRootViewContainerRef(vcr);
		}

  ngOnInit() {
	   if(localStorage.getItem('actionResult') == "PC")
	   {
		   this.toastr.success('Password changed successfully! Please login with new password', 'Success');
	   }
	   
	   this.authService.SetActionResult('');
	   
	this.model= 
	{
      username: '',
      Pwd: ''
	  
    }
  }

  onLoginSubmit()
  {
     this.crestLogin(this.model);
  }
  


  crestLogin(model)   
  {
                this.authService.authenticateAppRoleMaster(model).subscribe(data => {
                                debugger;
       if(data.success)
                   {    
        //this.model.tagID=data.tagID;   
                                this.loadDashBoard(data);
        //this.router.navigate(['/university']);                
       } 
                   else 
                   {
                                  
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger'});         
       }
    });
  }

  loadDashBoard(data)
   {
     if(data.user.TagID=='C')
                {
                                   this.authService.storeStudentData(data.token, data.user,data.user.TagID);
            // this.flashMessage.show('You are now logged in', {
           // cssClass: 'alert-success'});
           this.router.navigate(['/']);
         
                 }
    else if(data.user.TagID=='S')
                {
                  this.authService.authenticateStudent(this.model).subscribe(student => {
        if(student.success)
                                {
           this.authService.storeStudentData(student.token, student.student,data.user.TagID);
		   if(!JSON.parse(this.authService.getLoginUser()).isPasswordChanged )
			{
				document.getElementById("openModalButton").click();
			}else {
            // this.flashMessage.show('You are now logged in', {
            // cssClass: 'alert-success'});
           this.router.navigate(['/']);
			}
        } 
                                else
                                {
           this.flashMessage.show(student.msg, {
           cssClass: 'alert-danger'});
           //this.router.navigate(['login']);
        }
          });
                  }
				  else if(data.user.TagID=='O')
                {
                  this.authService.authenticateOrganization(this.model).subscribe(orgn => {
        if(orgn.success)
                                {
           this.authService.storeStudentData(orgn.token, orgn.organization,data.user.TagID);
		   if(!JSON.parse(this.authService.getLoginUser()).isPasswordChanged )
			{
				document.getElementById("openModalButton").click();
			}else {
            // this.flashMessage.show('You are now logged in', {
            // cssClass: 'alert-success'});
           this.router.navigate(['/universityhome']);
			}
        } 
                                else
                                {
           this.flashMessage.show(orgn.msg, {
           cssClass: 'alert-danger'});
           //this.router.navigate(['login']);
        }
          });
                  }
				  else if(data.user.TagID=="OR")
                {
                  this.authService.authenticateOrganizationRole(this.model).subscribe(orgn => {
        if(orgn.success)
                                {
           this.authService.storeStudentData(orgn.token, orgn.organizationRoleUser,data.user.TagID);
		   if(!JSON.parse(this.authService.getLoginUser()).isPasswordChanged )
			{
				document.getElementById("openModalButton").click();
			}else {
            // this.flashMessage.show('You are now logged in', {
            // cssClass: 'alert-success'});
           this.router.navigate(['/']);
			}
        } 
                                else
                                {
           this.flashMessage.show(orgn.msg, {
           cssClass: 'alert-danger'});
           //this.router.navigate(['login']);
        }
          });
                  }
                  else if(data.user.TagID=='U')
                  {
                                  this.authService.authenticateUniversity(this.model).subscribe(univ => {
        if(univ.success)
                                {
           this.authService.storeStudentData(univ.token, univ.university,data.user.TagID);
		   if(!JSON.parse(this.authService.getLoginUser()).isPasswordChanged)
			{
				document.getElementById("openModalButton").click();
			}
			else {
            // this.flashMessage.show('You are now logged in', {
            // cssClass: 'alert-success'});
           this.router.navigate(['/universitydashboard']);
			}
        } 
                                else
                                {
           this.flashMessage.show(univ.msg, {
           cssClass: 'alert-danger'});
           //this.router.navigate(['login']);
        }
          });
                  }
	    else if(data.user.TagID=='UR')
		  this.authService.authenticateUniversityRoleUser(this.model).subscribe(RoleUser => {
        if(RoleUser.success)
		{
           this.authService.storeStudentData(RoleUser.token, RoleUser.universityRoleUser,data.user.TagID);
		   if(!JSON.parse(this.authService.getLoginUser()).isPasswordChanged)
			{
			document.getElementById("openModalButton").click();
			}else {
            // this.flashMessage.show('You are now logged in', {
            // cssClass: 'alert-success'});
           this.router.navigate(['/universitydashboard']);
			}
        } 
		else
		{
           this.flashMessage.show(RoleUser.msg, {
           cssClass: 'alert-danger'});
           //this.router.navigate(['login']);
        }
          });
   }
  }

