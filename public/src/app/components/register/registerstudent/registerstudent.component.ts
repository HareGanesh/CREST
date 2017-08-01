import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ValidateService} from '../../../services/validate.service';
import {AuthService} from '../../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import { NG_VALIDATORS,Validator,Validators,AbstractControl,ValidatorFn } from '@angular/forms';
import { UniversityTransApproval } from './UniversityTransApproval';


import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-registerstudent',
  templateUrl: './registerstudent.component.html',
  styleUrls: ['./registerstudent.component.scss']
})
export class RegisterstudentComponent implements OnInit {
    Student_Name: String;
  	Email_ID: String;
  	username: String;
  	Pwd: String;
	ConfirmPwd:String;
  	DOB: Date;
    Student_ID: String;
    Address: String;
    Mobile_No: String;
    Univ_ID: Number;
    Dept_ID: Number;
	public SuccessMessage='';
	TransApprovalMapping:UniversityTransApproval[]=[];
    model:Object;
	submitted = false;
	public ErrorList:string[]=[];
	public UserNameErrorList:string[]=[];
	public StuErrorList:string[]=[];
	public Universities = [
	  {id: 0,  name:"Please select"}
            
     ];
	 
	 public GenderList = [
	  {id:'0',  name:"Please select"},
	  {id: 'Male',  name:"Male"},
	  {id: 'Female',  name:"Female"}
            
     ];
	 
	 public Departsments = [
	  {id: 0,  name:"Please select"},
      {id: 1, name: "Computer Science"},
      {id: 2, name: "Mathematics"},
      {id: 3, name: "Social Engineering"}      
     ];
	
	 
  constructor(
   private validateService: ValidateService,
   private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router,
	public toastr: ToastsManager, public vcr: ViewContainerRef
	)
	{
	
this.toastr.setRootViewContainerRef(vcr);
		}

  ngOnInit() {
	  
	  // Get all university  
	  this.authService.getAllUniversity().subscribe(data => {
		   for(let i=0; i< data.length; i++)
		   {
			   this.authService.getUnivTranscationTypeDetailByUnivID(data[i].Univ_ID).subscribe(univTrans => {
		       if(univTrans.length > 0)
			   {
			     this.Universities.push({id:data[i].Univ_ID, name:data[i].Univ_Name});
			   }
			},//observable also returns error
    err => {
      console.log(err);
      return false;
    });
    }	
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	
	  this.model={

  	Student_Name: '',  	
  	username: '',
	Email_ID:'',
	TransApprovalMapping:[],	
  	Pwd: '',
	ConfirmPwd:'',
    Student_ID: '',
    DOB: '',
    Address: '',
    Mobile_No: '',
    Univ_ID: '0',
    Dept_ID: '0',
	GenderID:0
   
  	}
  }
  
  showSuccess(msg) {
	  debugger;
        this.toastr.success(msg, 'Success!');
      }
  
  emailChange()
  {
	  debugger;
	  let length = this.ErrorList.length;
		for(let i=0; i< length;i++)
		{
		this.ErrorList.pop();
		}
	  this.authService.getUserByEmail(this.model).subscribe(data => {
		   if(data != null)
		   {
			   this.ErrorList.push("Alternate Email is duplicate");
			   
		   }
       },
		//observable also returns error
		err => {
			console.log(err);
			return false;
    });
	
	
  }

  
  userNameChange()
  {
	  
	  let length = this.UserNameErrorList.length;
		for(let i=0; i< length;i++)
		{
		this.UserNameErrorList.pop();
		}
	  this.authService.getUserByUserName(this.model).subscribe(data => {
		   if(data != null)
		   {
			   this.UserNameErrorList.push("Email is duplicate");
			   
		   }
       },
		//observable also returns error
		err => {
			console.log(err);
			return false;
    });
	
  }
  
  StudentIDChange()
  {
	debugger;
	  let length = this.StuErrorList.length;
		for(let i=0; i< length;i++)
		{
		this.StuErrorList.pop();
		}
	  this.authService.getStudentByStudentID(this.model).subscribe(data => {
		   if(data != null)
		   {
			   this.StuErrorList.push("Student ID is duplicate");
			   
		   }
       },
		//observable also returns error
		err => {
			console.log(err);
			return false;
    });  
  }
  
  onChange(univID) {
		debugger;
		
       this.TransApprovalMapping=[];
	   let TransApprovalID="ReqSA-1";
	   let transApprovalIDNumber=1;
	   let transDt='';
	   this.authService.getMaxTranApprovalID().subscribe(data => {
		   if(data.length > 0)
		   {
		    TransApprovalID = "ReqSA-" +(parseInt(((data[0].Tran_Approval_ID).split('-')[1])) +1).toString();
		   }
		},
		//observable also returns error
		err => {
		console.log(err);
		return false;
		});
		
		this.authService.getMaxTranApprovalNumberID().subscribe(data => {
		   if(data.length > 0)
		   {
		    transApprovalIDNumber = data[0].Tran_Approval_IDNumber + 1;
		   }
		},
		//observable also returns error
		err => {
		console.log(err);
		return false;
		});
		
		this.authService.getUnivTranscationTypeDetailByUnivIDAndTransTypeAndCurrentDate(parseInt(univID), 1).subscribe(data => {
					if(data.length > 0)
					{
						for(let i=0; i< data.length; i++)
						{							
							this.TransApprovalMapping.push({TransMapID : data[i].Tran_Map_ID, NextApproverRoleID:data[i].Role_ID,
							Priority:data[i].Priority,MaskID:Math.pow(2, data[i].Priority), Status:0, 
							UniversityID:parseInt(univID), TransApprovalID:TransApprovalID, TransDt:transDt, StudentID:this.Student_ID, TransApprovalIDNumber:transApprovalIDNumber});
						}
					}
			},
				//observable also returns error
					err => {
					console.log(err);
					return false;
				});		
				
		}
		
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
  

  onRegisterSubmit(){


	  debugger;	  


	 
	  //this.submitted = true;

  	const student = {

  	Student_Name: this.Student_Name,
  	Email_ID: this.Email_ID,
  	username: this.username,
  	Pwd: this.Pwd,
	ConfirmPwd : this.ConfirmPwd,
    Student_ID: this.Student_ID,
    DOB: this.DOB,
    Address: this.Address,
    Mobile_No: this.Mobile_No,
    Univ_ID: this.Univ_ID,
    Dept_ID: this.Dept_ID
   
  	}
	
	// Trans mappping logic
	//this.TransMapping.sort(x=>x.Priority);
	
  	 // Required Fields
    if(!this.validateService.validateRegister(this.model)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    //if(!this.validateService.validateEmail(this.model.Email_ID)){
     //this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      //return false;
    //}

  // Register user
    this.authService.registerStudent(this.model, this.TransApprovalMapping).subscribe(data => {
		debugger;
      if(data.success){
		  this.SuccessMessage = "Registration is complete. Request sent to university for approval. Once approved you can use login to continue. Click here for login: ";
		  this.showSuccess(this.SuccessMessage);
		  //this.model='';
		  //this.ngOnInit();
		  //document.getElementById('btnsubmit').disabled = true;
        //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        //this.router.navigate(['/login']);
      } else {
        //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
	  

  }

}
