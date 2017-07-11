import { Component, OnInit,ChangeDetectorRef,ViewEncapsulation } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
//import { UniversityRole } from './UniversityRole';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-changepasswordPopup',
  templateUrl: './changepasswordPopup.component.html',
  styleUrls: ['./changepasswordPopup.component.scss']
})
export class ChangepasswordPopupComponent implements OnInit {

  public emailID;
  public SuccessMessage='';
	public ErrorList:string[]=[];
	public UserNameErrorList:string[]=[];
  constructor(private validateService: ValidateService,
   private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router,
	private activatedRoute:ActivatedRoute,
	private changeDetectorRef: ChangeDetectorRef) { }
    model={  	
	//OldPwd:'',
    Pwd:'', 
    ConfirmPwd:'',
	Email_ID:'',
	TagID:''
	
     	};
		
  submitted = false;
  
  ngOnInit() {
	  debugger;
	  if(this.authService.login())
	  {
	   this.emailID = JSON.parse(this.authService.getLoginUser()).username;
	  }
	  
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
	  
    this.model.Email_ID = JSON.parse(this.authService.getLoginUser()).username;
	if(this.model.Email_ID == undefined)
	{
		this.model.Email_ID = JSON.parse(this.authService.getLoginUser()).UserName;
	}
	
  // Register user
    // this.authService.authenticateEmailAndPwd(this.model).subscribe(data => {
		// debugger;
      // if(data.success){
		  this.authService.updatePassword(this.model).subscribe(data => {
		debugger;
      if(data.success){
		  //document.getElementById('close').click();
		  //this.SuccessMessage= "Password changed successfully. Please click close to continue."
		  //document.getElementById(btn).click();
		  this.authService.logout();
		  
        //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
		
      } else {
        //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        //this.router.navigate(['/changepassword']);
      }
    });
        //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        //this.router.navigate(['/changepassword']);
      //} 
	  // else 
	  // {
		  // let length = this.ErrorList.length;
			// for(let i=0; i< length;i++)
			// {
			// this.ErrorList.pop();
		   // }
	
	    // this.ErrorList.push("User not found.");
	
        // //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        // //this.router.navigate(['/changepassword']);
      // }
    //});
	  

  }

}
