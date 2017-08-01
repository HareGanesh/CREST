import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service'
import {Router, ActivatedRoute, Params} from '@angular/router';
import {organizationModel} from '../../model/organizationModel';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Ng2SmartTableModule, LocalDataSource  } from 'ng2-smart-table';


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',  
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
    public eventModel:any;
    public organizationmodel = new organizationModel();
    public Action:String="Edit";
	SuccessMessage='';
	public errorMsg:String="";
	public deleteID:String="";
	private organizationList: Array<organizationModel> = [];
    public isShow:boolean;
	source: LocalDataSource; 
	
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
    OrgnName: {
      title: 'Organization Name',
	  filter:false
	  
    },
    Address: {
      title: 'Address',
	  filter:false
    },
    EmailID: {
      title: 'Email ID',
	  filter:false
    },
    ContactNo: {
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
	
    constructor(
	   private validateService: ValidateService,  
	   private authService:AuthService,
	   private router: Router,
	   private activatedRoute:ActivatedRoute,
	   //private adduniversity:AddUniversityComponent,
	   private flashMessage:FlashMessagesService,
	   public toastr: ToastsManager, public vcr: ViewContainerRef
	   )
		{	
			this.toastr.setRootViewContainerRef(vcr);
		}
  
  @Input()
  ngOnInit() {      
 debugger;
this.activatedRoute.params.subscribe((params: Params) => {
       this.isShow = params['id']==1?true:false;
       
      }); 
                  debugger;         
                  if(!this.isShow)
                   {
                                  //this.bindOrganization();      
								  this.bindGrid();
                   }
       else
                   {
                                  this.bindGrid(); 
                   }
                  
  }
  
  
  // To bind the grid with Organization
  bindGrid()
  {
	  debugger;
        this.authService.getOrganizations().subscribe(organization => {   
        this.organizationList=organization;
		this.data = organization;
		this.source = new LocalDataSource(this.data); 
		this.source.setSort([{ field: 'OrgnName', direction: 'asc' }]);

    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
  }
  
  onDeleteConfirm(event) {
	  debugger;
	  //document.getElementById('deleteDiv').show();
	  this.deleteOrganization(event.data._id);
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
  
  onSearch(query: string = '') {
	  debugger;
	  if(query != '')
	  {
  this.source.setFilter([
    // fields we want to include in the search
    {
      field: 'OrgnName',
      search: query
    },
    {
      field: 'Address',
      search: query
    },
    {
      field: 'EmailID',
      search: query
    },
    {
      field: 'ContactNo',
      search: query
    }
	], false); 
	  }else
	  {
		  this.source = new LocalDataSource(this.data); 
		  this.source.setSort([{ field: 'OrgnName', direction: 'asc' }]);
	  }  
	}
  
  // To show and edit the university in pop up
  showPopup(id)
  {              
      this.Action="Edit";
                  this.authService.getOrganizationById(id).subscribe(organization => {     
                  this.organizationmodel=organization;
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
  }
  

  bindOrganization()
  {
                var modelData=[];
                var OrgData=[];
                var filterEvent=[];
    this.authService.getEvents().subscribe(event => {
      modelData= event;
                  for(var i=0;i<modelData.length;i++)
                {
                                  var m =this.dayDiff(modelData[i].StartDt);                           
                                  modelData[i].RemainDay=m;
                }
                this.eventModel=modelData;
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });

  


}

  // To clear model during add University
  clearModel()
  {
                  this.Action="Add";
                  this.organizationmodel = new organizationModel();
				  this.organizationmodel.ContactNo = '';
  }
  
  // Update university profile
  updateProfile(btn)
	{
                debugger;
                if(this.organizationmodel._id==undefined)
                {
                this.organizationmodel.Pwd= 'admin12345';//this.generatePassword();
                this.authService.addOrganization(this.organizationmodel).subscribe(data => {
                                debugger;
                                if(data.success)
                                {
                                                
								document.getElementById('close').click();
                                this.bindGrid();
								this.SuccessMessage = "New Organization : "+ this.organizationmodel.OrgnName +" added by admin."
								this.toastr.success(this.SuccessMessage, 'Success!');
                                }
                                else
                                {
                                    this.errorMsg=data.msg;                              
                                }
                });
                }
                else
                {
                                this.authService.updateOrganization(this.organizationmodel).subscribe(data => {
                                debugger;
                                if(data.success)
                                {
								document.getElementById('close').click();
                                this.bindGrid();
								this.SuccessMessage = "Organization : "+ this.organizationmodel.OrgnName +" updated by admin."
								this.toastr.success(this.SuccessMessage, 'Success!');
                                }
                });
                
                }
	}

// To generate random password
		generatePassword() 
					{
			var length = 6,
			charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
		   retVal = "";
			for (var i = 0, n = charset.length; i < length; ++i) 
									{
			   retVal += charset.charAt(Math.floor(Math.random() * n));
			}
		return retVal;
	  }

   deleteOrganization(id)
	{
	  this.deleteID=id;
	}

    dayDiff(format)
   {           
                var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
     var firstDate = new Date();
     var secondDate = new Date(format);

     var diffDays = Math.round(Math.abs((secondDate.getTime() - firstDate.getTime())/(oneDay)));
     return diffDays;
   }
// To delete University 

	deleteItem()
	{
                
                var objOrgnModel = new organizationModel();
                objOrgnModel._id=this.deleteID;
                this.authService.deleteOrganization(objOrgnModel).subscribe(data => {
                                
                        if(data.success)
                            {
								document.getElementById('close2').click();
								this.bindGrid();
								this.SuccessMessage = "University is deleted by admin.";
								this.toastr.success(this.SuccessMessage, 'Success!');
                            }
                });           
	}
}
