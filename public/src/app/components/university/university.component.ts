import { Component, OnInit, Input } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service'
import {Router, ActivatedRoute, Params} from '@angular/router';

import {universityModel} from '../../model/universityModel';
import {AddUniversityComponent} from '../../components/university/add-university/add-university.component';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',  
  styleUrls: ['./university.component.scss'],
  providers: [AddUniversityComponent]
})
export class UniversityComponent implements OnInit {
	public univeritymodel = new universityModel();
    public Action:String="Edit";
	public errorMsg:String="";
	public deleteID:String="";
	private universityList: Array<universityModel> = [];
   
	constructor(
	private validateService: ValidateService,  
   private authService:AuthService,
   private router: Router,
   private activatedRoute:ActivatedRoute,
  private adduniversity:AddUniversityComponent,
  private flashMessage:FlashMessagesService
  ) {}
  
  @Input()
  ngOnInit() {	

   this.bindGrid();
  }
  
  
  // To bind the grid with university
  bindGrid()
  {
	  	  this.authService.getUniversity().subscribe(university => {   
	      this.universityList=university;
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
  }
  
  // To show and edit the university in pop up
  showPopup(id)
  {	  
      this.Action="Edit";
	  this.authService.getUniversityById(id).subscribe(university => {     
	  this.univeritymodel=university;
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
  }
  
  callAddUniversity(id)
  {
	//this.adduniversity.univeritymodel=[];
	 // this.adduniversity.openmodal(id);
	  // console.log(current);
  }

  // To clear model during add University
  clearModel()
  {
	  this.Action="Add";
	  this.univeritymodel = new universityModel();
  }
  
  // Update university profile
  updateProfile(btn)
{
	debugger;
	if(this.univeritymodel._id==undefined)
	{
	this.univeritymodel.Pwd=this.generatePassword();
	this.authService.addUniversity(this.univeritymodel).subscribe(data => {
		debugger;
		if(data.success)
		{
			
	     document.getElementById('close').click();
		this.bindGrid();
		}
		else
		{
			this.errorMsg=data.msg;		
		}
	});
	}
	else
	{
		this.authService.updateUniversity(this.univeritymodel).subscribe(data => {
		debugger;
		if(data.success)
		{
	     document.getElementById('close').click();
		this.bindGrid();
		}
	});
	 
	}
}

// To generate random password
 generatePassword() {
    var length = 6,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

deleteUniverity(id)
{
	this.deleteID=id;


}

// To delete University 

deleteItem()
{
	
	var objUniModel = new universityModel();
	objUniModel._id=this.deleteID;
	this.authService.deleteUniversity(objUniModel).subscribe(data => {
		
		if(data.success)
		{
	     document.getElementById('close2').click();
		this.bindGrid();
		}
	});	
}
}


