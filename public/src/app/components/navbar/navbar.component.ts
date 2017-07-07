import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
user:any;
tagID:String;
userName:String;
  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService) { }

  ngOnInit() {
	  this.tagID=localStorage.getItem('tagID');
	 
	  this.user = JSON.parse(this.authService.getLoginUser());
	  if(this.tagID=="S")
	  {
		 this.userName=this.user.Student_Name; 
	  }
	  else
	  {
		   this.userName=this.user.UserName;
	  }
	 
  }

  onLogoutClick(){
	
    this.authService.logout();
    
    this.router.navigate(['/login']);
    return false;
  }

}
