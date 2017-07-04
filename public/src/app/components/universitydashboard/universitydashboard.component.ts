import { Component, OnInit, Input } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service'
import {Router, ActivatedRoute, Params} from '@angular/router';
import {universityApprovalHistory} from './universityApprovalHistory';
import { UniversityTransApproval } from './UniversityTransApproval';
import { UniversityTransApprovalList } from './UniversityTransactionApprovalList';
import {TooltipModule} from "ngx-tooltip";

@Component({
  selector: 'app-universitydashboard',
  templateUrl: './universitydashboard.component.html',
  styleUrls: ['./universitydashboard.component.scss']
})
export class UniversitydashboardComponent implements OnInit {


    public Action:String="Edit";
	public errorMsg:String="";
	public deleteID:String="";
	tagID:String;
	private universityApprovalUserList: Array<UniversityTransApprovalList> = [];
	TransApprovalMapping:UniversityTransApproval[]=[];
	//universityApprovalHistory:universityApprovalHistory;
	public universityApprovalHistory:universityApprovalHistory;
	model:Object;
    public Students = [
	  {StudentID: "0",  StudentName:"please select"}
         
     ];
	 public Roles = [
	  {RoleID: 0,  RoleName:"", Priority:0}
         
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
	TransApprovalMapping:[],	
  	universityApprovalHistory:universityApprovalHistory
  	}
	this.univID = JSON.parse(this.authService.getLoginUser()).Univ_ID;
	this.GetUniversityRolesByUnivID();
	this.authService.getAllTranscationTypeWithRolesAndPriority(this.univID, 1).subscribe(data => {
					if(data.length > 0)
					{
						for(let i=0; i< data.length; i++)
						{
							this.Roles.push({RoleID:data[i].Role_ID, RoleName:this.UniversityRoles.filter(x=>x.Univ_RoleID == data[i].Role_ID)[0].Univ_RoleName, Priority:data[i].Priority});
						}
						
						this.bindGrid();
					}
				 },//observable also returns error
    err => {
      console.log(err);
      return false;
    });
   
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
	  	  this.authService.getAllUnivTranscationApprovalDetailByUnivIDAndMaskID(this.univID, maskID).subscribe(university => {   
	      this.universityApprovalUserList=university;
		  for(let i=0; i<this.universityApprovalUserList.length;i++)
		  {
		  this.universityApprovalUserList[i].Student_Name= this.Students.filter(x=>x.StudentID == this.universityApprovalUserList[i].Student_ID)[0].StudentName;
		  this.universityApprovalUserList[i].Prev_Approver_RName= this.Roles.filter(x=>x.RoleID == this.universityApprovalUserList[i].Prev_Approver_RID)[0].RoleName;
		  this.universityApprovalUserList[i].Next_Approver_RName= this.Roles.filter(x=>x.RoleID == this.universityApprovalUserList[i].Next_Approver_RID)[0].RoleName;
		  }
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	  }else if(this.tagID == "U"){
		  maskID = 1024;
	  	  this.authService.getAllUnivTranscationApprovalDetailByUnivIDAndMaskID(this.univID, maskID).subscribe(university => {   
	      this.universityApprovalUserList=university;
		  for(let i=0; i<this.universityApprovalUserList.length;i++)
		  {
		  this.universityApprovalUserList[i].Student_Name= this.Students.filter(x=>x.StudentID == this.universityApprovalUserList[i].Student_ID)[0].StudentName;
		  this.universityApprovalUserList[i].Prev_Approver_RName= this.Roles.filter(x=>x.RoleID == this.universityApprovalUserList[i].Prev_Approver_RID)[0].RoleName;
		  this.universityApprovalUserList[i].Next_Approver_RName= this.Roles.filter(x=>x.RoleID == this.universityApprovalUserList[i].Next_Approver_RID)[0].RoleName;
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
  
  
    
  ApproveStudent(TransApprovalMappingData)
  {
	  debugger;
	  
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
	  this.authService.getAllTranscationTypeWithRolesAndPriority(TransApprovalMappingData.Univ_ID, 1).subscribe(data => {
					if(data.length > 0)
					{
						for(let j=0; j< data.length; j++)
						{
							maskArray.push(Math.pow(2, data[j].Priority));
							priorityArray.push(data[j].Priority);
						}
						
						if( Math.max.apply(null, maskArray) == maskID)
						 {
							 status=1;
						 }
						 
						for(let i=0; i< data.length; i++)
						{					
						 
							 // if(Math.pow(2, data[i].Priority) == maskID)
							 // {
								 // status=1;
							 // }
						  if( Math.pow(2, data[i].Priority) > maskID || status == 1)
						 {
							 if(status == 1)
							 {
								 i=data.length;
								 let dataarray = data.find(x=>x.Priority == Math.max.apply(null, priorityArray));
								 this.TransApprovalMapping.push({TransMapID : dataarray.Tran_Map_ID, NextApproverRoleID:dataarray.Role_ID, 
							PrevApproverRoleID:TransApprovalMappingData.Next_Approver_RID,
							Priority:dataarray.Priority,MaskID:Math.pow(2, dataarray.Priority), Status:status, 
							UniversityID:TransApprovalMappingData.Univ_ID, TransApprovalID:TransApprovalMappingData.Tran_Approval_ID,
							TransDt:TransApprovalMappingData.Trans_Dt, StudentID:TransApprovalMappingData.Student_ID, TranApprovalIDNumber:TransApprovalMappingData.Tran_Approval_IDNumber});
							
							}else 
							{
								this.TransApprovalMapping.push({TransMapID : data[i].Tran_Map_ID, NextApproverRoleID:data[i].Role_ID, PrevApproverRoleID:TransApprovalMappingData.Next_Approver_RID,
							Priority:data[i].Priority,MaskID:Math.pow(2, data[i].Priority), Status:status, 
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
	  this.authService.addUniversityTransApprovalHistory(this.model, this.universityApprovalHistory, this.TransApprovalMapping).subscribe(data => {
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
			},
				//observable also returns error
					err => {
					console.log(err);
					return false;
				});

				
	  
  }
  
}

