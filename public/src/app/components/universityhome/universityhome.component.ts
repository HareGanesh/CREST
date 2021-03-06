import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './universityhome.component.html',
  styleUrls: ['./universityhome.component.scss']
})
export class UniversityHomeComponent implements OnInit {
tagID:String;
eventModel:EventModel[];
OrgEventModel:EventModel[];
ApprovedOrgEventModel:EventModel[];
RejectedUnivEventModel:EventModel[];
public ActionPar = '';
 searchFilter:any;
 public showSearchDiv='';
  constructor(
   private validateService: ValidateService,  
    private authService:AuthService,
    private router: Router,
	public toastr: ToastsManager, private vcr: ViewContainerRef
	)
	{
	
this.toastr.setRootViewContainerRef(vcr);
		}
ngOnInit() {
	debugger;
	this.tagID=localStorage.getItem('tagID');
	this.ActionPar = localStorage.getItem('actionResult');
	if(this.ActionPar == 'ER')
	{
		this.toastr.success('Event created!', 'Success!');
	}
	this.authService.SetActionResult('');
	if(this.authService.login())
	{
		if(this.tagID == 'S' || this.tagID == 'U' || this.tagID == 'UR' || this.tagID == 'O')
		{
			this.bindGridUniverties();
		}else if(this.tagID == 'C')
		{
			this.bindEvents();
		}
		return;
	}
	else{
		this.router.navigate(['/login']);
		return;
	} 
	
  }
  
  showSearchBox(){
	  debugger;
	 this.showSearchDiv="Search";
  }
  
   approveEvent(id)
  {
	var  model=
	  {
         _id: ''  
      }
	  model._id=id;
	  debugger;
	  this.authService.approveEvent(model).subscribe(event => {
		  if(event.success)
		  {
			  this.bindEvents();
		  }
	  });
  }
  
  rejectEvent(id)
  {
	var  model=
	  {
         _id: ''  
      }
	  model._id=id;
	  debugger;
	  this.authService.rejectEvent(model).subscribe(event => {
		  if(event.success)
		  {
			  this.bindEvents();
		  }
	  });
  }
  
  
  
  bindEvents()
  {
	  debugger;
	  
	var modelData=[];
	var OrgData=[];
	var filterEvent=[];
    this.authService.getEvents().subscribe(event => {
		debugger;
      modelData= event.filter((E) => E.IsApproved == false && E.IsRejected == false);
	  for(var i=0;i<modelData.length;i++)
	 {
		  var m =this.dayDiff(modelData[i].StartDt);		  
		  modelData[i].RemainDay=m;
	 }
	 this.OrgEventModel=modelData;
	 
	 modelData= event.filter((E) => E.IsApproved == true);
	  for(var i=0;i<modelData.length;i++)
	 {
		  var m =this.dayDiff(modelData[i].StartDt);		  
		  modelData[i].RemainDay=m;
	 }
	 this.ApprovedOrgEventModel=modelData;
    },
	
	
	
    //observable also returns error
    err => {
      console.log(err);
      return false;
    }); 

 
   } 
  
  

  bindGrid()
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
  	var student=JSON.parse(this.authService.getStudent());
	debugger;
		//{{ksdf.Orgn_ID}}
		this.authService.GetEventByOrgID(student.Orgn_ID).subscribe(org => {			
			OrgData=org;
			 if(this.eventModel.length>0 && OrgData.length >0)
  {
	    for(var j=0; j < OrgData.length;j++)
		  {
			 for(var i=0;i < this.eventModel.length;i++)
	          {
				 // var m=this.eventModel[i];
		         if(OrgData[j].EventID ==this.eventModel[i]._id)
				{
					filterEvent.push(this.eventModel[i]);
					
				}
	          }
		   }
	 
	  this.OrgEventModel=filterEvent;
  }
		});
  

 
}

 bindGridUniverties()
  {
	  	var modelData=[];
		var UnivData=[];
	    var filterEvent=[];
    this.authService.getEvents().subscribe(event => {
		if(this.tagID == 'O')
		{
      modelData= event.filter((E) => E.Created_by == JSON.parse(this.authService.getStudent()).username);
		}else 
		{
			modelData= event.filter((E) => E.Created_by == JSON.parse(this.authService.getStudent()).UserName);
		}
	  for(var i=0;i<modelData.length;i++)
	 {
		  var m =this.dayDiff(modelData[i].StartDt);
		  
		  modelData[i].RemainDay=m;
	 }
	 this.OrgEventModel=modelData;
	 if(this.tagID == 'O')
		{
      modelData= event.filter((E) => E.IsApproved == true && E.Created_by == JSON.parse(this.authService.getStudent()).username);
		}else 
		{
	 modelData= event.filter((E) => E.IsApproved == true && E.Created_by == JSON.parse(this.authService.getStudent()).UserName);
		}
	  for(var i=0;i<modelData.length;i++)
	 {
		  var m =this.dayDiff(modelData[i].StartDt);		  
		  modelData[i].RemainDay=m;
	 }
	 this.ApprovedOrgEventModel=modelData;
	 if(this.tagID == 'O')
		{
      modelData= event.filter((E) => E.IsRejected == true && E.Created_by == JSON.parse(this.authService.getStudent()).username);
		}else 
		{
	 modelData= event.filter((E) => E.IsRejected == true && E.Created_by == JSON.parse(this.authService.getStudent()).UserName);
		}
	  for(var i=0;i<modelData.length;i++)
	 {
		  var m =this.dayDiff(modelData[i].StartDt);		  
		  modelData[i].RemainDay=m;
	 }
	 
	 this.RejectedUnivEventModel = modelData;
	 
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	
	
  	// var student=JSON.parse(this.authService.getStudent());
	// debugger;
		// //{{ksdf.Orgn_ID}}
		// this.authService.GetEventByUnivID(student.Univ_ID).subscribe(univ => {			
			// UnivData=univ;
			 // if(this.eventModel.length>0 && UnivData.length >0)
  // {
	    // for(var j=0; j < UnivData.length;j++)
		  // {
			 // for(var i=0;i < this.eventModel.length;i++)
	          // {
				 // // var m=this.eventModel[i];
		         // if(UnivData[j].EventID ==this.eventModel[i]._id)
				// {
					// filterEvent.push(this.eventModel[i]);
					
				// }
	          // }
		   // }
	 
	 // // if(this.tagID == 'S')
  // // {
// // document.getElementById("openModalButton").click();
  // // }
	  // this.OrgEventModel=filterEvent;
  // }
		//});  
 
}

dayDiff(format){
	
	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
var firstDate = new Date();
var secondDate = new Date(format);

var diffDays = Math.round(Math.abs((secondDate.getTime() - firstDate.getTime())/(oneDay)));
return diffDays;
}

public open() {
	debugger;
	if(this.searchFilter !=undefined && this.searchFilter !='')
	{
	var modelData=this.eventModel;
	var orgData=this.OrgEventModel;
	var orgApprovedData = this.ApprovedOrgEventModel;
	var orgRejectedData = this.RejectedUnivEventModel;
	var filterData=[];
	var orgFilterData=[];
	var orgApproveFilterData=[];
	var orgRejectedFilterData=[];
	
	if(this.tagID == '0' || this.tagID == 'S' || this.tagID == 'U' || this.tagID == 'UR')
	{
	  // for(var i=0;i<modelData.length;i++)
	 // {
		  // if(modelData[i].Location.toString().toLowerCase().indexOf(this.searchFilter.toLowerCase())!=-1 || modelData[i].EventTitle.toString().toLowerCase().indexOf(this.searchFilter.toLowerCase())!=-1)
		  // {
			  // filterData.push(modelData[i]);
		  // }
	 // }
	 //this.eventModel=filterData;
	}
	 
	 for(var i=0;i<orgData.length;i++)
	 {
		 debugger;
		  if(orgData[i].Location.toString().toLowerCase().indexOf(this.searchFilter.toLowerCase())!=-1 || orgData[i].EventTitle.toString().toLowerCase().indexOf(this.searchFilter.toLowerCase())!=-1)
		  {
			  orgFilterData.push(orgData[i]);
		  }
	 }
	 this.OrgEventModel=orgFilterData;
	 
	 for(var i=0;i<orgApprovedData.length;i++)
	 {
		 debugger;
		  if(orgApprovedData[i].Location.toString().toLowerCase().indexOf(this.searchFilter.toLowerCase())!=-1 || orgApprovedData[i].EventTitle.toString().toLowerCase().indexOf(this.searchFilter.toLowerCase())!=-1)
		  {
			  orgApproveFilterData.push(orgApprovedData[i]);
		  }
	 }
	 this.ApprovedOrgEventModel=orgApproveFilterData;
	 
	 for(var i=0;i<orgRejectedData.length;i++)
	 {
		 debugger;
		  if(orgRejectedData[i].Location.toString().toLowerCase().indexOf(this.searchFilter.toLowerCase())!=-1 || orgRejectedData[i].EventTitle.toString().toLowerCase().indexOf(this.searchFilter.toLowerCase())!=-1)
		  {
			  orgRejectedFilterData.push(orgRejectedData[i]);
		  }
	 }
	 this.RejectedUnivEventModel=orgRejectedData;
	 
	 this.showSearchDiv='';
	 this.searchFilter='';
	}
	else
	{
		if(this.tagID == 'C')
		{
		this.bindEvents();
		}
		
		if(this.tagID == 'O')
		{
		this.bindGrid();
		}
		
		if(this.tagID == 'S' || this.tagID == 'U' || this.tagID == 'UR')
		{
		this.bindGridUniverties();
		}
	}
    //alert(filterData);
  }
  
 

}
export class EventModel
{
_id:{type:String};
EventID:Number  ;
EventTitle:{type: String};
Description:{type: String};
CategoriesMstr:{type: String};
StartDt:{type: Date	};
EndDt:{	type: Date};
EventRegisterEndDt:{type: Date};
EventType:{type: String}
POCRequired:{type: String};
POCDeadLine:{type: String};
Location:{ type: String };
Status:{type: String};
Rules:{type: String }; 
Event_Logo:{type: String};
Published_Tag:{type: String};
Prizes:{type: Number};
Created_On:{type: Date };
Created_by:{type: String};
Modified_On:{type: Date};
Modified_by:{type: String};
RemainDay:{type: String};
}