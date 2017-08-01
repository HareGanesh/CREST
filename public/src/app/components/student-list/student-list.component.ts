import { Component, OnInit, Input } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service'
import {Router, ActivatedRoute, Params} from '@angular/router';
import {TooltipModule} from "ngx-tooltip";
import { Ng2SmartTableModule, LocalDataSource  } from 'ng2-smart-table';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
Students:any;
public univID;
source: LocalDataSource; 
  	constructor(
   private validateService: ValidateService,  
   private authService:AuthService,
   private router: Router,
   private activatedRoute:ActivatedRoute,
  
  private flashMessage:FlashMessagesService
  ) {}
  
  settings = {
	delete: {
      confirmDelete: true,
	  //deleteButtonContent: '<a class="btn btn-primary pull-right" style="width:66px;" (click)="deleteUniverity(item._id)"  data-toggle="modal" data-target="#deleteDiv">Delete</a>'
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
    Student_Name: {
      title: 'Student Name',
	  filter:false
	  
    },
    username: {
      title: 'Email ID',
	  filter:false
    },
    Address: {
      title: 'Address',
	  filter:false
    },
    Mobile_No: {
      title: 'Contact No',
	  filter:false
    }
  }
};

data = [
    
];

  ngOnInit() {
	  this.univID = JSON.parse(this.authService.getLoginUser()).Univ_ID;
	  this.GetAllStudent();	  
  }
  
onSearch(query: string = '') {
	  debugger;
	  if(query != '')
	  {
  this.source.setFilter([
    // fields we want to include in the search
    {
      field: 'Student_Name',
      search: query
    },
    {
      field: 'Address',
      search: query
    },
    {
      field: 'username',
      search: query
    },
    {
      field: 'Mobile_No',
      search: query
    }
  ], false); 
	  }else
	  {
		  this.source = new LocalDataSource(this.data); 
	  }
  // second parameter specifying whether to perform 'AND' or 'OR' search 
  // (meaning all columns should contain search query or at least one)
  // 'AND' by default, so changing to 'OR' by setting false here
}
  
GetAllStudent()
  {
	  
	
	  this.authService.getStudentByUnivID(this.univID).subscribe(data => {
		    // for(let i=0; i< data.length; i++)
       this.Students=data;//.filter((E) => E.Univ_ID == this.univID);
       this.data = this.Students;
	   this.source = new LocalDataSource(this.data); 
		   
       },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	
	
	
  }
}
