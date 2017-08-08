import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service'
import {Router, ActivatedRoute, Params} from '@angular/router';
import {OrganizationEventApprovalHistory} from './organizationEventApprovalHistory';
import { OrganizationTransEventApproval } from './organizationTransEventApproval';
import { OrganizationTransEventApprovalList } from './organizationTransactionEventApprovalList';
import {TooltipModule} from "ngx-tooltip";
import {AccordionModule} from "ng2-accordion";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-EmployeeEventApprovalList',
  templateUrl: './EmployeeEventApprovalList.component.html',
  styleUrls: ['./EmployeeEventApprovalList.component.scss']
})
export class EmployeeEventApprovalListComponent implements OnInit {

    public Action:String="Edit";
	public errorMsg:String="";
	public deleteID:String="";
	public Comments:String="";
	public showSearchDiv='';
	searchFilter:any;
	OrgnEventModel:EventModel[];
	eventModel:EventModel[];
	isSupervisorLoggedIn:boolean=false;
	ApproveAllOrConfirmAll:String="Approve All";
	tagID:String;
	private organizationEventApprovalUserList: Array<OrganizationTransEventApprovalList> = [];
	TransEventApprovalMapping:OrganizationTransEventApproval[]=[];
	TransEventApprovalMappingStringArrayGlobal:String[]=[];
	private TransEventApprovalMappingArrayGlobal:OrganizationTransEventApproval[]=[];
	private organizationEventApprovalHistoryArrayGlobal:OrganizationEventApprovalHistory[]=[];
	//organizationApprovalHistory:organizationApprovalHistory;
	public OrganizationEventApprovalHistory:OrganizationEventApprovalHistory;
	model:Object;
    public Employees = [
	  {EmployeeID: "0",  EmployeeName:"please select"}
         
     ];
	 public Roles = [
	  {RoleID: 0,  RoleName:"", Priority:0, Tran_Map_ID:0}
         
     ];
	 
	 public OrganizationRoles = [
	   {Orgn_RoleID: 0,  Orgn_RoleName:"Please select", Orgn_ID:""}
         
     ];
	 
	 public orgnID;
	 
	constructor(
	private validateService: ValidateService,  
   private authService:AuthService,
   private router: Router,
   private activatedRoute:ActivatedRoute,
  
  private flashMessage:FlashMessagesService,
	public toastr: ToastsManager, public vcr: ViewContainerRef
	)
	{
	
this.toastr.setRootViewContainerRef(vcr);
		}
  
  
  @Input()
   ngOnInit() {	
   debugger;
   this.tagID=localStorage.getItem('tagID');
	this.model={	
	TransEventApprovalMapping:[],	
  	OrganizationEventApprovalHistory:OrganizationEventApprovalHistory
  	}
	this.orgnID = JSON.parse(this.authService.getLoginUser()).Orgn_ID;
	this.GetOrganizationRolesByOrgnID();
	
	this.authService.getOrgnTranscationTypeDetailByOrgnIDAndTransTypeAndCurrentDate(this.orgnID, 2).subscribe(data => {
		debugger;
					if(data.length > 0)
					{
						for(let i=0; i< data.length; i++)
						{
							this.Roles.push({RoleID:data[i].Role_ID, RoleName:this.OrganizationRoles.filter(x=>x.Orgn_RoleID == data[i].Role_ID)[0].Orgn_RoleName, Priority:data[i].Priority, Tran_Map_ID: data[i].Tran_Map_ID});
						}
						
						if(this.tagID == 'OR')
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
  
  
  // To bind the grid with organization
  bindGrid()
  {
	  //let orgnID=2;
	  let maskID=2;
	  let rolesArry=[]
	  debugger;
	  // Get organization
	  
	  
	  
      
	  
	  debugger;
	  //
	  //this.GetAllEmployee();
	  if(this.tagID == 'OR')
	  {
		  let roleid = JSON.parse(this.authService.getLoginUser()).Role_ID;
	       maskID = Math.pow(2,(this.Roles.filter(x=>x.RoleID == roleid)[0].Priority));
	  	  this.authService.getAllOrgnTranscationEventApprovalDetailInfoByOrgnIDAndMaskID(this.orgnID, maskID).subscribe(organization => {   
	      this.organizationEventApprovalUserList=organization.OrgnTranscationEventApprovalDetail;
		  if(this.organizationEventApprovalUserList.length > 0)
		  {
		  for(let i=0; i<this.organizationEventApprovalUserList.length;i++)
		  {
		  //this.organizationEventApprovalUserList[i].Event_Title= organization.evt.EventTitle;
		  //this.organizationEventApprovalUserList[i].EventID = organization.evt._id;
		  var empInfo = organization.OrgnTranscationEventApprovalDetail[i].Employee_Info.find(x=>x._id == organization.OrgnTranscationEventApprovalDetail[i].Employee_ID);
		  this.organizationEventApprovalUserList[i].Employee_Name= empInfo.username;
		  this.organizationEventApprovalUserList[i].Prev_Approver_RName= this.Roles.filter(x=>x.RoleID == this.organizationEventApprovalUserList[i].Prev_Approver_RID)[0].RoleName;
		  this.organizationEventApprovalUserList[i].Next_Approver_RName= this.Roles.filter(x=>x.RoleID == this.organizationEventApprovalUserList[i].Next_Approver_RID)[0].RoleName;
		  }
		  
		  this.bindGridOrganization();
		  }else
		  {
			  this.bindGridOrganization();
		  }
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	  }else if(this.tagID == "O"){
		  maskID = 1024;
	  	  this.authService.getAllOrgnTranscationEventApprovalDetailInfoByOrgnIDAndMaskID(this.orgnID, maskID).subscribe(organization => {   
	      this.organizationEventApprovalUserList=organization.OrgnTranscationEventApprovalDetail;
		  if(this.organizationEventApprovalUserList.length > 0)
		  {
		  for(let i=0; i<this.organizationEventApprovalUserList.length;i++)
		  {
		  //this.organizationEventApprovalUserList[i].Event_Title= organization.evt.EventTitle;
		  //this.organizationEventApprovalUserList[i].EventID = organization.evt._id;
		  this.organizationEventApprovalUserList[i].Employee_Name= organization.OrgnTranscationEventApprovalDetail[i].Employee_Info.find(x=>x._id == organization.OrgnTranscationEventApprovalDetail[i].Employee_ID).username
		  this.organizationEventApprovalUserList[i].Prev_Approver_RName= this.Roles.filter(x=>x.RoleID == this.organizationEventApprovalUserList[i].Prev_Approver_RID)[0].RoleName;
		  this.organizationEventApprovalUserList[i].Next_Approver_RName= this.Roles.filter(x=>x.RoleID == this.organizationEventApprovalUserList[i].Next_Approver_RID)[0].RoleName;
		  }
		  
		  this.bindGridOrganization();
		  }else
		  {
			  this.bindGridOrganization();
		  }
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	  }
	
	
		
  }
  
  showSearchBox(){
	  debugger;
	 this.showSearchDiv="Search";
  }
  
  
  
  GetAllEmployee()
  {
	  debugger;
	
	  this.authService.getEmployeeByOrgnID(this.orgnID).subscribe(data => {
		     for(let i=0; i< data.length; i++)
       this.Employees.push({EmployeeID:data[i].Employee_ID, EmployeeName:data[i].Employee_Name});
			   
		   
       },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	
	
	
  }
  
  GetOrganizationRolesByOrgnID()
  {
	  this.authService.getOrganizationRolesByOrgnID(this.orgnID).subscribe(data => {
					if(data.length > 0)
					{
						for(let i=0; i< data.length; i++)
						{
							this.OrganizationRoles.push({Orgn_RoleID:data[i].Orgn_RoleID, Orgn_RoleName:data[i].Orgn_RoleName, Orgn_ID:this.orgnID});
						}
					}
				 },//observable also returns error
    err => {
      console.log(err);
      return false;
    });
  }
  
  
    
  ApproveEmployee(event)
  {
	  let TransEventApprovalMappingLocal:OrganizationTransEventApproval[]=[];
	  let TransEventApprovalMappingArray:OrganizationTransEventApproval[]=[];
	  let organizationEventApprovalHistoryArray:OrganizationEventApprovalHistory[]=[];
	  this.TransEventApprovalMappingArrayGlobal=[];
	  this.organizationEventApprovalHistoryArrayGlobal=[];
	  let TransEventApprovalMappingDataList = event.organization_EventApprovalUserList.filter(x=>x.isChecked == true);
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
	  this.OrganizationEventApprovalHistory={TranApprovalHistoryID:0,ApprovedBy:"", ApprovedOn:new Date(), MaskID:0,Status:0, Comments:"", TransApprovalID:"" };
	  //this.authService.getAllTranscationTypeWithRolesAndPriority(TransEventApprovalMappingData.Orgn_ID, 2).subscribe(data => {
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
							Priority:dataarray.Priority,MaskID:Math.pow(2, dataarray.Priority), Status:status, TranscationStatus:'A',
							OrganizationID:TransEventApprovalMappingData.Orgn_ID, TransApprovalID:TransEventApprovalMappingData.Tran_Approval_ID,
							TransDt:TransEventApprovalMappingData.Trans_Dt, EmployeeID:TransEventApprovalMappingData.Employee_ID, TranApprovalIDNumber:TransEventApprovalMappingData.Tran_Approval_IDNumber});
							
							}else 
							{
								TransEventApprovalMappingLocal.push({TransMapID : this.Roles[i].Tran_Map_ID, NextApproverRoleID:this.Roles[i].RoleID, PrevApproverRoleID:TransEventApprovalMappingData.Next_Approver_RID,
							Priority:this.Roles[i].Priority,MaskID:Math.pow(2, this.Roles[i].Priority), Status:status, EventID:TransEventApprovalMappingData.EventID,TranscationStatus:'P',
							OrganizationID:TransEventApprovalMappingData.Orgn_ID, TransApprovalID:TransEventApprovalMappingData.Tran_Approval_ID, TransDt:TransEventApprovalMappingData.Trans_Dt, EmployeeID:TransEventApprovalMappingData.Employee_ID, TranApprovalIDNumber:TransEventApprovalMappingData.Tran_Approval_IDNumber});
							}
						 }
						}
						
	  TransEventApprovalMappingArray.push(TransEventApprovalMappingLocal.sort(x=>x.Priority)[TransEventApprovalMappingLocal.length-1]);		
	  //TransEventApprovalMappingArray.push(TransEventApprovalMappingArray);
					 debugger;
	  this.OrganizationEventApprovalHistory.ApprovedBy = this.Roles.filter(x=>x.RoleID == roleid)[0].RoleName;
	  this.OrganizationEventApprovalHistory.MaskID = TransEventApprovalMappingData.Mask_ID; 
	  this.OrganizationEventApprovalHistory.TransApprovalID = TransEventApprovalMappingData.Tran_Approval_ID;
	  this.OrganizationEventApprovalHistory.Status =1;
	  this.OrganizationEventApprovalHistory.Comments = "Approved";
	  this.OrganizationEventApprovalHistory.TranApprovalHistoryID=transApprovalHistoryID;
	  organizationEventApprovalHistoryArray.push(this.OrganizationEventApprovalHistory);
	  debugger;
	  
					//}
			// },
				// //observable also returns error
					// err => {
					// console.log(err);
					// return false;
				// });
	  }
	  
	  this.organizationEventApprovalHistoryArrayGlobal = organizationEventApprovalHistoryArray;
	  this.TransEventApprovalMappingArrayGlobal = TransEventApprovalMappingArray;

	// this.authService.addOrganizationTransEventApprovalHistory(this.model, organizationEventApprovalHistoryArray, TransEventApprovalMappingArray).subscribe(data => {
		// debugger;
      // if(data.success){
        // //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        // this.bindGrid();
      // } else {
        // //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        // this.router.navigate(['/register']);
      // }
    // });
  }
  
  SubmitAllApproveItem()
	{
	debugger;
//	let length = this.organizationApprovalHistoryArrayGlobal.length;
	let length = this.organizationEventApprovalHistoryArrayGlobal.length;
			for(let y=0; y< length;y++)
				{
				 this.organizationEventApprovalHistoryArrayGlobal[y].Comments = this.Comments;
				}

				this.authService.addOrganizationTransEventApprovalHistory(this.model, this.organizationEventApprovalHistoryArrayGlobal, this.TransEventApprovalMappingArrayGlobal).subscribe(data => {
		
		debugger;
      if(data.success){
        //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        document.getElementById('close').click();
		this.toastr.success('Approved, Employees request for event participation is approved.', 'Approved!');
                                this.bindGrid();
      } else {
        //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });                        
	}
	
	
	RejectEmployee(event)
  {
	  let TransEventApprovalMappingLocal:String[]=[];
	  let TransEventApprovalMappingArray:OrganizationTransEventApproval[]=[];
	  let organizationEventApprovalHistoryArray:OrganizationEventApprovalHistory[]=[];
	  this.TransEventApprovalMappingArrayGlobal=[];
	  this.organizationEventApprovalHistoryArrayGlobal=[];
	  let TransEventApprovalMappingDataList = event.organization_EventApprovalUserList.filter(x=>x.isChecked == true);
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
	  this.OrganizationEventApprovalHistory={TranApprovalHistoryID:0,ApprovedBy:"", ApprovedOn:new Date(), MaskID:0,Status:0, Comments:"", TransApprovalID:"" };
	  //this.authService.getAllTranscationTypeWithRolesAndPriority(TransEventApprovalMappingData.Orgn_ID, 2).subscribe(data => {
					// if(data.length > 0)
					// {
						// let length = TransEventApprovalMappingLocal.length;
						// for(let y=0; y< length;y++)
						// {
						// TransEventApprovalMappingLocal.pop();
						// }
						
						for(let j=0; j< this.Roles.length; j++)
						{
							maskArray.push(Math.pow(2, this.Roles[j].Priority));
							priorityArray.push(this.Roles[j].Priority);
						}
						
						// if( Math.max.apply(null, maskArray) == maskID)
						 // {
							 // status=1;
						 // }
						 
						// for(let i=0; i< this.Roles.length; i++)
						// {					
						 
							 // // if(Math.pow(2, data[i].Priority) == maskID)
							 // // {
								 // // status=1;
							 // // }
						  // if( Math.pow(2, this.Roles[i].Priority) > maskID || status == 1)
						 // {
							 // if(status == 1)
							 // {
								 // i=this.Roles.length;
								 // let dataarray = this.Roles.find(x=>x.Priority == Math.max.apply(null, priorityArray));
								 // TransEventApprovalMappingLocal.push({TransMapID : dataarray.Tran_Map_ID, NextApproverRoleID:dataarray.RoleID, 
							// PrevApproverRoleID:TransEventApprovalMappingData.Next_Approver_RID, EventID:TransEventApprovalMappingData.EventID,
							// Priority:dataarray.Priority,MaskID:Math.pow(2, dataarray.Priority), Status:status, 
							// OrganizationID:TransEventApprovalMappingData.Orgn_ID, TransApprovalID:TransEventApprovalMappingData.Tran_Approval_ID,
							// TransDt:TransEventApprovalMappingData.Trans_Dt, EmployeeID:TransEventApprovalMappingData.Student_ID, TranApprovalIDNumber:TransEventApprovalMappingData.Tran_Approval_IDNumber});
							
							// }else 
							// {
								// TransEventApprovalMappingLocal.push({TransMapID : this.Roles[i].Tran_Map_ID, NextApproverRoleID:this.Roles[i].RoleID, PrevApproverRoleID:TransEventApprovalMappingData.Next_Approver_RID,
							// Priority:this.Roles[i].Priority,MaskID:Math.pow(2, this.Roles[i].Priority), Status:status, EventID:TransEventApprovalMappingData.EventID,
							// OrganizationID:TransEventApprovalMappingData.Orgn_ID, TransApprovalID:TransEventApprovalMappingData.Tran_Approval_ID, TransDt:TransEventApprovalMappingData.Trans_Dt, StudentID:TransEventApprovalMappingData.Student_ID, TranApprovalIDNumber:TransEventApprovalMappingData.Tran_Approval_IDNumber});
							// }
						 // }
						// }
						TransEventApprovalMappingLocal.push(TransEventApprovalMappingData.Tran_Approval_ID);
	  //TransEventApprovalMappingArray.push(TransEventApprovalMappingLocal.sort(x=>x.Priority)[TransEventApprovalMappingLocal.length-1]);		
	  //TransEventApprovalMappingArray.push(TransEventApprovalMappingArray);
					 debugger;
	  this.OrganizationEventApprovalHistory.ApprovedBy = this.Roles.filter(x=>x.RoleID == roleid)[0].RoleName;
	  this.OrganizationEventApprovalHistory.MaskID = TransEventApprovalMappingData.Mask_ID; 
	  this.OrganizationEventApprovalHistory.TransApprovalID = TransEventApprovalMappingData.Tran_Approval_ID;
	  this.OrganizationEventApprovalHistory.Status =1;
	  this.OrganizationEventApprovalHistory.Comments = "Approved";
	  this.OrganizationEventApprovalHistory.TranApprovalHistoryID=transApprovalHistoryID;
	  organizationEventApprovalHistoryArray.push(this.OrganizationEventApprovalHistory);
	  debugger;
	  
					//}
			// },
				// //observable also returns error
					// err => {
					// console.log(err);
					// return false;
				// });
	  }
	  
	  this.organizationEventApprovalHistoryArrayGlobal = organizationEventApprovalHistoryArray;
	  this.TransEventApprovalMappingStringArrayGlobal = TransEventApprovalMappingLocal;

	// this.authService.addOrganizationTransEventApprovalHistory(this.model, organizationEventApprovalHistoryArray, TransEventApprovalMappingArray).subscribe(data => {
		// debugger;
      // if(data.success){
        // //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        // this.bindGrid();
      // } else {
        // //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        // this.router.navigate(['/register']);
      // }
    // });
  }
  
  SubmitAllRejectItem()
	{
	debugger;
//	let length = this.organizationApprovalHistoryArrayGlobal.length;
	let length = this.organizationEventApprovalHistoryArrayGlobal.length;
			for(let y=0; y< length;y++)
				{
				 this.organizationEventApprovalHistoryArrayGlobal[y].Comments = this.Comments;
				}
        this.authService.addOrganizationEventTransRejectionHistoryArray(this.model, this.organizationEventApprovalHistoryArrayGlobal, this.TransEventApprovalMappingStringArrayGlobal).subscribe(data => {

		debugger;
      if(data.success){
        //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        document.getElementById('closeR').click();
		this.toastr.warning('Rejected, Employees request for event participation is rejected.', 'Reject!');
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
    //this.organizationEventApprovalUserList.forEach(x => x.isChecked = ev.target.checked)
	let totalAllowed = event.TotalAllowedParticipant;
	  let Confirmed = event.TotalConfirmedParticipant;
	  let totalChecked = 0;
	  totalChecked = event.organization_EventApprovalUserList.filter(x => x.isChecked == true).length;
	  if(totalAllowed < Confirmed + totalChecked)
	  {
		  this.flashMessage.show("Total no of participant into this event : " + event.EventTitle + " has been crossed. Not allowed to select more", {
             cssClass: 'alert-danger'});
		  ev.target.checked = false;
       event.organization_EventApprovalUserList.filter(x=>x.Tran_Approval_ID == transApprovalId).forEach(x => x.isChecked = ev.target.checked);
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
	  if(totalAllowed >= event.organization_EventApprovalUserList.length + Confirmed)
	  {
       event.organization_EventApprovalUserList.forEach(x => x.isChecked = ev.target.checked);
	  }
	  else
	  {
		   this.flashMessage.show('Total no of participant into this event : ' + event.EventTitle + ' has been crossed. Not allowed to select All', {
             cssClass: 'alert-danger'});
		    ev.target.checked = false;
			event.organization_EventApprovalUserList.forEach(x => x.isChecked = ev.target.checked);
		  
	  }
	  }else {
		  event.organization_EventApprovalUserList.forEach(x => x.isChecked = ev.target.checked);
	  }
  }

  isAllChecked(event) {
	  
    return event.organization_EventApprovalUserList.every(_ => _.isChecked);
  }
  
  bindGridOrganization()
  {
	  var employee=JSON.parse(this.authService.getStudent());
	  debugger;
	  	var modelData=[];
		var OrgnData=[];
		var EventEmployeeData=[];
		var id='';
	    var filterEvent=[];
		
		 this.authService.getEventEmployeeApproved().subscribe(eventEmployee => {
					EventEmployeeData = eventEmployee;
					},
						//observable also returns error
					err => {
					console.log(err);
					return false;
					});
					
		//this.eventModel={_id:"",EventTitle:"", organization_EventApprovalUserList:this.organizationEventApprovalUserList};
    this.authService.getEvents().subscribe(event => {
      modelData= event.filter((E) => E.IsApproved == true && E.IsRejected == false);
	  for(var i=0;i<modelData.length;i++)
	 {
		  var m =this.dayDiff(modelData[i].StartDt);
		  id=modelData[i]._id;
		  modelData[i].RemainDay=m;
		 
		  //this.eventModel.push({_id: modelData[i]._id, EventTitle:modelData[i].EventTitle, organization_EventApprovalUserList:this.organizationEventApprovalUserList.filter(x=> x.EventID == id.toString())});
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
		this.authService.GetEventByOrgnID(employee.Orgn_ID).subscribe(orgn => {			
			OrgnData=orgn;
			 if(this.eventModel.length>0 && OrgnData.length >0)
  {
	  for(var i=0;i < this.eventModel.length;i++)
	          {
				 // var m=this.eventModel[i];
				 this.eventModel[i].organization_EventApprovalUserList = this.organizationEventApprovalUserList.filter(x=> x.EventID == this.eventModel[i]._id.toString());
				 if(EventEmployeeData.length > 0)
				 {
					 this.eventModel[i].TotalConfirmedParticipant = EventEmployeeData.filter(x=> x.EventID == this.eventModel[i]._id.toString()).length;
				 }
			  }
	    for(var j=0; j < OrgnData.length;j++)
		  {
			 for(var i=0;i < this.eventModel.length;i++)
	          {
				  
				 // var m=this.eventModel[i];
				 //this.eventModel[i].organization_EventApprovalUserList = this.organizationEventApprovalUserList.filter(x=> x.EventID == this.eventModel[i]._id.toString());
		         if(OrgnData[j].EventID ==this.eventModel[i]._id)
				{
					filterEvent.push(this.eventModel[i]);
					
				}
	          }
		   }
	 
	  this.OrgnEventModel=filterEvent;
	  //this.OrgnEventModel.organizationEventApprovalUserList = 
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
	var orgnData=this.OrgnEventModel;
	var filterData=[];
	var orgnFilterData=[];
	
	if(this.tagID == '0' || this.tagID == 'S' || this.tagID == 'O' || this.tagID == 'OR')
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
	 
	 for(var i=0;i<orgnData.length;i++)
	 {
		 debugger;
		  if(orgnData[i].EventTitle.toString().toLowerCase().indexOf(this.searchFilter.toLowerCase())!=-1)
		  {
			  orgnFilterData.push(orgnData[i]);
		  }
	 }
	 this.OrgnEventModel=orgnFilterData;
	 this.searchFilter ='';
	 this.showSearchDiv ='';
	}
	else
	{
		
		
		if( this.tagID == 'OR')
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
	public organization_EventApprovalUserList:Array<OrganizationTransEventApprovalList>,
	public RemainDay:String
	)
	{}

}




