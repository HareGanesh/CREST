import { Component, OnInit,ChangeDetectorRef,ViewEncapsulation, ViewContainerRef } from '@angular/core';
//import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import { UniversityRole } from './UniversityRole';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';



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
	 
  public universityUserList: Array<UniversityRole> = [];
  public universityUserTempList: Array<UniversityRole> = [];
  public univID;
  private username;
  private EmailID;
  public SuccessMessage='';
	public ErrorList:string[]=[];
	public UserNameErrorList:string[]=[];
  constructor(private validateService: ValidateService,
   private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router,
	private activatedRoute:ActivatedRoute,
	private changeDetectorRef: ChangeDetectorRef,
	public toastr: ToastsManager, public vcr: ViewContainerRef
	)
	{
	

		}
    model={  	
    _id:'',
	Role_ID:0,  
    username:'',
	Password:'',
	Email_ID:'',	
    Mobile_No:'',
	Department:'',
	Univ_ID:0
     	};
		
  submitted = false;
  public deleteID='';
  ngOnInit() {
	  debugger;
	  this.toastr.setRootViewContainerRef(this.vcr);
	  this.univID = JSON.parse(this.authService.getLoginUser()).Univ_ID;
	  
	  // Get roles for an universityrole
	  this.authService.getAllUniversityRolesByUnivID(this.univID).subscribe(data => {
		  if(data.length > 0)
		  {
		   for(let i=0; i< data.length; i++)
		   {
			this.UniversityRoles.push(data[i]);
		   }
		   
		   this.authService.getAllUniversityUserByUnivID(this.univID).subscribe(data => {
			   this.universityUserList = data;
		  this.universityUserTempList = data;
		   for(let i=0; i< this.universityUserList.length; i++)
		   {
			   this.universityUserList[i].RoleName = this.UniversityRoles.filter(x=>x.Univ_RoleID == this.universityUserList[i].Role_ID)[0].Univ_RoleName;
			//this.UniversityRoles.push(data[i]);
		   }
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
  }
		   
		  },
		  //observable also returns error
    err => {
      console.log(err);
      return false;
    });
		  }
    
    
    
  
  showSuccess() {
	  debugger;
        this.toastr.success('You are awesome!', 'Success!');
      }

  
  emailChange()
  {
	  debugger;
	  let length = this.ErrorList.length;
		for(let i=0; i< length;i++)
		{
		this.ErrorList.pop();
		}
		
		if(this.EmailID != this.model.Email_ID)
		{
	  this.authService.getUserByEmail(this.model).subscribe(data => {
		   if(data != null)
		   {
			   this.ErrorList.push("Alternate Email is duplicate");
			   
		   }
       },
		//observable also returns error
		err => {
			console.log(err);
			return false;
    });
		}
	
	
  }
  
  userNameChange()
  {
	  debugger;
	  let length = this.UserNameErrorList.length;
		for(let i=0; i< length;i++)
		{
		this.UserNameErrorList.pop();
		}
		
		if(this.username != this.model.username)
		{
	  this.authService.getUserByUserName(this.model).subscribe(data => {
		   if(data != null)
		   {
			   this.UserNameErrorList.push("Email is duplicate");
			   
		   }
       },
		//observable also returns error
		err => {
			console.log(err);
			return false;
    });
		}
  }
  
  deleteUniverity(id)
  {
     this.deleteID=id;
  }
  
  deleteItem()
{
                let univModel={
					_id:''
				}
               // var objUniModel = new universityModel();
                univModel._id=this.deleteID;
                this.authService.deleteUniversityUserRole(univModel).subscribe(data => {
                                
                                if(data.success)
                                {
									this.toastr.success('Role user deleted successfully!', 'Success!');
                     document.getElementById('close2').click();
					 this.UniversityRoles = [
						{Univ_RoleID: 0,  Univ_RoleName:"Please select"}         
							];
                                this.ngOnInit();
                                }
                });           
}
  
  clearModel()
  {
	  debugger;
	  this.UserNameErrorList=[];
	  this.ErrorList=[];
                  //this.Action="Add";
                  this.model={  	
    _id:'',
	Role_ID:0,  
    username:'',
	Password:'',
	Email_ID:'',	
    Mobile_No:'',
	Department:'',
	Univ_ID:0
     	};
  }
  
  showPopup(id)
  {              
     // this.Action="Edit";
	 this.UserNameErrorList = [];
       this.model = this.universityUserList.find(x=>x._id == id);
	   this.username = this.model.username;
	   this.EmailID = this.model.Email_ID;
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
	 // this.submitted = true; 	
    this.model.Univ_ID = this.univID;
	// Commeting this for time being
	//this.model.Password= this.generatePassword();
	this.model.Password= "admin12345";
	if(this.model._id == '')
	{
  // Register user
    this.authService.addUniversityUserRole(this.model).subscribe(data => {
		debugger;
      if(data.success){
        // //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        // this.router.navigate(['/universitydashboard']);
      // } else {
        // //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        // this.router.navigate(['/register']);
		//this.SuccessMessage	= "New Role user added successfully.";
		document.getElementById('close').click();
		this.UniversityRoles = [
		{Univ_RoleID: 0,  Univ_RoleName:"Please select"}         
		];
	 
		this.ngOnInit();
       this.toastr.success('New Role user added successfully!', 'Success!');
      

		
		
      }
    });
	}else{
		this.authService.updateUniversityUserRole(this.model).subscribe(data => {
		debugger;
      if(data.success){
        // //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        // this.router.navigate(['/universitydashboard']);
      // } else {
        // //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        // this.router.navigate(['/register']);
		//this.SuccessMessage	= "New Role user added successfully.";
		document.getElementById('close').click();
		this.UniversityRoles = [
		{Univ_RoleID: 0,  Univ_RoleName:"Please select"}         
		];
		this.ngOnInit();
       this.toastr.success('Role user updated successfully!', 'Success!');
      

		
		
      }
    });
	}
	  

  }

}


