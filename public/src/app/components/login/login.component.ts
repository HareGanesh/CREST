import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';


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
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
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

