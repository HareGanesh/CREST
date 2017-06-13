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
model:Object;
  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
	this.model= {
      username: '',
      Pwd: ''
    }
  }

  onLoginSubmit(){
	// //  this.submitted = true;
   
  this.crestLogin(this.model);


  }
  


  crestLogin(model)
   
  {
	      this.authService.authenticateAppRoleMaster(model).subscribe(data => {
		debugger;
      if(data.success){       
        this.router.navigate(['/university']);
	      // this.router.navigate(['/dashboard']);
      } else {
		   // this.submitted = false;
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
         // this.router.navigate(['/login']);
      }
    });
  }
}
