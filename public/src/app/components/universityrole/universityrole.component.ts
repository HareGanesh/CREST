import { Component, OnInit,ChangeDetectorRef, ViewContainerRef } from '@angular/core';
//import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import { UniversityRole } from './UniversityRole';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Ng2SmartTableModule, LocalDataSource  } from 'ng2-smart-table';


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
  source: LocalDataSource; 
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
		
	settings = {
	delete: {
      confirmDelete: true,
	  //deleteButtonContent: '<a class="btn btn-primary pull-right" style="width:66px;" (click)="deleteUniverity(item._id)"  data-toggle="modal" data-target="#deleteDiv">Delete</a>'
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
		   this.data = this.universityUserList;
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
	  this.deleteUniverityUser(event.data._id);
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
  
  deleteUniverityUser(id)
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


