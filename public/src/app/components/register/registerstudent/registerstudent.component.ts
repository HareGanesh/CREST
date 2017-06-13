import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../../services/validate.service';
import {AuthService} from '../../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import { NG_VALIDATORS,Validator,Validators,AbstractControl,ValidatorFn } from '@angular/forms';
import { UniversityTransApproval } from './UniversityTransApproval';



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
	TransApprovalMapping:UniversityTransApproval[]=[];
    model:Object;
	submitted = false;
	public ErrorList:string[]=[];
	public UserNameErrorList:string[]=[];
	public StuErrorList:string[]=[];
	public Universities = [
	  {id: 0,  name:"Please select"}
            
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
    private router: Router



    ) { }

  ngOnInit() {
	  
	  // Get all organization
	  this.authService.getAllUniversity().subscribe(data => {
		   for(let i=0; i< data.length; i++)
      this.Universities.push({id:data[i].Univ_ID, name:data[i].Univ_Name});
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	
	  this.model={

  	Student_Name: '',
  	Email_ID: '',
  	username: '',
	TransApprovalMapping:[],	
  	Pwd: '',
	ConfirmPwd:'',
    Student_ID: '',
    DOB: '',
    Address: '',
    Mobile_No: '',
    Univ_ID: '0',
    Dept_ID: '0'
   
  	}
  }
  
  emailChange()
  {
	  debugger;
	  let length = this.ErrorList.length;
		for(let i=0; i< length;i++)
		{
		this.ErrorList.pop();
		}
	  this.authService.getStudentByEmail(this.model).subscribe(data => {
		   if(data != null)
		   {
			   this.ErrorList.push("Email id is duplicate");
			   
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
	  debugger;
	  let length = this.UserNameErrorList.length;
		for(let i=0; i< length;i++)
		{
		this.UserNameErrorList.pop();
		}
	  this.authService.getStudentByUserName(this.model).subscribe(data => {
		   if(data != null)
		   {
			   this.UserNameErrorList.push("user name is duplicate");
			   
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
	   let TransApprovalID=1;
	   let transDt='';
	   this.authService.getMaxTranApprovalID().subscribe(data => {
		   if(data.length > 0)
		   {
		    TransApprovalID = data[0].Tran_Approval_ID +1;
		   }
		},
		//observable also returns error
		err => {
		console.log(err);
		return false;
		});
		
		this.authService.getAllTranscationTypeWithRolesAndPriority(parseInt(univID), 2).subscribe(data => {
					if(data.length > 0)
					{
						for(let i=0; i< data.length; i++)
						{							
							this.TransApprovalMapping.push({TransMapID : data[i].Tran_Map_ID, NextApproverRoleID:data[i].Role_ID,
							Priority:data[i].Priority,MaskID:Math.pow(2, data[i].Priority), Status:0, 
							UniversityID:parseInt(univID), TransApprovalID:TransApprovalID, TransDt:transDt, StudentID:this.Student_ID});
						}
					}
			},
				//observable also returns error
					err => {
					console.log(err);
					return false;
				});		
				
		}
  

  onRegisterSubmit(){


	  debugger;	  


	 
	  this.submitted = true;

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
        //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
	  

  }

}
