import { Component, OnInit,ChangeDetectorRef,ViewEncapsulation } from '@angular/core';
 import {ValidateService} from '../../../services/validate.service';
import {AuthService} from '../../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {organizationRoleMstr} from '../../../model/organizationRoleMstr';


import {Router, ActivatedRoute, Params} from '@angular/router';



@Component({
  selector: 'app-organization-role-master',
  templateUrl: './organization-role-master.component.html',
  styleUrls: ['./organization-role-master.component.scss']
})
export class OrganizationRoleMasterComponent implements OnInit {
	tagID:String;
	organizationName:String;
	OrgnID:Number;
model={  	
    Orgn_RoleName:[],  
    Orgn_ID:'0'
	
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
	private changeDetectorRef: ChangeDetectorRef
    )
	{}
	public Organizations = [
	  {Orgn_ID: 0,  Orgn_Name:"Please select"}
         
     ];
	 public OrganizationRolesWithOrganization = [
	   {Orgn_RoleID: 0,  Orgn_RoleName:"Please select", Orgn_ID:""}
         
     ];
	  public OrganizationRoles = [ 
         
     ];
	 
	 
	 
  ngOnInit() {
	  this.tagID=localStorage.getItem('tagID');
	  if(this.tagID == 'O')
	  {
		  this.OrgnID = JSON.parse(this.authService.getLoginUser()).Orgn_ID;
	  }
	  
	  this.model.Orgn_RoleName.push({Orgn_RoleName:""});
	  // Get all organization
	  
	  if(this.tagID == 'O')
		{
			this.onChange(this.OrgnID);	
		}
			   
	  // // Load roles
	// this.authService.getOrganizationRoles().subscribe(data => {
		// if(data.length > 0)
			   // {
		   // for(let i=0; i< data.length; i++)
		   // {
				// this.OrganizationRolesWithOrganization.push(data[i]);	
							
			   // }
			   
			   
	// }
    // },
    // //observable also returns error
    // err => {
      // console.log(err);
      // return false;
    // });
	  
	  this.authService.getOrganizations().subscribe(data => {
		  if(data.length > 0)
		  {
		   for(let i=0; i< data.length; i++)
		   {
           this.Organizations.push({Orgn_ID:data[i].Orgn_ID,Orgn_Name:data[i].OrgnName});
		   }
		   
		   if(this.tagID == 'O')
		   {
			   //this.univID = JSON.parse(this.authService.getLoginUser()).Univ_ID;
			   if(this.Organizations.filter(x=>x.Orgn_ID == this.OrgnID).length > 0)
			   {
		       this.organizationName = this.Organizations.filter(x=>x.Orgn_ID == this.OrgnID)[0].Orgn_Name;
			   }
			   
		       this.model.Orgn_ID = this.OrgnID.toString();
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
	
	
	
	if(this.model.Orgn_RoleName.length == 0)
	{
		this.ErrorList.push("Please click on Add button to select roles corresponding to university.");
	}else 
	{
		let duplicateCount=0;
			for(let i=0; i<this.model.Orgn_RoleName.length;i++)
			{
				if(this.model.Orgn_RoleName[i].Orgn_RoleName == "")
				{
					this.ErrorList.push("Please select one value from role dropdown from row no: " + (i+1).toString());
				}
			
				duplicateCount=0;
				for(let j=0; j<this.model.Orgn_RoleName.length;j++)
					{
						if(this.model.Orgn_RoleName[i].Orgn_RoleName == this.model.Orgn_RoleName[j].Orgn_RoleName)
						{
							duplicateCount++;
						}
					}
					
				if(this.OrganizationRoles.length > 0)
				{
					if(this.OrganizationRoles.filter(x=>x.Orgn_RoleName == this.model.Orgn_RoleName[i].Orgn_RoleName).length > 0)
					{
						this.ErrorList.push("Role: "+ this.model.Orgn_RoleName[i].Orgn_RoleName + " already saved.");
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



onChange(orgnID) {
		debugger;
		this.OrganizationRoles=[];
		//this.model.Roles=[];
	//document.getElementsByClassName('AddMoreDiv').cssClass='show';
	
	this.authService.getOrganizationRolesByOrgnID(orgnID).subscribe(data => {
		if(data.length > 0)
			   {
		   for(let i=0; i< data.length; i++)
		   {
				this.OrganizationRoles.push(data[i]);	
							
			   }
			   
			  
	}
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
       //this.model.Univ_RoleName = this.UniversityRolesWithUniversity.filter(x=>x.Univ_ID ==univID).Univ_RoleName;
	   //this.OrganizationRoles = this.OrganizationRolesWithOrganization.filter(x=>x.Orgn_ID ==orgnID);
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
	   this.authService.addOrganizationRole(this.model).subscribe(data => {
		  if(data.success)
		  {
			  if(this.tagID == 'C')
			  {
			    this.router.navigate(['/']);
			  }else if(this.tagID == 'O')
			  {
			    this.router.navigate(['/universitydashboard']);
			  }
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
	 this.model.Orgn_RoleName.push({Orgn_RoleName:""}); 
  }
  

}
