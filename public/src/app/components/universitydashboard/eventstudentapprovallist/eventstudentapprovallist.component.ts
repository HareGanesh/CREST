import { Component, OnInit, Input,ViewEncapsulation } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../../../services/validate.service';
import {AuthService} from '../../../services/auth.service'
import {Router, ActivatedRoute, Params} from '@angular/router';
import {universityEventApprovalHistory} from './universityEventApprovalHistory';
import { UniversityTransEventApproval } from './UniversityTransEventApproval';
import { UniversityTransEventApprovalList } from './UniversityTransactionEventApprovalList';
import {TooltipModule} from "ngx-tooltip";
import {AccordionModule} from "ng2-accordion";

@Component({
  selector: 'app-eventstudentapprovallist',
  templateUrl: './eventstudentapprovallist.component.html',
  styleUrls: ['./eventstudentapprovallist.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class EventstudentapprovallistComponent implements OnInit {


    public Action:String="Edit";
	public errorMsg:String="";
	public deleteID:String="";
	searchFilter:any;
	UnivEventModel:EventModel[];
	eventModel:EventModel[];
	isSupervisorLoggedIn:boolean=false;
	ApproveAllOrConfirmAll:String="Approve All";
	tagID:String;
	private universityEventApprovalUserList: Array<UniversityTransEventApprovalList> = [];
	TransEventApprovalMapping:UniversityTransEventApproval[]=[];
	//universityApprovalHistory:universityApprovalHistory;
	public universityEventApprovalHistory:universityEventApprovalHistory;
	model:Object;
    public Students = [
	  {StudentID: "0",  StudentName:"please select"}
         
     ];
	 public Roles = [
	  {RoleID: 0,  RoleName:"", Priority:0, Tran_Map_ID:0}
         
     ];
	 
	 public UniversityRoles = [
	   {Univ_RoleID: 0,  Univ_RoleName:"Please select", Univ_ID:""}
         
     ];
	 
	 public univID;
	 
	constructor(
	private validateService: ValidateService,  
   private authService:AuthService,
   private router: Router,
   private activatedRoute:ActivatedRoute,
  
  private flashMessage:FlashMessagesService
  ) {}
  
  @Input()
   ngOnInit() {	
   this.tagID=localStorage.getItem('tagID');
	this.model={	
	TransEventApprovalMapping:[],	
  	universityEventApprovalHistory:universityEventApprovalHistory
  	}
	this.univID = JSON.parse(this.authService.getLoginUser()).Univ_ID;
	this.GetUniversityRolesByUnivID();
	
	this.authService.getAllTranscationTypeWithRolesAndPriority(this.univID, 2).subscribe(data => {
					if(data.length > 0)
					{
						for(let i=0; i< data.length; i++)
						{
							this.Roles.push({RoleID:data[i].Role_ID, RoleName:this.UniversityRoles.filter(x=>x.Univ_RoleID == data[i].Role_ID)[0].Univ_RoleName, Priority:data[i].Priority, Tran_Map_ID: data[i].Tran_Map_ID});
						}
						
						if(this.tagID == 'UR')
						{
						this.checkIsSupervisorLoggedIn();
						}
						
						this.bindGrid();
					}
				 },//observable also returns error
    err => {
      console.log(err);
      return false;
    });
   
  }
  
  checkIsSupervisorLoggedIn()
  {
    let maskID =2;
	let maskArray=[];
	let roleid = JSON.parse(this.authService.getLoginUser()).Role_ID;
	maskID = Math.pow(2,(this.Roles.filter(x=>x.RoleID == roleid)[0].Priority));
	for(let j=0; j< this.Roles.length; j++)
	{
	 maskArray.push(Math.pow(2, this.Roles[j].Priority));
							//priorityArray.push(data[j].Priority);
	}
						
	if( Math.max.apply(null, maskArray) == maskID)
	{
	 this.isSupervisorLoggedIn = true;
	 this.ApproveAllOrConfirmAll = "Confirm All";
	}	
  }
  
  
  // To bind the grid with university
  bindGrid()
  {
	  //let univID=2;
	  let maskID=2;
	  let rolesArry=[]
	  debugger;
	  // Get university
	  
	  
	  
      
	  
	  debugger;
	  //
	  this.GetAllStudent();
	  if(this.tagID == 'UR')
	  {
		  let roleid = JSON.parse(this.authService.getLoginUser()).Role_ID;
	       maskID = Math.pow(2,(this.Roles.filter(x=>x.RoleID == roleid)[0].Priority));
	  	  this.authService.getAllUnivTranscationEventApprovalDetailByUnivIDAndMaskID(this.univID, maskID).subscribe(university => {   
	      this.universityEventApprovalUserList=university.UnivTranscationEventApprovalDetail;
		  if(this.universityEventApprovalUserList.length > 0)
		  {
		  for(let i=0; i<this.universityEventApprovalUserList.length;i++)
		  {
		  //this.universityEventApprovalUserList[i].Event_Title= university.evt.EventTitle;
		  //this.universityEventApprovalUserList[i].EventID = university.evt._id;
		  this.universityEventApprovalUserList[i].Student_Name= this.Students.filter(x=>x.StudentID == this.universityEventApprovalUserList[i].Student_ID)[0].StudentName;
		  this.universityEventApprovalUserList[i].Prev_Approver_RName= this.Roles.filter(x=>x.RoleID == this.universityEventApprovalUserList[i].Prev_Approver_RID)[0].RoleName;
		  this.universityEventApprovalUserList[i].Next_Approver_RName= this.Roles.filter(x=>x.RoleID == this.universityEventApprovalUserList[i].Next_Approver_RID)[0].RoleName;
		  }
		  
		  this.bindGridUniverties();
		  }else
		  {
			  this.bindGridUniverties();
		  }
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	  }else if(this.tagID == "U"){
		  maskID = 1024;
	  	  this.authService.getAllUnivTranscationEventApprovalDetailByUnivIDAndMaskID(this.univID, maskID).subscribe(university => {   
	      this.universityEventApprovalUserList=university.UnivTranscationEventApprovalDetail;
		  if(this.universityEventApprovalUserList.length > 0)
		  {
		  for(let i=0; i<this.universityEventApprovalUserList.length;i++)
		  {
		  //this.universityEventApprovalUserList[i].Event_Title= university.evt.EventTitle;
		  //this.universityEventApprovalUserList[i].EventID = university.evt._id;
		  this.universityEventApprovalUserList[i].Student_Name= this.Students.filter(x=>x.StudentID == this.universityEventApprovalUserList[i].Student_ID)[0].StudentName;
		  this.universityEventApprovalUserList[i].Prev_Approver_RName= this.Roles.filter(x=>x.RoleID == this.universityEventApprovalUserList[i].Prev_Approver_RID)[0].RoleName;
		  this.universityEventApprovalUserList[i].Next_Approver_RName= this.Roles.filter(x=>x.RoleID == this.universityEventApprovalUserList[i].Next_Approver_RID)[0].RoleName;
		  }
		  
		  this.bindGridUniverties();
		  }else
		  {
			  this.bindGridUniverties();
		  }
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	  }
	
	
		
  }
  
  
  
  GetAllStudent()
  {
	  
	
	  this.authService.getAllStudent().subscribe(data => {
		     for(let i=0; i< data.length; i++)
       this.Students.push({StudentID:data[i].Student_ID, StudentName:data[i].Student_Name});
			   
		   
       },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	
	
	
  }
  
  GetUniversityRolesByUnivID()
  {
	  this.authService.getUniversityRolesByUnivID(this.univID).subscribe(data => {
					if(data.length > 0)
					{
						for(let i=0; i< data.length; i++)
						{
							this.UniversityRoles.push({Univ_RoleID:data[i].Univ_RoleID, Univ_RoleName:data[i].Univ_RoleName, Univ_ID:this.univID});
						}
					}
				 },//observable also returns error
    err => {
      console.log(err);
      return false;
    });
  }
  
  
    
  ApproveStudent(event)
  {
	  let TransEventApprovalMappingLocal:UniversityTransEventApproval[]=[];
	  let TransEventApprovalMappingArray:UniversityTransEventApproval[]=[];
	  let universityEventApprovalHistoryArray:universityEventApprovalHistory[]=[];
	  let TransEventApprovalMappingDataList = event.university_EventApprovalUserList.filter(x=>x.isChecked == true);
	  for(let x=0; x<TransEventApprovalMappingDataList.length;x++)
	  {
		let TransEventApprovalMappingData = TransEventApprovalMappingDataList[x];
		
	  debugger;
	 // return false;
	  let maskID=2;
	  let roleid = JSON.parse(this.authService.getLoginUser()).Role_ID;
	       maskID = Math.pow(2,(this.Roles.filter(x=>x.RoleID == roleid)[0].Priority));
	  let status=0;
	  let priorityArray=[];
	  let maskArray=[];
	  let transApprovalHistoryID=1;
	  
	  this.authService.getMaxTransEventApprovalHistoryID().subscribe(data => {
		   if(data.length > 0)
		   {
		    transApprovalHistoryID = data[0].Tran_Approval_History_ID + 1;
		   }
		},
		//observable also returns error
		err => {
		console.log(err);
		return false;
		});
	  this.universityEventApprovalHistory={TranApprovalHistoryID:0,ApprovedBy:"", ApprovedOn:new Date(), MaskID:0,Status:0, Comments:"", TransApprovalID:"" };
	  //this.authService.getAllTranscationTypeWithRolesAndPriority(TransEventApprovalMappingData.Univ_ID, 2).subscribe(data => {
					// if(data.length > 0)
					// {
						let length = TransEventApprovalMappingLocal.length;
						for(let y=0; y< length;y++)
						{
						TransEventApprovalMappingLocal.pop();
						}
						
						for(let j=0; j< this.Roles.length; j++)
						{
							maskArray.push(Math.pow(2, this.Roles[j].Priority));
							priorityArray.push(this.Roles[j].Priority);
						}
						
						if( Math.max.apply(null, maskArray) == maskID)
						 {
							 status=1;
						 }
						 
						for(let i=0; i< this.Roles.length; i++)
						{					
						 
							 // if(Math.pow(2, data[i].Priority) == maskID)
							 // {
								 // status=1;
							 // }
						  if( Math.pow(2, this.Roles[i].Priority) > maskID || status == 1)
						 {
							 if(status == 1)
							 {
								 i=this.Roles.length;
								 let dataarray = this.Roles.find(x=>x.Priority == Math.max.apply(null, priorityArray));
								 TransEventApprovalMappingLocal.push({TransMapID : dataarray.Tran_Map_ID, NextApproverRoleID:dataarray.RoleID, 
							PrevApproverRoleID:TransEventApprovalMappingData.Next_Approver_RID, EventID:TransEventApprovalMappingData.EventID,
							Priority:dataarray.Priority,MaskID:Math.pow(2, dataarray.Priority), Status:status, 
							UniversityID:TransEventApprovalMappingData.Univ_ID, TransApprovalID:TransEventApprovalMappingData.Tran_Approval_ID,
							TransDt:TransEventApprovalMappingData.Trans_Dt, StudentID:TransEventApprovalMappingData.Student_ID, TranApprovalIDNumber:TransEventApprovalMappingData.Tran_Approval_IDNumber});
							
							}else 
							{
								TransEventApprovalMappingLocal.push({TransMapID : this.Roles[i].Tran_Map_ID, NextApproverRoleID:this.Roles[i].RoleID, PrevApproverRoleID:TransEventApprovalMappingData.Next_Approver_RID,
							Priority:this.Roles[i].Priority,MaskID:Math.pow(2, this.Roles[i].Priority), Status:status, EventID:TransEventApprovalMappingData.EventID,
							UniversityID:TransEventApprovalMappingData.Univ_ID, TransApprovalID:TransEventApprovalMappingData.Tran_Approval_ID, TransDt:TransEventApprovalMappingData.Trans_Dt, StudentID:TransEventApprovalMappingData.Student_ID, TranApprovalIDNumber:TransEventApprovalMappingData.Tran_Approval_IDNumber});
							}
						 }
						}
						
	  TransEventApprovalMappingArray.push(TransEventApprovalMappingLocal.sort(x=>x.Priority)[TransEventApprovalMappingLocal.length-1]);		
	  //TransEventApprovalMappingArray.push(TransEventApprovalMappingArray);
					 debugger;
	  this.universityEventApprovalHistory.ApprovedBy = this.Roles.filter(x=>x.RoleID == roleid)[0].RoleName;
	  this.universityEventApprovalHistory.MaskID = TransEventApprovalMappingData.Mask_ID; 
	  this.universityEventApprovalHistory.TransApprovalID = TransEventApprovalMappingData.Tran_Approval_ID;
	  this.universityEventApprovalHistory.Status =1;
	  this.universityEventApprovalHistory.Comments = "Approved";
	  this.universityEventApprovalHistory.TranApprovalHistoryID=transApprovalHistoryID;
	  universityEventApprovalHistoryArray.push(this.universityEventApprovalHistory);
	  debugger;
	  
					//}
			// },
				// //observable also returns error
					// err => {
					// console.log(err);
					// return false;
				// });
	  }

	this.authService.addUniversityTransEventApprovalHistory(this.model, universityEventApprovalHistoryArray, TransEventApprovalMappingArray).subscribe(data => {
		debugger;
      if(data.success){
        //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        this.bindGrid();
      } else {
        //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  }
  
  check(ev, event, transApprovalId) {
	  if(this.isSupervisorLoggedIn)
	  {
	  debugger;
    //this.universityEventApprovalUserList.forEach(x => x.isChecked = ev.target.checked)
	let totalAllowed = event.TotalAllowedParticipant;
	  let Confirmed = event.TotalConfirmedParticipant;
	  let totalChecked = 0;
	  totalChecked = event.university_EventApprovalUserList.filter(x => x.isChecked == true).length;
	  if(totalAllowed < Confirmed + totalChecked)
	  {
		  this.flashMessage.show("Total no of participant into this event : " + event.EventTitle + " has been crossed. Not allowed to select more", {
             cssClass: 'alert-danger'});
		  ev.target.checked = false;
       event.university_EventApprovalUserList.filter(x=>x.Tran_Approval_ID == transApprovalId).forEach(x => x.isChecked = ev.target.checked);
	  }else
	  {
		// this.isAllChecked(event); 
	  }
	  }
  }
  
  checkAll(ev, event) {
	  debugger;
	  if(this.isSupervisorLoggedIn)
	  {
	  let totalAllowed = event.TotalAllowedParticipant;
	  let Confirmed = event.TotalConfirmedParticipant;
	  if(totalAllowed >= event.university_EventApprovalUserList.length + Confirmed)
	  {
       event.university_EventApprovalUserList.forEach(x => x.isChecked = ev.target.checked);
	  }
	  else
	  {
		   this.flashMessage.show('Total no of participant into this event : ' + event.EventTitle + ' has been crossed. Not allowed to select All', {
             cssClass: 'alert-danger'});
		    ev.target.checked = false;
			event.university_EventApprovalUserList.forEach(x => x.isChecked = ev.target.checked);
		  
	  }
	  }else {
		  event.university_EventApprovalUserList.forEach(x => x.isChecked = ev.target.checked);
	  }
  }

  isAllChecked(event) {
	  
    return event.university_EventApprovalUserList.every(_ => _.isChecked);
  }
  
  bindGridUniverties()
  {
	  var student=JSON.parse(this.authService.getStudent());
	  debugger;
	  	var modelData=[];
		var UnivData=[];
		var EventStudentData=[];
		var id='';
	    var filterEvent=[];
		
		 this.authService.getEventStudentApproved().subscribe(eventStudent => {
					EventStudentData = eventStudent;
					},
						//observable also returns error
					err => {
					console.log(err);
					return false;
					});
					
		//this.eventModel={_id:"",EventTitle:"", university_EventApprovalUserList:this.universityEventApprovalUserList};
    this.authService.getEvents().subscribe(event => {
      modelData= event.filter((E) => E.IsApproved == true && E.IsRejected == false);
	  for(var i=0;i<modelData.length;i++)
	 {
		  var m =this.dayDiff(modelData[i].StartDt);
		  id=modelData[i]._id;
		  modelData[i].RemainDay=m;
		 
		  //this.eventModel.push({_id: modelData[i]._id, EventTitle:modelData[i].EventTitle, university_EventApprovalUserList:this.universityEventApprovalUserList.filter(x=> x.EventID == id.toString())});
	 }
	 this.eventModel=modelData;
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
  	
	debugger;
		//{{ksdf.Orgn_ID}}
		this.authService.GetEventByUnivID(student.Univ_ID).subscribe(univ => {			
			UnivData=univ;
			 if(this.eventModel.length>0 && UnivData.length >0)
  {
	  for(var i=0;i < this.eventModel.length;i++)
	          {
				 // var m=this.eventModel[i];
				 this.eventModel[i].university_EventApprovalUserList = this.universityEventApprovalUserList.filter(x=> x.EventID == this.eventModel[i]._id.toString());
				 if(EventStudentData.length > 0)
				 {
					 this.eventModel[i].TotalConfirmedParticipant = EventStudentData.filter(x=> x.EventID == this.eventModel[i]._id.toString()).length;
				 }
			  }
	    for(var j=0; j < UnivData.length;j++)
		  {
			 for(var i=0;i < this.eventModel.length;i++)
	          {
				  
				 // var m=this.eventModel[i];
				 //this.eventModel[i].university_EventApprovalUserList = this.universityEventApprovalUserList.filter(x=> x.EventID == this.eventModel[i]._id.toString());
		         if(UnivData[j].EventID ==this.eventModel[i]._id)
				{
					filterEvent.push(this.eventModel[i]);
					
				}
	          }
		   }
	 
	  this.UnivEventModel=filterEvent;
	  //this.UnivEventModel.universityEventApprovalUserList = 
  }
		});
  

 
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
	var univData=this.UnivEventModel;
	var filterData=[];
	var univFilterData=[];
	
	if(this.tagID == '0' || this.tagID == 'S' || this.tagID == 'U' || this.tagID == 'UR')
	{
	  for(var i=0;i<modelData.length;i++)
	 {
		  if( modelData[i].EventTitle.toString().toLowerCase().indexOf(this.searchFilter.toLowerCase())!=-1)
		  {
			  filterData.push(modelData[i]);
		  }
	 }
	 this.eventModel=filterData;
	}
	 
	 for(var i=0;i<univData.length;i++)
	 {
		 debugger;
		  if(univData[i].EventTitle.toString().toLowerCase().indexOf(this.searchFilter.toLowerCase())!=-1)
		  {
			  univFilterData.push(univData[i]);
		  }
	 }
	 this.UnivEventModel=univFilterData;
	}
	else
	{
		
		
		if( this.tagID == 'UR')
		{
		this.bindGrid();
		}
	}
    //alert(filterData);
  }
  
}

export class EventModel
{
	public constructor(	
	public _id: String,
	public EventTitle:String,
	public TotalAllowedParticipant:Number,
	public TotalConfirmedParticipant:Number,
	public university_EventApprovalUserList:Array<UniversityTransEventApprovalList>	
	)
	{}

}




