import { Component, OnInit,ChangeDetectorRef,ViewEncapsulation } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import { UniversityRole } from './UniversityRole';

import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-universityrole',
  templateUrl: './universityrole.component.html',
  styleUrls: ['./universityrole.component.scss']
})
export class UniversityroleComponent implements OnInit {
  public UniversityRoles = [
	   {Univ_RoleID: 0,  Univ_RoleName:"Please select"}         
     ];
  
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
    RoleID:0,  
    username:'',
	Password:'',
	Email_ID:'',	
    Mobile_No:'',
	DepartMent:'',
	Univ_ID:0
     	};
		
  submitted = false;
  
  ngOnInit() {
	  debugger;
	  this.univID = JSON.parse(this.authService.getLoginUser()).Univ_ID;
	  
	  // Get roles for an universityrole
	  this.authService.getAllUniversityRolesByUnivID(this.univID).subscribe(data => {
		   for(let i=0; i< data.length; i++)
      this.UniversityRoles.push(data[i]);
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
  }
  
  emailChange()
  {
	  debugger;
	  let length = this.ErrorList.length;
		for(let i=0; i< length;i++)
		{
		this.ErrorList.pop();
		}
	  this.authService.getUserByEmail(this.model).subscribe(data => {
		   if(data != null)
		   {
			   this.ErrorList.push("Email id is duplicate");
			   
		   }
       },
		//observable also returns error
		err => {
			console.log(err);
			return false;
    });
	
	
  }
  
  userNameChange()
  {
	  
	  let length = this.UserNameErrorList.length;
		for(let i=0; i< length;i++)
		{
		this.UserNameErrorList.pop();
		}
	  this.authService.getUserByUserName(this.model).subscribe(data => {
		   if(data != null)
		   {
			   this.UserNameErrorList.push("user name is duplicate");
			   
		   }
       },
		//observable also returns error
		err => {
			console.log(err);
			return false;
    });
	
  }
  
  // To generate random password
 generatePassword() {
    var length = 6,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

onUserRoleSubmit(){
	  debugger;
	  this.submitted = true; 	
    this.model.Univ_ID = this.univID;
	this.model.Password= this.generatePassword();
  // Register user
    this.authService.addUniversityUserRole(this.model).subscribe(data => {
		debugger;
      if(data.success){
        //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/universitydashboard']);
      } else {
        //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
	  

  }

}
