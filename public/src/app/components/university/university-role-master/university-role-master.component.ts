import { Component, OnInit,ChangeDetectorRef,ViewEncapsulation } from '@angular/core';
 import {ValidateService} from '../../../services/validate.service';
import {AuthService} from '../../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {univerisityRoleMstr} from '../../../model/univerisityRoleMstr';


import {Router, ActivatedRoute, Params} from '@angular/router';



@Component({
  selector: 'app-university-role-master',
  templateUrl: './university-role-master.component.html',
  styleUrls: ['./university-role-master.component.scss']
})
export class UniversityRoleMasterComponent implements OnInit {
model={  	
    Univ_RoleName:[],  
    Univ_ID:''
	
};
  //public UniversityRoles : Array<String>=[];
  submitted = false;
  constructor(
   private validateService: ValidateService,
   private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router,
	private activatedRoute:ActivatedRoute,
	private changeDetectorRef: ChangeDetectorRef
    )
	{}
	public Universities = [
	  {Univ_ID: 0,  Univ_Name:"Please select"}
         
     ];
	 
  ngOnInit() {
	  this.model.Univ_RoleName.push({Univ_RoleName:""});
	  // Get all organization
	  this.authService.getAllUniversity().subscribe(data => {
		   for(let i=0; i< data.length; i++)
       this.Universities.push({Univ_ID:data[i].Univ_ID,Univ_Name:data[i].Univ_Name});
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
 
  }
  
  onSubmit()
  {
	 
	   this.authService.addUniversityRole(this.model).subscribe(data => {
		  if(data.success)
		  {
			  this.router.navigate(['/']);
		  }
		    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	 
  }
  
  AddMoreRoles()
  {
	  
	 this.model.Univ_RoleName.push({Univ_RoleName:""}); 
  }
  

}
