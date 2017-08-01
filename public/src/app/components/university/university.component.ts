import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service'
import {Router, ActivatedRoute, Params} from '@angular/router';

import {universityModel} from '../../model/universityModel';
import {AddUniversityComponent} from '../../components/university/add-university/add-university.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Ng2SmartTableModule, LocalDataSource  } from 'ng2-smart-table';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',  
  styleUrls: ['./university.component.scss'],
  providers: [AddUniversityComponent]
  
})
export class UniversityComponent implements OnInit {
                public eventModel:any;
                public univeritymodel = new universityModel();
    public Action:String="Edit";
	source: LocalDataSource; 
	public SuccessMessage='';
                public errorMsg:String="";
                public deleteID:String="";
                private universityList: Array<universityModel> = [];
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
    Univ_Name: {
      title: 'University Name',
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

    public isShow:boolean;
                constructor(
                private validateService: ValidateService,  
   private authService:AuthService,
   private router: Router,
   private activatedRoute:ActivatedRoute,
  private adduniversity:AddUniversityComponent,
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
                                  this.bindUniversity();      
                   }
       else
                   {
                                  this.bindGrid(); 
                   }
                  
  }
  
  onSearch(query: string = '') {
	  debugger;
	  if(query != '')
	  {
  this.source.setFilter([
    // fields we want to include in the search
    {
      field: 'Univ_Name',
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
		  this.source.setSort([{ field: 'Univ_Name', direction: 'asc' }]);
	  }
  // second parameter specifying whether to perform 'AND' or 'OR' search 
  // (meaning all columns should contain search query or at least one)
  // 'AND' by default, so changing to 'OR' by setting false here
}

  
  
  // To bind the grid with university
  bindGrid()
  {
                                  this.authService.getUniversity().subscribe(university => {   
                      this.universityList=university;
					  this.data = university;
					  this.source = new LocalDataSource(this.data); 
					  this.source.setSort([{ field: 'Univ_Name', direction: 'asc' }]);
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
	  this.deleteUniverity(event.data._id);
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


  
  // To show and edit the university in pop up
  showPopup(id)
  {              
      this.Action="Edit";
                  this.authService.getUniversityById(id).subscribe(university => {     
                  this.univeritymodel=university;
				  
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
  }
  

  bindUniversity()
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
                  this.univeritymodel = new universityModel();
  }
  
  // Update university profile
  updateProfile(btn)
{
                debugger;
                if(this.univeritymodel._id==undefined)
                {
			    // Commeting this for time being 
                //this.univeritymodel.Pwd=this.generatePassword
				this.univeritymodel.Pwd= "admin12345";
                this.authService.addUniversity(this.univeritymodel).subscribe(data => {
                                debugger;
                                if(data.success)
                                {
                                                
                     document.getElementById('close').click();
					 
                                this.bindGrid();
								this.SuccessMessage = "New University : "+ this.univeritymodel.Univ_Name +" added by admin."
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
                                this.authService.updateUniversity(this.univeritymodel).subscribe(data => {
                                debugger;
                                if(data.success)
                                {
                     document.getElementById('close').click();
					 
                                this.bindGrid();
								this.SuccessMessage = "University : "+ this.univeritymodel.Univ_Name +" updated by admin."
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

   deleteUniverity(id)
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
                
                var objUniModel = new universityModel();
                objUniModel._id=this.deleteID;
                this.authService.deleteUniversity(objUniModel).subscribe(data => {
                                
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
