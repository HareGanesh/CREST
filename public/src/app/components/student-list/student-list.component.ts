import { Component, OnInit, Input } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service'
import {Router, ActivatedRoute, Params} from '@angular/router';
import {TooltipModule} from "ngx-tooltip";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
Students:any;
public univID;
  	constructor(
   private validateService: ValidateService,  
   private authService:AuthService,
   private router: Router,
   private activatedRoute:ActivatedRoute,
  
  private flashMessage:FlashMessagesService
  ) {}

  ngOnInit() {
	  this.univID = JSON.parse(this.authService.getLoginUser()).Univ_ID;
	  this.GetAllStudent();	  
  }
GetAllStudent()
  {
	  
	
	  this.authService.getStudentByUnivID(this.univID).subscribe(data => {
		    // for(let i=0; i< data.length; i++)
       this.Students=data;//.filter((E) => E.Univ_ID == this.univID);
		   
       },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	
	
	
  }
}
