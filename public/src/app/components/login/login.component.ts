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
		debugger;
       if(data.success)
	   {    
        //this.model.tagID=data.tagID;   
		this.loadDashBoard(data.AppRoleMaster.TagID);
        //this.router.navigate(['/university']);	    
       } 
	   else 
	   {
		  
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',timeout: 5000});         
       }
    });
  }

  loadDashBoard(tagID)
   {
     if(tagID=='S')
	 {
	  this.authService.authenticateStudent(this.model).subscribe(data => {
        if(data.success)
		{
           this.authService.storeStudentData(data.token, data.student,tagID);
           this.flashMessage.show('You are now logged in', {
           cssClass: 'alert-success', timeout: 5000});
           this.router.navigate(['/']);
        } 
		else
		{
           this.flashMessage.show(data.msg, {
           cssClass: 'alert-danger', timeout: 5000});
           this.router.navigate(['login']);
        }
          });
	  }
	  else if(tagID=='U')
		  this.authService.authenticateUniversity(this.model).subscribe(data => {
        if(data.success)
		{
           this.authService.storeStudentData(data.token, data.university,tagID);
           this.flashMessage.show('You are now logged in', {
           cssClass: 'alert-success', timeout: 5000});
           this.router.navigate(['/university']);
        } 
		else
		{
           this.flashMessage.show(data.msg, {
           cssClass: 'alert-danger', timeout: 5000});
           this.router.navigate(['login']);
        }
          });
   }
  }

