import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {categoryModel} from '../../model/categoryModel'
import {studentCategoryModel} from '../../model/studentCategoryModel'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  student:Object;
  isLoading : boolean =  false;
 

  constructor(private authService:AuthService, private router:Router) { }
  public options:categoryModel[]=[];
  public studentCategoryList :studentCategoryModel[]=[];
optionsMap = {
        OptionA: false,
        OptionB: false,
        OptionC: false,
};
optionsChecked = [];
  //load user when initialized 
  ngOnInit() {
	  	
	 // console.log(this.authService.studentID);
	  this.authService.getStudentByID(JSON.parse(this.authService.getStudent()).id).subscribe(data => {
		  this.student =data;
	  });
	   
	   this.authService.getCategories().subscribe(data => {
		   for(let i=0; i< data.length; i++)
		   {
			   
			var item =new   categoryModel(); 
			item.CategoryID=data[i].CategoryID;
			item.CategoryName=data[i].CategoryName;
			item.IsChecked=false;
			this.options.push(item);
		   }
      
	  });
    
  }
  
  
  updateProfile(btn)
  {
	  
	 this.authService.updateProfile(this.student).subscribe(data => {
		
      if(data.success){		  
		 if(this.options.length >0)
	  {
		  for(let m=0;m<this.options.length; m++)
		  {

			var item =new   studentCategoryModel(); 
			item.CategoryID=this.options[m].CategoryID.toString();
			item.StudentID=this.authService.studentID;
			item.Active=this.options[m].IsChecked;
			this.authService.addStudentCategory(item).subscribe(data => {
		   
	   });
		  }
	  }
     
	  document.getElementById(btn).click();
      } else {
       // this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  }
  
      

}
