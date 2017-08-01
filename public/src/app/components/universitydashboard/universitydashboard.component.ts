import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service'
import {Router, ActivatedRoute, Params} from '@angular/router';
import {universityApprovalHistory} from './universityApprovalHistory';
import { UniversityTransApproval } from './UniversityTransApproval';
import { UniversityTransApprovalList } from './UniversityTransactionApprovalList';
import {TooltipModule} from "ngx-tooltip";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Ng2SmartTableModule, LocalDataSource  } from 'ng2-smart-table';

@Component({
  selector: 'app-universitydashboard',
  templateUrl: './universitydashboard.component.html',
  styleUrls: ['./universitydashboard.component.scss']
})
export class UniversitydashboardComponent implements OnInit {
	source: LocalDataSource; 
    settings = {
	delete: {
      confirmDelete: true
	  //'<a class="btn btn-primary pull-right" style="width:66px;" (click)="deleteUniverity(item._id)"  data-toggle="modal" data-target="#deleteDiv">Delete</a>'
    },
	edit: {
      confirmSave: true,
    },
	
	actions: {
	 edit: false, //as an example  
	 add:false,
	 delete:false,
	},
	
	pager:{
	 perPage:20
	},


  columns: {
    Tran_Approval_ID: {
      title: 'Req No',
	  filter:false
	  
    },
    Student_Name: {
      title: 'Student Name',
	  filter:false
    },
    Prev_Approver_RName: {
      title: 'Prev Approval',
	  filter:false
    },
    Next_Approver_RName: {
      title: 'Next approval',
	  filter:false
    }
	}
  };

	data = [
    
	];
	
	URsource: LocalDataSource; 
    URsettings = {
	selectMode: 'multi',
	
	delete: {
      confirmDelete: true,
	  deleteButtonContent: 'Reject' //
	  //deleteButtonContent: '<a class="btn btn-primary pull-right" style="width:66px;" (click)="deleteUniverity(item._id)"  data-toggle="modal" data-target="#deleteDiv">Delete</a>'
    },
	edit: {
      confirmSave: true,
    },
	
	actions: {
	 edit: false, //as an example  
	 add:false,
	 delete:true,
	 deleteButtonContent:'Reject',
	 custom: [{ name: 'Approve', title:'Approve         '} ],
	 position:'right'
	},
	
	pager:{
	 perPage:20
	},


  columns: {
    Tran_Approval_ID: {
      title: 'Req No',
	  filter:false
	  
    },
    Student_Name: {
      title: 'Student Name',
	  filter:false
    },
    
    Next_Approver_RName: {
      title: 'Next approval',
	  filter:false
    }
	}
  };

	URdata = [
    
	];
	
    public Action:String="Edit";
	public errorMsg:String="";
	public deleteID:String="";
	public Comments:String="";
	tagID:String;
	private universityApprovalUserList: Array<UniversityTransApprovalList> = [];
	TransApprovalMapping:UniversityTransApproval[]=[];
	TransApprovalMappingArrayGlobal:UniversityTransApproval[]=[];
	TransApprovalMappingStringArrayGlobal:String[]=[];
	universityApprovalHistoryArrayGlobal:universityApprovalHistory[]=[];
	//universityApprovalHistory:universityApprovalHistory;
	public universityApprovalHistory:universityApprovalHistory;
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
  
  private flashMessage:FlashMessagesService,
	public toastr: ToastsManager, public vcr: ViewContainerRef
	)
	{
	
this.toastr.setRootViewContainerRef(vcr);
		}
		
	
  
  @Input()
   ngOnInit() {	
   
   this.tagID=localStorage.getItem('tagID');
	this.model={	
	TransApprovalMapping:[],	
  	universityApprovalHistory:universityApprovalHistory
  	}
	this.univID = JSON.parse(this.authService.getLoginUser()).Univ_ID;
	this.GetUniversityRolesByUnivID();
	this.authService.getUnivTranscationTypeDetailByUnivIDAndTransTypeAndCurrentDate(this.univID, 1).subscribe(data => {
					if(data.length > 0)
					{
						for(let i=0; i< data.length; i++)
						{
							this.Roles.push({RoleID:data[i].Role_ID, RoleName:this.UniversityRoles.filter(x=>x.Univ_RoleID == data[i].Role_ID)[0].Univ_RoleName, Priority:data[i].Priority, Tran_Map_ID: data[i].Tran_Map_ID});
						}
						
						this.bindGrid();
					}
				 },//observable also returns error
    err => {
      console.log(err);
      return false;
    });
   

  }
  
  onSearch(query: string = '') {
	  debugger;
	  if(this.tagID == 'UR')
	  {
		 
	  if(query != '')
	  {
		var filterData=[];
		for(var i=0;i<this.universityApprovalUserList.length;i++)
		 {
			  if(this.universityApprovalUserList[i].Tran_Approval_ID.toString().toLowerCase().indexOf(query.toLowerCase())!=-1 || this.universityApprovalUserList[i].Student_Name.toString().toLowerCase().indexOf(query.toLowerCase())!=-1 || this.universityApprovalUserList[i].Next_Approver_RName.toString().toLowerCase().indexOf(query.toLowerCase())!=-1 ||  this.universityApprovalUserList[i].Prev_Approver_RName.toString().toLowerCase().indexOf(query.toLowerCase())!=-1)
			  {
				  filterData.push(this.universityApprovalUserList[i]);
			  }
		 }
		 this.universityApprovalUserList=filterData;		
		}
		else {
			this.bindGrid();
			}
	  
  // second parameter specifying whether to perform 'AND' or 'OR' search 
  // (meaning all columns should contain search query or at least one)
  // 'AND' by default, so changing to 'OR' by setting false here

	  }else {  
	  if(query != '')
	  {
  this.source.setFilter([
    // fields we want to include in the search
    {
      field: 'Tran_Approval_ID',
      search: query
    },
    {
      field: 'Student_Name',
      search: query
    },
    {
      field: 'Prev_Approver_RName',
      search: query
    },
    {
      field: 'Next_Approver_RName',
      search: query
    }
  ], false); 
	  }else
	  {
		  this.source = new LocalDataSource(this.data); 
	  }
	  }
  // second parameter specifying whether to perform 'AND' or 'OR' search 
  // (meaning all columns should contain search query or at least one)
  // 'AND' by default, so changing to 'OR' by setting false here
}

	onApproveStudent(event) {
	  debugger;
	  this.ApproveStudent(event.data);
	  document.getElementById("btnApprove").click();
	  
    // if (window.confirm('Are you sure you want to save?')) {
      // event.newData['name'] += ' + added in code';
      // event.confirm.resolve(event.newData);
    // } else {
      // event.confirm.reject();
    // }
	}
	
	onRejectStudent(event) {
	  debugger;
	  this.RejectStudent(event.data);
	  document.getElementById("btnReject").click();
	  
    // if (window.confirm('Are you sure you want to save?')) {
      // event.newData['name'] += ' + added in code';
      // event.confirm.resolve(event.newData);
    // } else {
      // event.confirm.reject();
    // }
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
	  //this.GetAllStudent();
	  if(this.tagID == 'UR')
	  {
		  debugger;
		  let roleid = JSON.parse(this.authService.getLoginUser()).Role_ID;
	       maskID = Math.pow(2,(this.Roles.filter(x=>x.RoleID == roleid)[0].Priority));
	  	  this.authService.getAllUnivTranscationApprovalDetailInfoByUnivIDAndMaskID(this.univID, maskID).subscribe(university => {   
	      this.universityApprovalUserList=university;
		  for(let i=0; i<this.universityApprovalUserList.length;i++)
		  {
		  this.universityApprovalUserList[i].Student_Name= university[i].Student_Info[0].Student_Name;
		  this.universityApprovalUserList[i].Prev_Approver_RName= this.Roles.filter(x=>x.RoleID == this.universityApprovalUserList[i].Prev_Approver_RID)[0].RoleName;
		  this.universityApprovalUserList[i].Next_Approver_RName= this.Roles.filter(x=>x.RoleID == this.universityApprovalUserList[i].Next_Approver_RID)[0].RoleName;
		  }
		  
		  this.URdata = this.universityApprovalUserList;
		  this.URsource = new LocalDataSource(this.URdata); 
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	  }else if(this.tagID == "U"){
		  debugger;
		  maskID = 1024;
	  	  this.authService.getAllUnivTranscationApprovalDetailInfoByUnivIDAndMaskID(this.univID, maskID).subscribe(university => {   
	      this.universityApprovalUserList=university;
		  for(let i=0; i<this.universityApprovalUserList.length;i++)
		  {
		  this.universityApprovalUserList[i].Student_Name= university[i].Student_Info[0].Student_Name;
		  this.universityApprovalUserList[i].Prev_Approver_RName= this.Roles.filter(x=>x.RoleID == this.universityApprovalUserList[i].Prev_Approver_RID)[0].RoleName;
		  this.universityApprovalUserList[i].Next_Approver_RName= this.Roles.filter(x=>x.RoleID == this.universityApprovalUserList[i].Next_Approver_RID)[0].RoleName;
		  }
		  
		  this.data = this.universityApprovalUserList;
		  this.source = new LocalDataSource(this.data); 
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	  }
	  
	  // if(!JSON.parse(this.authService.getLoginUser()).isPasswordChanged)
	  // {
	// document.getElementById("openModalButton").click();
	  // }
	
		
  }
  
  
  
  GetAllStudent()
  {
	  
	debugger;
	  this.authService.getPendingStudentByUnivID(this.univID).subscribe(data => {
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
  
  check(ev, transApprovalId) {
	  // if(this.isSupervisorLoggedIn)
	  // {
	  // debugger;
    // //this.universityEventApprovalUserList.forEach(x => x.isChecked = ev.target.checked)
	// let totalAllowed = event.TotalAllowedParticipant;
	  // let Confirmed = event.TotalConfirmedParticipant;
	  // let totalChecked = 0;
	  // totalChecked = event.university_EventApprovalUserList.filter(x => x.isChecked == true).length;
	  // if(totalAllowed < Confirmed + totalChecked)
	  // {
		  // this.flashMessage.show("Total no of participant into this event : " + event.EventTitle + " has been crossed. Not allowed to select more", {
             // cssClass: 'alert-danger'});
		  // ev.target.checked = false;
       // event.university_EventApprovalUserList.filter(x=>x.Tran_Approval_ID == transApprovalId).forEach(x => x.isChecked = ev.target.checked);
	  // }else
	  // {
		// // this.isAllChecked(event); 
	  // }
	  // }
  }
  
  checkAll(ev) {
	  debugger;
	  // if(this.isSupervisorLoggedIn)
	  // {
	  // let totalAllowed = event.TotalAllowedParticipant;
	  // let Confirmed = event.TotalConfirmedParticipant;
	  // if(totalAllowed >= event.university_EventApprovalUserList.length + Confirmed)
	  // {
       // event.university_EventApprovalUserList.forEach(x => x.isChecked = ev.target.checked);
	  // }
	  // else
	  // {
		   // this.flashMessage.show('Total no of participant into this event : ' + event.EventTitle + ' has been crossed. Not allowed to select All', {
             // cssClass: 'alert-danger'});
		    // ev.target.checked = false;
			// event.university_EventApprovalUserList.forEach(x => x.isChecked = ev.target.checked);
		  
	  // }
	  // }else {
		  this.universityApprovalUserList.forEach(x => x.isChecked = ev.target.checked);
	  //}
  }

  isAllChecked() {
	  
    return this.universityApprovalUserList.every(_ => _.isChecked);
  }
  
  ApproveAllStudent()
  {
	  this.TransApprovalMappingArrayGlobal=[];
	  this.universityApprovalHistoryArrayGlobal=[];
	  let TransApprovalMappingLocal:UniversityTransApproval[]=[];
	  let TransApprovalMappingArray:UniversityTransApproval[]=[];
	  let universityApprovalHistoryArray:universityApprovalHistory[]=[];
	  let TransApprovalMappingDataList = this.universityApprovalUserList.filter(x=>x.isChecked == true);
	  for(let x=0; x<TransApprovalMappingDataList.length;x++)
	  {
		let TransApprovalMappingData = TransApprovalMappingDataList[x];
		
	  debugger;
	 // return false;
	  let maskID=2;
	  let roleid = JSON.parse(this.authService.getLoginUser()).Role_ID;
	       maskID = Math.pow(2,(this.Roles.filter(x=>x.RoleID == roleid)[0].Priority));
	  let status=0;
	  let priorityArray=[];
	  let maskArray=[];
	  let transApprovalHistoryID=1;
	  
	  // this.authService.getMaxTransApprovalHistoryID().subscribe(data => {
		   // if(data.length > 0)
		   // {
		    // transApprovalHistoryID = data[0].Tran_Approval_History_ID + 1;
		   // }
		// },
		// //observable also returns error
		// err => {
		// console.log(err);
		// return false;
		// });
	  this.universityApprovalHistory={TranApprovalHistoryID:0,ApprovedBy:"", ApprovedOn:new Date(), MaskID:0,Status:0, Comments:"", TransApprovalID:"" };
	  //this.authService.getAllTranscationTypeWithRolesAndPriority(TransEventApprovalMappingData.Univ_ID, 2).subscribe(data => {
					// if(data.length > 0)
					// {
						let length = TransApprovalMappingLocal.length;
						for(let y=0; y< length;y++)
						{
						TransApprovalMappingLocal.pop();
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
								 TransApprovalMappingLocal.push({TransMapID : dataarray.Tran_Map_ID, NextApproverRoleID:dataarray.RoleID, 
							PrevApproverRoleID:TransApprovalMappingData.Next_Approver_RID,
							Priority:dataarray.Priority,MaskID:Math.pow(2, dataarray.Priority), Status:status, TransactionStatus:'A',
							UniversityID:this.univID, TransApprovalID:TransApprovalMappingData.Tran_Approval_ID,
							TransDt:TransApprovalMappingData.Tran_Dt, StudentID:TransApprovalMappingData.Student_ID, TranApprovalIDNumber:TransApprovalMappingData.Tran_Approval_IDNumber});
							
							}else 
							{
								TransApprovalMappingLocal.push({TransMapID : this.Roles[i].Tran_Map_ID, NextApproverRoleID:this.Roles[i].RoleID, PrevApproverRoleID:TransApprovalMappingData.Next_Approver_RID,
							Priority:this.Roles[i].Priority,MaskID:Math.pow(2, this.Roles[i].Priority), Status:status, TransactionStatus:'P',
							UniversityID:this.univID, TransApprovalID:TransApprovalMappingData.Tran_Approval_ID, TransDt:TransApprovalMappingData.Tran_Dt, StudentID:TransApprovalMappingData.Student_ID, TranApprovalIDNumber:TransApprovalMappingData.Tran_Approval_IDNumber});
							}
						 }
						}
						
	  TransApprovalMappingArray.push(TransApprovalMappingLocal.sort(x=>x.Priority)[TransApprovalMappingLocal.length-1]);		
	  //TransEventApprovalMappingArray.push(TransEventApprovalMappingArray);
					 debugger;
	  this.universityApprovalHistory.ApprovedBy = this.Roles.filter(x=>x.RoleID == roleid)[0].RoleName;
	  this.universityApprovalHistory.MaskID = TransApprovalMappingData.Mask_ID; 
	  this.universityApprovalHistory.TransApprovalID = TransApprovalMappingData.Tran_Approval_ID;
	  this.universityApprovalHistory.Status =1;
	  this.universityApprovalHistory.Comments = "Approved";
	  this.universityApprovalHistory.TranApprovalHistoryID=transApprovalHistoryID;
	  universityApprovalHistoryArray.push(this.universityApprovalHistory);
	  debugger;
	  
					//}
			// },
				// //observable also returns error
					// err => {
					// console.log(err);
					// return false;
				// });
	  }

	  this.universityApprovalHistoryArrayGlobal = universityApprovalHistoryArray;
	  this.TransApprovalMappingArrayGlobal = TransApprovalMappingArray;
	debugger;
  }
  
  SubmitAllApproveItem()
	{
	debugger;
//	let length = this.universityApprovalHistoryArrayGlobal.length;
	let length = this.universityApprovalHistoryArrayGlobal.length;
			for(let y=0; y< length;y++)
				{
				 this.universityApprovalHistoryArrayGlobal[y].Comments = this.Comments;
				}
        this.authService.addUniversityTransApprovalHistoryArray(this.model, this.universityApprovalHistoryArrayGlobal, this.TransApprovalMappingArrayGlobal).subscribe(data => {
		
		debugger;
      if(data.success){
        //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        document.getElementById('close').click();
		this.toastr.success('Approved, Students are allowed to login to Crest portal', 'Success!');	
                                this.bindGrid();
      } else {
        //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });                        
	}
  
  
    
  ApproveStudent(TransApprovalMappingData)
  {
	  debugger;
	  this.Comments="";
	  let maskID=2;
	  let roleid = JSON.parse(this.authService.getLoginUser()).Role_ID;
	       maskID = Math.pow(2,(this.Roles.filter(x=>x.RoleID == roleid)[0].Priority));
	  let status=0;
	  let priorityArray=[];
	  let maskArray=[];
	  let transApprovalHistoryID=1;
	  
	  this.authService.getMaxTransApprovalHistoryID().subscribe(data => {
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
	  this.universityApprovalHistory={TranApprovalHistoryID:0,ApprovedBy:"", ApprovedOn:new Date(), MaskID:0,Status:0, Comments:"", TransApprovalID:"" };
	  // this.authService.getAllTranscationTypeWithRolesAndPriority(TransApprovalMappingData.Univ_ID, 1).subscribe(data => {
					// if(data.length > 0)
					// {
						let length = this.TransApprovalMapping.length;
						for(let y=0; y< length;y++)
						{
						this.TransApprovalMapping.pop();
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
								 this.TransApprovalMapping.push({TransMapID : dataarray.Tran_Map_ID, NextApproverRoleID:dataarray.RoleID, 
							PrevApproverRoleID:TransApprovalMappingData.Next_Approver_RID,
							Priority:dataarray.Priority,MaskID:Math.pow(2, dataarray.Priority), Status:status, TransactionStatus:'A',
							UniversityID:TransApprovalMappingData.Univ_ID, TransApprovalID:TransApprovalMappingData.Tran_Approval_ID,
							TransDt:TransApprovalMappingData.Trans_Dt, StudentID:TransApprovalMappingData.Student_ID, TranApprovalIDNumber:TransApprovalMappingData.Tran_Approval_IDNumber});
							
							}else 
							{
								this.TransApprovalMapping.push({TransMapID : this.Roles[i].Tran_Map_ID, NextApproverRoleID:this.Roles[i].RoleID, PrevApproverRoleID:TransApprovalMappingData.Next_Approver_RID,
							Priority:this.Roles[i].Priority,MaskID:Math.pow(2, this.Roles[i].Priority), Status:status, TransactionStatus:'P',
							UniversityID:TransApprovalMappingData.Univ_ID, TransApprovalID:TransApprovalMappingData.Tran_Approval_ID, TransDt:TransApprovalMappingData.Trans_Dt, StudentID:TransApprovalMappingData.Student_ID, TranApprovalIDNumber:TransApprovalMappingData.Tran_Approval_IDNumber});
							}
						 }
						}
						
						
					 debugger;
	  this.universityApprovalHistory.ApprovedBy = TransApprovalMappingData.Next_Approver_RName;
	  this.universityApprovalHistory.MaskID = TransApprovalMappingData.Mask_ID; 
	  this.universityApprovalHistory.TransApprovalID = TransApprovalMappingData.Tran_Approval_ID;
	  this.universityApprovalHistory.Status =1;
	  this.universityApprovalHistory.Comments = "Approved";
	  this.universityApprovalHistory.TranApprovalHistoryID=transApprovalHistoryID;
	  // this.authService.addUniversityTransApprovalHistory(this.model, this.universityApprovalHistory, this.TransApprovalMapping).subscribe(data => {
		// debugger;
      // if(data.success){
        // //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        // this.bindGrid();
      // } else {
        // //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        // this.router.navigate(['/register']);
      // }
    // });
					// }
			// },
				// //observable also returns error
					// err => {
					// console.log(err);
					// return false;
				// });

				
	  
  }
  
  SubmitApproveItem()
	{
		debugger;
	this.universityApprovalHistory.Comments = this.Comments;
                this.authService.addUniversityTransApprovalHistory(this.model, this.universityApprovalHistory, this.TransApprovalMapping).subscribe(data => {
		debugger;
      if(data.success){
        //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        document.getElementById('close2').click();
		this.toastr.success('Approved, Student is allowed to login to Crest portal', 'Success!');	
                                this.bindGrid();
      } else {
        //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });                        
	}
	
	
	// Reject functionality
	
	RejectAllStudent()
  {
	  this.TransApprovalMappingArrayGlobal=[];
	  this.universityApprovalHistoryArrayGlobal=[];
	  let TransApprovalMappingLocal:String[]=[];
	  let TransApprovalMappingArray:String[]=[];
	  let universityApprovalHistoryArray:universityApprovalHistory[]=[];
	  let TransApprovalMappingDataList = this.universityApprovalUserList.filter(x=>x.isChecked == true);
	  for(let x=0; x<TransApprovalMappingDataList.length;x++)
	  {
		let TransApprovalMappingData = TransApprovalMappingDataList[x];
		
	  debugger;
	 // return false;
	  let maskID=2;
	  let roleid = JSON.parse(this.authService.getLoginUser()).Role_ID;
	       maskID = Math.pow(2,(this.Roles.filter(x=>x.RoleID == roleid)[0].Priority));
	  let status=0;
	  let priorityArray=[];
	  let maskArray=[];
	  let transApprovalHistoryID=1;
	  
	  // this.authService.getMaxTransApprovalHistoryID().subscribe(data => {
		   // if(data.length > 0)
		   // {
		    // transApprovalHistoryID = data[0].Tran_Approval_History_ID + 1;
		   // }
		// },
		// //observable also returns error
		// err => {
		// console.log(err);
		// return false;
		// });
	  this.universityApprovalHistory={TranApprovalHistoryID:0,ApprovedBy:"", ApprovedOn:new Date(), MaskID:0,Status:0, Comments:"", TransApprovalID:"" };
	  //this.authService.getAllTranscationTypeWithRolesAndPriority(TransEventApprovalMappingData.Univ_ID, 2).subscribe(data => {
					// if(data.length > 0)
					// {
						// let length = TransApprovalMappingLocal.length;
						// for(let y=0; y< length;y++)
						// {
						// TransApprovalMappingLocal.pop();
						// }
						
						// for(let j=0; j< this.Roles.length; j++)
						// {
							// maskArray.push(Math.pow(2, this.Roles[j].Priority));
							// priorityArray.push(this.Roles[j].Priority);
						// }
						
						
						 
						// for(let i=0; i< this.Roles.length; i++)
						// {					
						 
							 // if(Math.pow(2, this.Roles[i].Priority) == maskID)
							 // {
								 // status=1;
							 // }
						  // if( Math.pow(2, this.Roles[i].Priority) > maskID || status == 1)
						 // {
							 // if(status == 1)
							 // {
								 // i=this.Roles.length;
								 // let dataarray = this.Roles.find(x=>x.Priority == Math.max.apply(null, priorityArray));
								 // TransApprovalMappingLocal.push({TransMapID : dataarray.Tran_Map_ID, NextApproverRoleID:TransApprovalMappingData.Next_Approver_RID, 
							// PrevApproverRoleID:TransApprovalMappingData.Prev_Approver_RID,
							// Priority:TransApprovalMappingData.Priority,MaskID:Math.pow(2, TransApprovalMappingData.Priority), Status:0, TransactionStatus:'R',
							// UniversityID:this.univID, TransApprovalID:TransApprovalMappingData.Tran_Approval_ID,
							// TransDt:TransApprovalMappingData.Tran_Dt, StudentID:TransApprovalMappingData.Student_ID, TranApprovalIDNumber:TransApprovalMappingData.Tran_Approval_IDNumber});
							
							// }else 
							// {
								// TransApprovalMappingLocal.push({TransMapID : this.Roles[i].Tran_Map_ID, NextApproverRoleID:TransApprovalMappingData.Next_Approver_RID, PrevApproverRoleID:TransApprovalMappingData.Prev_Approver_RID,
							// Priority:TransApprovalMappingData.Priority,MaskID:Math.pow(2, TransApprovalMappingData.Priority), Status:status, TransactionStatus:'R',
							// UniversityID:TransApprovalMappingData.Univ_ID, TransApprovalID:TransApprovalMappingData.Tran_Approval_ID, TransDt:TransApprovalMappingData.Trans_Dt, StudentID:TransApprovalMappingData.Student_ID, TranApprovalIDNumber:TransApprovalMappingData.Tran_Approval_IDNumber});
							// }
						 // }
						// }
						TransApprovalMappingLocal.push(TransApprovalMappingData.Tran_Approval_ID);
	  //TransApprovalMappingArray.push(TransApprovalMappingLocal.sort(x=>x.Priority)[TransApprovalMappingLocal.length-1]);		
	  //TransEventApprovalMappingArray.push(TransEventApprovalMappingArray);
					 debugger;
	  this.universityApprovalHistory.ApprovedBy = this.Roles.filter(x=>x.RoleID == roleid)[0].RoleName;
	  this.universityApprovalHistory.MaskID = TransApprovalMappingData.Mask_ID; 
	  this.universityApprovalHistory.TransApprovalID = TransApprovalMappingData.Tran_Approval_ID;
	  this.universityApprovalHistory.Status =0;
	  this.universityApprovalHistory.Comments = "Rejected";
	  this.universityApprovalHistory.TranApprovalHistoryID=transApprovalHistoryID;
	  universityApprovalHistoryArray.push(this.universityApprovalHistory);
	  debugger;
	  
					//}
			// },
				// //observable also returns error
					// err => {
					// console.log(err);
					// return false;
				// });
	  }

	  this.universityApprovalHistoryArrayGlobal = universityApprovalHistoryArray;
	  this.TransApprovalMappingStringArrayGlobal = TransApprovalMappingLocal;
	debugger;
  }
  
  SubmitAllRejectItem()
	{
	debugger;
//	let length = this.universityApprovalHistoryArrayGlobal.length;
	let length = this.universityApprovalHistoryArrayGlobal.length;
			for(let y=0; y< length;y++)
				{
				 this.universityApprovalHistoryArrayGlobal[y].Comments = this.Comments;
				}
        this.authService.addUniversityTransRejectionHistoryArray(this.model, this.universityApprovalHistoryArrayGlobal, this.TransApprovalMappingStringArrayGlobal).subscribe(data => {
		
		debugger;
      if(data.success){
        //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        document.getElementById('closeRA').click();
		this.toastr.warning('Rejected, Students are not allowed to login.', 'Warning!');	
                                this.bindGrid();
      } else {
        //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });                        
	}
  
  
    
  RejectStudent(TransApprovalMappingData)
  {
	  debugger;
	  this.Comments="";
	  this.TransApprovalMappingStringArrayGlobal=[];
	  let maskID=2;
	  let roleid = JSON.parse(this.authService.getLoginUser()).Role_ID;
	       maskID = Math.pow(2,(this.Roles.filter(x=>x.RoleID == roleid)[0].Priority));
	  let status=0;
	  let priorityArray=[];
	  let maskArray=[];
	  let transApprovalHistoryID=1;
	  
	  this.authService.getMaxTransApprovalHistoryID().subscribe(data => {
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
	  this.universityApprovalHistory={TranApprovalHistoryID:0,ApprovedBy:"", ApprovedOn:new Date(), MaskID:0,Status:0, Comments:"", TransApprovalID:"" };
	  // this.authService.getAllTranscationTypeWithRolesAndPriority(TransApprovalMappingData.Univ_ID, 1).subscribe(data => {
					// if(data.length > 0)
					// {
						let length = this.TransApprovalMapping.length;
						for(let y=0; y< length;y++)
						{
						this.TransApprovalMapping.pop();
						}
						
						// for(let j=0; j< this.Roles.length; j++)
						// {
							// maskArray.push(Math.pow(2, this.Roles[j].Priority));
							// priorityArray.push(this.Roles[j].Priority);
						// }
						
						
						 
						// for(let i=0; i< this.Roles.length; i++)
						// {					
						 
							 // if(Math.pow(2, this.Roles[i].Priority) == maskID)
							 // {
								 // status=1;
							 // }
						  // if( Math.pow(2, this.Roles[i].Priority) > maskID || status == 1)
						 // {
							 // if(status == 1)
							 // {
								 // i=this.Roles.length;
								 // let dataarray = this.Roles.find(x=>x.Priority == Math.max.apply(null, priorityArray));
								 // this.TransApprovalMapping.push({TransMapID : dataarray.Tran_Map_ID, NextApproverRoleID:TransApprovalMappingData.Next_Approver_RID, 
							// PrevApproverRoleID:TransApprovalMappingData.Prev_Approver_RID,
							// Priority:TransApprovalMappingData.Priority,MaskID:Math.pow(2, TransApprovalMappingData.Priority), Status:0, TransactionStatus:'R',
							// UniversityID:this.univID, TransApprovalID:TransApprovalMappingData.Tran_Approval_ID,
							// TransDt:TransApprovalMappingData.Tran_Dt, StudentID:TransApprovalMappingData.Student_ID, TranApprovalIDNumber:TransApprovalMappingData.Tran_Approval_IDNumber});
							
							// }else 
							// {
								// this.TransApprovalMapping.push({TransMapID : this.Roles[i].Tran_Map_ID, NextApproverRoleID:TransApprovalMappingData.Next_Approver_RID, PrevApproverRoleID:TransApprovalMappingData.Prev_Approver_RID,
							// Priority:TransApprovalMappingData.Priority,MaskID:Math.pow(2, TransApprovalMappingData.Priority), Status:status, TransactionStatus:'R',
							// UniversityID:TransApprovalMappingData.Univ_ID, TransApprovalID:TransApprovalMappingData.Tran_Approval_ID, TransDt:TransApprovalMappingData.Trans_Dt, StudentID:TransApprovalMappingData.Student_ID, TranApprovalIDNumber:TransApprovalMappingData.Tran_Approval_IDNumber});
							// }
						 // }
						// }
						
						this.TransApprovalMappingStringArrayGlobal.push(TransApprovalMappingData.Tran_Approval_ID);
					 debugger;
	  this.universityApprovalHistory.ApprovedBy = this.Roles.filter(x=>x.RoleID == roleid)[0].RoleName;
	  this.universityApprovalHistory.MaskID = TransApprovalMappingData.Mask_ID; 
	  this.universityApprovalHistory.TransApprovalID = TransApprovalMappingData.Tran_Approval_ID;
	  this.universityApprovalHistory.Status =0;
	  this.universityApprovalHistory.Comments = "Rejected";
	  this.universityApprovalHistory.TranApprovalHistoryID=transApprovalHistoryID;
	  // this.authService.addUniversityTransApprovalHistory(this.model, this.universityApprovalHistory, this.TransApprovalMapping).subscribe(data => {
		// debugger;
      // if(data.success){
        // //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        // this.bindGrid();
      // } else {
        // //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        // this.router.navigate(['/register']);
      // }
    // });
					// }
			// },
				// //observable also returns error
					// err => {
					// console.log(err);
					// return false;
				// });

				
	  
  }
  
  SubmitRejectItem()
	{
		debugger;
	this.universityApprovalHistory.Comments = this.Comments;
                this.authService.addUniversityTransRejectionHistory(this.model, this.universityApprovalHistory, this.TransApprovalMappingStringArrayGlobal[0]).subscribe(data => {
		debugger;
      if(data.success){
        //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        document.getElementById('closeR').click();
		this.toastr.warning('Rejected, Student is not allowed to login.', 'Warning!');	
                                this.bindGrid();
      } else {
        //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });                        
	}
}

