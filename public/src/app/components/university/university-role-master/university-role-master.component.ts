import { Component, OnInit,ChangeDetectorRef,ViewEncapsulation, ViewContainerRef } from '@angular/core';
 import {ValidateService} from '../../../services/validate.service';
import {AuthService} from '../../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {univerisityRoleMstr} from '../../../model/univerisityRoleMstr';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import {Router, ActivatedRoute, Params} from '@angular/router';



@Component({
  selector: 'app-university-role-master',
  templateUrl: './university-role-master.component.html',
  styleUrls: ['./university-role-master.component.scss']
})
export class UniversityRoleMasterComponent implements OnInit {
	tagID:String;
	universityName:String;
	public SuccessMessage = '';
	univID:Number;
model={  	
    Univ_RoleName:[],  
    Univ_ID:'0'
	
};
  //public UniversityRoles : Array<String>=[];
  submitted = false;
  public ErrorList:string[]=[];
  
  constructor(
   private validateService: ValidateService,
   private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router,
	private activatedRoute:ActivatedRoute,
	private changeDetectorRef: ChangeDetectorRef,
	public toastr: ToastsManager, public vcr: ViewContainerRef
	)
	{
	
this.toastr.setRootViewContainerRef(vcr);
		}
		
	public Universities = [
	  {Univ_ID: 0,  Univ_Name:"Please select"}
         
     ];
	 public UniversityRolesWithUniversity = [
	   {Univ_RoleID: 0,  Univ_RoleName:"Please select", Univ_ID:""}
         
     ];
	  public UniversityRoles = [ 
         
     ];
	 
	 
	 
  ngOnInit() {
	  debugger;
	  this.tagID=localStorage.getItem('tagID');
	  if(this.tagID == 'U')
	  {
		  this.univID = JSON.parse(this.authService.getLoginUser()).Univ_ID;
	  }
	  
	  this.model.Univ_RoleName.push({Univ_RoleName:""});
	  // Get all organization
	  
	  // Load roles
	this.authService.getUniversityRoles().subscribe(data => {
		if(data.length > 0)
			   {
		   for(let i=0; i< data.length; i++)
		   {
				this.UniversityRolesWithUniversity.push(data[i]);	
							
			   }
			   
			   if(this.tagID == 'U')
			   {
			   this.onChange(this.univID);	
			   }
			   
			   // if(this.model.Univ_ID != '')
			   // {
			   // this.onChange(this.model.Univ_ID);
			   // }
	}
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	  
	  this.authService.getAllUniversity().subscribe(data => {
		  if(data.length > 0)
		  {
		   for(let i=0; i< data.length; i++)
		   {
           this.Universities.push({Univ_ID:data[i].Univ_ID,Univ_Name:data[i].Univ_Name});
		   }
		   
		   if(this.tagID == 'U')
		   {
			   //this.univID = JSON.parse(this.authService.getLoginUser()).Univ_ID;
		       this.universityName = this.Universities.filter(x=>x.Univ_ID == this.univID)[0].Univ_Name;
		       this.model.Univ_ID = this.univID.toString();
		   }
		  }
   
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
 
  }
  
  
  
  checkValidation()
{	debugger;
    let length = this.ErrorList.length;
	for(let i=0; i< length;i++)
	{
		this.ErrorList.pop();
	}
	
	
	
	if(this.model.Univ_RoleName.length == 0)
	{
		this.ErrorList.push("Please click on Add button to select roles corresponding to university.");
	}else 
	{
		let duplicateCount=0;
			for(let i=0; i<this.model.Univ_RoleName.length;i++)
			{
				if(this.model.Univ_RoleName[i].Univ_RoleName == "")
				{
					this.ErrorList.push("Please select one value from role dropdown from row no: " + (i+1).toString());
				}
			
				duplicateCount=0;
				for(let j=0; j<this.model.Univ_RoleName.length;j++)
					{
						if(this.model.Univ_RoleName[i].Univ_RoleName == this.model.Univ_RoleName[j].Univ_RoleName)
						{
							duplicateCount++;
						}
					}
					
				if(this.UniversityRoles.length > 0)
				{
					if(this.UniversityRoles.filter(x=>x.Univ_RoleName == this.model.Univ_RoleName[i].Univ_RoleName).length > 0)
					{
						this.ErrorList.push("Role: "+ this.model.Univ_RoleName[i].Univ_RoleName + " already saved.");
					}
				}
			}
			
			if(duplicateCount > 1)
			{
				this.ErrorList.push("Duplicate role name selected.");
			}	
			
	}	
	
	// this.compareDates();
	if(this.ErrorList.length > 0)
	{
	return false;
	}
	else 
	{
		return true;
	}
}



onChange(univID) {
		debugger;
		//this.model.Roles=[];
	//document.getElementsByClassName('AddMoreDiv').cssClass='show';
       //this.model.Univ_RoleName = this.UniversityRolesWithUniversity.filter(x=>x.Univ_ID ==univID).Univ_RoleName;
	   this.UniversityRoles = this.UniversityRolesWithUniversity.filter(x=>x.Univ_ID ==univID);
	   //this.model.Univ_RoleName.push(this.UniversityRolesWithUniversity[0]);
	 }
  
  onSubmit()
  {
	  debugger;
	  if(!this.checkValidation())
	  {
		  return false;
	  }
  else {
	  debugger;
	   this.authService.addUniversityRole(this.model).subscribe(data => {
		  if(data.success)
		  {
			  this.SuccessMessage	= "New Role added successfully. Click + button to add more roles.";
			   this.toastr.success(this.SuccessMessage, 'Success!');
			  this.Universities = [
	  {Univ_ID: 0,  Univ_Name:"Please select"}
         
     ];
	 this.UniversityRolesWithUniversity = [
	   {Univ_RoleID: 0,  Univ_RoleName:"Please select", Univ_ID:""}
         
     ];
	  this.UniversityRoles = [ 
         
     ];
	 
	 this.model.Univ_RoleName =[];
	 this.model={  	
    Univ_RoleName:[],  
    Univ_ID:'0'
	
};
	 this.ngOnInit();
	 

			  // if(this.tagID == 'C')
			  // {
			    // this.router.navigate(['/']);
			  // }else if(this.tagID == 'U')
			  // {
			    // this.router.navigate(['/universitydashboard']);
			  // }
		  }
		    },
			//observable also returns error
		err => {
			console.log(err);
			return false;
		});
	}	 
  }
  
  AddMoreRoles()
  {
	  debugger;
	 this.model.Univ_RoleName.push({Univ_RoleName:""}); 
  }
  

}
