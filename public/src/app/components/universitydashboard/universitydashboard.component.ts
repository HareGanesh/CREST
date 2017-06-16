import { Component, OnInit, Input } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service'
import {Router, ActivatedRoute, Params} from '@angular/router';
import {universityApprovalHistory} from './universityApprovalHistory';
import { UniversityTransApproval } from './UniversityTransApproval';
import { UniversityTransApprovalList } from './UniversityTransactionApprovalList';

@Component({
  selector: 'app-universitydashboard',
  templateUrl: './universitydashboard.component.html',
  styleUrls: ['./universitydashboard.component.scss']
})
export class UniversitydashboardComponent implements OnInit {


    public Action:String="Edit";
	public errorMsg:String="";
	public deleteID:String="";
	private universityApprovalUserList: Array<UniversityTransApprovalList> = [];
	TransApprovalMapping:UniversityTransApproval[]=[];
	//universityApprovalHistory:universityApprovalHistory;
	public universityApprovalHistory:universityApprovalHistory;
	model:Object;
    public Students = [
	  {StudentID: "0",  StudentName:"please select"}
         
     ];
	constructor(
	private validateService: ValidateService,  
   private authService:AuthService,
   private router: Router,
   private activatedRoute:ActivatedRoute,
  
  private flashMessage:FlashMessagesService
  ) {}
  
  @Input()
  ngOnInit() {	
	this.model={	
	TransApprovalMapping:[],	
  	universityApprovalHistory:universityApprovalHistory
  	}
   this.bindGrid();
  }
  
  
  // To bind the grid with university
  bindGrid()
  {
	  let univID=2;
	  let maskID=8;
	  
	  debugger;
	  this.GetAllStudent();
	  	  this.authService.getAllUnivTranscationApprovalDetailByUnivIDAndMaskID(univID, maskID).subscribe(university => {   
	      this.universityApprovalUserList=university;
		  for(let i=0; i<this.universityApprovalUserList.length;i++)
		  {
		  this.universityApprovalUserList[i].Student_Name= this.Students.filter(x=>x.StudentID == this.universityApprovalUserList[i].Student_ID)[0].StudentName;
		  }
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	
	
		
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
  
  
    
  ApproveStudent(TransApprovalMappingData)
  {
	  
	  let maskID=8;
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
							TransDt:TransApprovalMappingData.Trans_Dt, StudentID:TransApprovalMappingData.Student_ID});
							
							}else 
							{
								this.TransApprovalMapping.push({TransMapID : data[i].Tran_Map_ID, NextApproverRoleID:data[i].Role_ID, PrevApproverRoleID:TransApprovalMappingData.Next_Approver_RID,
							Priority:data[i].Priority,MaskID:Math.pow(2, data[i].Priority), Status:status, 
							UniversityID:TransApprovalMappingData.Univ_ID, TransApprovalID:TransApprovalMappingData.Tran_Approval_ID, TransDt:TransApprovalMappingData.Trans_Dt, StudentID:TransApprovalMappingData.Student_ID});
							}
						 }
						}
						
						
					 debugger;
	  this.universityApprovalHistory.ApprovedBy = "amit";
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

