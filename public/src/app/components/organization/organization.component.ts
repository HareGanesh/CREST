import { Component, OnInit, Input } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service'
import {Router, ActivatedRoute, Params} from '@angular/router';

import {organizationModel} from '../../model/organizationModel';


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',  
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
                public eventModel:any;
                public organizationmodel = new organizationModel();
    public Action:String="Edit";
                public errorMsg:String="";
                public deleteID:String="";
                private organizationList: Array<organizationModel> = [];
    public isShow:boolean;
                constructor(
                private validateService: ValidateService,  
   private authService:AuthService,
   private router: Router,
   private activatedRoute:ActivatedRoute,
  //private adduniversity:AddUniversityComponent,
  private flashMessage:FlashMessagesService
  ) {}
  
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
  
  
  // To bind the grid with university
  bindGrid()
  {
	  debugger;
                      this.authService.getOrganizations().subscribe(organization => {   
                      this.organizationList=organization;
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
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
                                }
                });           
}
}
