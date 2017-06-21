import { Component, OnInit,ChangeDetectorRef,ViewEncapsulation } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
//import { UniversityRole } from './UniversityRole';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  public univID;
	public ErrorList:string[]=[];
	public UserNameErrorList:string[]=[];
  constructor(private validateService: ValidateService,
   private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router,
	private activatedRoute:ActivatedRoute,
	private changeDetectorRef: ChangeDetectorRef) { }
    model={  	
	OldPwd:'',
    Pwd:'', 
    ConfirmPwd:'',
	Email_ID:'',
	TagID:''
	
     	};
		
  submitted = false;
  
  ngOnInit() {
	  debugger;
	  // this.univID = JSON.parse(this.authService.getLoginUser()).Univ_ID;
	  
	  // // Get roles for an universityrole
	  // this.authService.getAllUniversityRolesByUnivID(this.univID).subscribe(data => {
		   // for(let i=0; i< data.length; i++)
      // this.UniversityRoles.push(data[i]);
    // },
    // //observable also returns error
    // err => {
      // console.log(err);
      // return false;
    // });
  }
  
  onPasswordSubmit(){
	  debugger;
	  this.submitted = true; 	
    
  // Register user
    this.authService.authenticateEmailAndPwd(this.model).subscribe(data => {
		debugger;
      if(data.success){
		  this.authService.updatePassword(this.model).subscribe(data => {
		debugger;
      if(data.success){
		  this.authService.logout();
        //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/changepassword']);
      }
    });
        //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/changepassword']);
      } else 
	  {
		  let length = this.ErrorList.length;
			for(let i=0; i< length;i++)
			{
			this.ErrorList.pop();
		   }
	
	    this.ErrorList.push("User not found.");
	
        //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        //this.router.navigate(['/changepassword']);
      }
    });
	  

  }

}
