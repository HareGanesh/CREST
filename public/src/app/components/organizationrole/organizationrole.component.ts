import { Component, OnInit,ChangeDetectorRef, ViewContainerRef } from '@angular/core';
//import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import { OrganizationRole } from './OrganizationRole';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Ng2SmartTableModule, LocalDataSource  } from 'ng2-smart-table';


import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-organizationrole',
  templateUrl: './organizationrole.component.html',
  styleUrls: ['./organizationrole.component.scss']
})
export class OrganizationroleComponent implements OnInit {
  public OrganizationRoles = [
	   {Orgn_RoleID: 0,  Orgn_RoleName:"Please select", Priority:0}         
     ];
  source: LocalDataSource; 
  public organizationUserList: Array<OrganizationRole> = [];
  public organizationUserTempList: Array<OrganizationRole> = [];
  public orgnID;
  IsLowestRoleLoggedIn=false;
  RolesArray=[];
  tagID:String;
  private username;
  private EmailID;
  public SuccessMessage='';
	public ErrorList:string[]=[];
	
	public OrganizationRolesWithOrganization = [
	   {Orgn_RoleID: 0,  Orgn_RoleName:"Please select", Orgn_ID:""}
         
     ];
	
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
	Priority:0,
	Password:'',
	Email_ID:'',	
    Mobile_No:'',
	Department:'',
	Orgn_ID:0,
	Created_By:''
     	};
		
	settings = {
	delete: {
      confirmDelete: true,
	  //deleteButtonContent: '<a class="btn btn-primary pull-right" style="width:66px;" (click)="deleteOrgnerity(item._id)"  data-toggle="modal" data-target="#deleteDiv">Delete</a>'
    },
	edit: {
      confirmSave: true,
    },
	
	actions: {
	 edit: false, //as an example  
	 add:false,
	 custom: [{ name: 'edit', title:'Edit'}],
	 position:'right'
	},
	
	pager:{
	 perPage:10
	},


  columns: {
    RoleName: {
      title: 'Role Name',
	  filter:false
	  
    },
    
    username: {
      title: 'Email ID',
	  filter:false
    },
    Mobile_No: {
      title: 'Contact No',
	  filter:false
    },
	Active:{
		title:'Active',
	  filter:false
	}
  }
};

data = [
    
];
		
  submitted = false;
  public deleteID='';
  ngOnInit() {
	  debugger;
	  
	  this.tagID=localStorage.getItem('tagID');
	  this.toastr.setRootViewContainerRef(this.vcr);
	  this.orgnID = JSON.parse(this.authService.getLoginUser()).Orgn_ID;
	  
	  // Get roles for an organizationrole
	  this.authService.getAllOrgnTranscationTypeInfoWithRolesAndPriority(this.orgnID, 1).subscribe(data => {
		  this.OrganizationRolesWithOrganization =  data.orgnRoles;
					//this.OrganizationRoles.push(this.OrganizationRolesWithOrganization[0]);
					//this.OrganizationRoles = this.OrganizationRoles.sort(x=>x.Orgn_RoleID);
					let roleid = JSON.parse(this.authService.getLoginUser()).Role_ID;
					let rolePriority = data.TransMapArray.filter(x=>x.Role_ID == roleid);
					let priority =0
					if(rolePriority.length > 0)
					{
						priority = rolePriority[0].Priority;
					}
					
					if(data.TransMapArray.length > 0)
					{
						this.RolesArray = data.TransMapArray;
						if(this.tagID !='O')
						{
						this.checkIsLowestRoleLoggedIn(data.TransMapArray, roleid);
						}
						
		              for(let i=0; i< data.TransMapArray.length; i++)
						{		
								debugger;
								let orgnRName = this.OrganizationRolesWithOrganization.find(x=>x.Orgn_RoleID == data.TransMapArray[i].Role_ID).Orgn_RoleName;
								if(this.tagID == 'O')
								{									
									this.OrganizationRoles.push({Orgn_RoleID:data.TransMapArray[i].Role_ID, Orgn_RoleName:orgnRName, Priority:data.TransMapArray[i].Priority});
								}else {
									if(priority > data.TransMapArray[i].Priority)
									{
										this.OrganizationRoles.push({Orgn_RoleID:data.TransMapArray[i].Role_ID, Orgn_RoleName:orgnRName, Priority:data.TransMapArray[i].Priority});
									}
								}
						}
		   this.authService.getAllOrganizationUserByOrgnID(this.orgnID).subscribe(data => {
			   this.organizationUserList = data;
		  this.organizationUserTempList = data;
		   for(let i=0; i< this.organizationUserList.length; i++)
		   {
			   this.organizationUserList[i].RoleName = this.OrganizationRolesWithOrganization.filter(x=>x.Orgn_RoleID == this.organizationUserList[i].Role_ID)[0].Orgn_RoleName;
			   this.organizationUserList[i].Priority = this.RolesArray.filter(x=>x.Role_ID == this.organizationUserList[i].Role_ID)[0].Priority;
			//this.OrganizationRoles.push(data[i]);
		   }
		   
		   
		   this.data = this.organizationUserList;
		   if(this.tagID == 'OR')
		   {
			   this.data = this.data.filter(x=>x.Priority < priority );
		   }
		   
		   this.source = new LocalDataSource(this.data); 
		   this.source.setSort([{ field: 'RoleName', direction: 'asc' }]);
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
    
	
	checkIsLowestRoleLoggedIn(roles=[], roleid)
  {
	  debugger;
    let maskID =2;
	let maskArray=[];
	//let roleid = JSON.parse(this.authService.getLoginUser()).Role_ID;
	maskID = Math.pow(2,(roles.filter(x=>x.Role_ID == roleid)[0].Priority));
	for(let j=0; j< roles.length; j++)
	{
	 maskArray.push(Math.pow(2, roles[j].Priority));
							//priorityArray.push(data[j].Priority);
	}
						
	if( Math.min.apply(null, maskArray) == maskID)
	{
	 this.IsLowestRoleLoggedIn = true;	 
	}	
  }
    
    
  
  showSuccess() {
	  debugger;
        this.toastr.success('You are awesome!', 'Success!');
      }
	  
   onSearch(query: string = '') {
	  debugger;
	  if(query != '')
	  {
  this.source.setFilter([
    // fields we want to include in the search
    {
      field: 'RoleName',
      search: query
    },    
    {
      field: 'username',
      search: query
    },
    {
      field: 'Mobile_No',
      search: query
    }
  ], false); 
	  }else
	  {
		  this.source = new LocalDataSource(this.data); 
		  this.source.setSort([{ field: 'RoleName', direction: 'asc' }]);
	  }  
	}
	
	onDeleteConfirm(event) {
	  debugger;
	  //document.getElementById('deleteDiv').show();
	  this.deleteOrganizationUser(event.data._id);
	  document.getElementById("deletebtn").click();

    // if (window.confirm('Are you sure you want to delete?')) {
      // event.confirm.resolve();
    // } else {
      // event.confirm.reject();
    // }
  }
  
  onEdit(event) {
	  debugger;
	  this.showPopup(event.data._id);
	  document.getElementById("editbtn").click();
	  
    // if (window.confirm('Are you sure you want to save?')) {
      // event.newData['name'] += ' + added in code';
      // event.confirm.resolve(event.newData);
    // } else {
      // event.confirm.reject();
    // }
  }

  
  emailChange()
  {
	  
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
  
  deleteOrganizationUser(id)
  {
     this.deleteID=id;
  }
  
  deleteItem()
{
                let univModel={
					_id:''
				}
               // var objUniModel = new organizationModel();
                univModel._id=this.deleteID;
                this.authService.deleteOrganizationUserRole(univModel).subscribe(data => {
                                
                                if(data.success)
                                {
									this.toastr.success('Role user deleted successfully!', 'Success!');
                     document.getElementById('close2').click();
					 this.OrganizationRoles = [
						{Orgn_RoleID: 0,  Orgn_RoleName:"Please select", Priority:0}         
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
	Priority:0,
	Email_ID:'',	
    Mobile_No:'',
	Department:'',
	Orgn_ID:0,
	Created_By:''
     	};
  }
  
  showPopup(id)
  {              
     // this.Action="Edit";
	 this.UserNameErrorList = [];
       this.model = this.data.find(x=>x._id == id);
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
    this.model.Orgn_ID = this.orgnID;
	// Commeting this for time being
	//this.model.Password= this.generatePassword();
	this.model.Password= "admin12345";
	this.model.Created_By = JSON.parse(this.authService.getStudent()).username;
	if(this.model._id == '')
	{
  // Register user
    this.authService.addOrganizationUserRole(this.model).subscribe(data => {
		debugger;
      if(data.success){
        // //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        // this.router.navigate(['/organizationdashboard']);
      // } else {
        // //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        // this.router.navigate(['/register']);
		//this.SuccessMessage	= "New Role user added successfully.";
		document.getElementById('close').click();
		this.OrganizationRoles = [
		{Orgn_RoleID: 0,  Orgn_RoleName:"Please select", Priority:0}         
		];
	 
		this.ngOnInit();
       this.toastr.success('New Role user added successfully!', 'Success!');
      

		
		
      }
    });
	}else{
		this.authService.updateOrganizationUserRole(this.model).subscribe(data => {
		debugger;
      if(data.success){
        // //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        // this.router.navigate(['/organizationdashboard']);
      // } else {
        // //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        // this.router.navigate(['/register']);
		//this.SuccessMessage	= "New Role user added successfully.";
		document.getElementById('close').click();
		this.OrganizationRoles = [
		{Orgn_RoleID: 0,  Orgn_RoleName:"Please select", Priority:0}         
		];
		this.ngOnInit();
       this.toastr.success('Role user updated successfully!', 'Success!');
      

		
		
      }
    });
	}
	  

  }

}


