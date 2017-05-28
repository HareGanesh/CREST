import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../../services/validate.service';
import {AuthService} from '../../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import { NG_VALIDATORS,Validator,Validators,AbstractControl,ValidatorFn } from '@angular/forms';



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
    Orgn_ID: Number;
    Dept_ID: Number;
    model:Object;
	submitted = false;
	public Organizations = [
	  {id: 0,  name:"Please select"},
      {id: 1, name: "Sunway"},
      {id: 2, name: "Eon"},
      {id: 3, name: "Scome"}      
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
	  this.model={

  	Student_Name: '',
  	Email_ID: '',
  	username: '',
  	Pwd: '',
	ConfirmPwd:'',
    Student_ID: '',
    DOB: '',
    Address: '',
    Mobile_No: '',
    Orgn_ID: '0',
    Dept_ID: '0'
   
  	}
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
    Orgn_ID: this.Orgn_ID,
    Dept_ID: this.Dept_ID
   
  	}
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
    this.authService.registerStudent(this.model).subscribe(data => {
		debugger;
      if(data.success){
        this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });

  }

}
