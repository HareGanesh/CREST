import { Component, OnInit, Input } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service'
import {Router, ActivatedRoute, Params} from '@angular/router';
import {universityApprovalHistory} from './universityApprovalHistory';
import { UniversityTransApproval } from './UniversityTransApproval';

@Component({
  selector: 'app-universitydashboard',
  templateUrl: './universitydashboard.component.html',
  styleUrls: ['./universitydashboard.component.scss']
})
export class UniversitydashboardComponent implements OnInit {


    public Action:String="Edit";
	public errorMsg:String="";
	public deleteID:String="";
	private universityApprovalUserList: Array<Object> = [];
	TransApprovalMapping:UniversityTransApproval[]=[];
	//universityApprovalHistory:universityApprovalHistory;
	public universityApprovalHistory:universityApprovalHistory;
	model:Object;
    
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
	  debugger;
	  	  this.authService.getAllUnivTranscationApprovalDetailByUnivIDAndMaskID(2,2).subscribe(university => {   
	      this.universityApprovalUserList=university;
		  
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	
	
		
  } 
  
  ApproveStudent(TransApprovalMappingData)
  {
	  this.universityApprovalHistory={TranApprovalHistoryID:0,ApprovedBy:"", ApprovedOn:new Date(), MaskID:0,Status:0, Comments:"", TransApprovalID:"" };
	  this.authService.getAllTranscationTypeWithRolesAndPriority(TransApprovalMappingData.Univ_ID, 1).subscribe(data => {
					if(data.length > 0)
					{
						for(let i=0; i< data.length; i++)
						{					
						 if(Math.pow(2, data[i].Priority) > TransApprovalMappingData.Mask_ID)
						 {
							this.TransApprovalMapping.push({TransMapID : data[i].Tran_Map_ID, NextApproverRoleID:data[i].Role_ID, PrevApproverRoleID:TransApprovalMappingData.Next_Approver_RID,
							Priority:data[i].Priority,MaskID:Math.pow(2, data[i].Priority), Status:0, 
							UniversityID:TransApprovalMappingData.Univ_ID, TransApprovalID:TransApprovalMappingData.Tran_Approval_ID, TransDt:TransApprovalMappingData.Trans_Dt, StudentID:TransApprovalMappingData.Student_ID});
						 }
						}
						
					 debugger;
	  this.universityApprovalHistory.ApprovedBy = "amit";
	  this.universityApprovalHistory.MaskID = TransApprovalMappingData.Mask_ID; 
	  this.universityApprovalHistory.TransApprovalID = TransApprovalMappingData.Tran_Approval_ID;
	  this.universityApprovalHistory.Status =1;
	  this.universityApprovalHistory.Comments = "Approved";
	  this.universityApprovalHistory.TranApprovalHistoryID=1;
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

