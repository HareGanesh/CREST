import { Component, OnInit,ElementRef, ViewContainerRef } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {categoryModel} from '../../model/categoryModel'
import {studentCategoryModel} from '../../model/studentCategoryModel'
import {AccordionModule} from "ng2-accordion";
import { StudentProfessionalDetail } from './StudentProfessionalDetail';
import { StudentEducationDetail } from './StudentEducationDetail';
import { StudentDetail } from './StudentDetail';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  student:Object;
  //model:Object;
  isLoading : boolean =  false;
  id: String;
  public studentEducationDetail:StudentEducationDetail;
  public professionalDetail:StudentProfessionalDetail;
  public SuccessMessage='';
  public ErrorList:string[]=[];
  public DegreeList = [
	  {DegreeID: 0,  DegreeName:"Please select"}
         
     ];
	 
  public SpecializationList = [
	  {SpecializationID: 0,  SpecializationName:"Please select"}
         
     ];
	 
  public GradeList = [
	  {GradeID: 0,  GradeName:"Please select"}
         
     ];
	 
  public YearList = [
	  {YearID: 0,  Year:"yyyy"}
         
     ];
	 
  public MonthList = [
	  {MonthID: 0,  Month:"m"}
         
     ];
	 
   model={ 
    Univ_Name:'',  
    Student_Name:'',
	Email_ID:'',	
	StudentID:'',
    ProfessionalDetail:[],
	EducationDetail:[],	
	Address:'',
	Mobile_No:'',
	Student_Bio:'',
	Student_Heading:'',
	Created_On:new Date(),
	Created_by:'',
	Modified_On:'',
	Modified_by:''
	
     	};
		
		model1={ 
    Univ_Name:'',  
    Student_Name:'',
	Student_ID:'',
	Email_ID:'',	
    ProfessionalDetail:[],
	EducationDetail:[],
	Address:'',
	Mobile_No:'',
	Student_Bio:'',
	Student_Heading:'',
	Created_On:new Date(),
	Created_by:'',
	Modified_On:'',
	Modified_by:''
	
     	};
debugger;
  constructor(private authService:AuthService, private router:Router, private elm: ElementRef,
	public toastr: ToastsManager, public vcr: ViewContainerRef
	)
	{
	
this.toastr.setRootViewContainerRef(vcr);
		}
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
	  this.id = this.elm.nativeElement.getAttribute('id'); 
	  this.BindDegree();
	  this.BindGrade();
	  this.BindSpecialization();
	  this.BindMonthList();
	  this.BindYearList();
      this.studentEducationDetail = { DegreeID:0,  SpecializationID:0, Year:0, GradeID:0};	
	  this.professionalDetail = {EmployerName :'', DurationStartMonth:0,  DurationStartYear:0, DurationEndMonth:0, DurationEndYear:0, Designation:'', JobProfile:'', FullTimeOrPartTime:'No', CurrentEmployer:true};	  
	  	 debugger;
	 // console.log(this.authService.studentID);
	  this.authService.getStudentProfileByStudentID(JSON.parse(this.authService.getStudent()).Student_ID).subscribe(data => {
		  debugger;
		this.student = data;
		 this.model1=data;
		// this.model = this.model1;
		   this.model.Student_Name =this.model1[0].Student_Name;
		   this.model.Email_ID =this.model1[0].Email_ID;
		   this.model.Address =this.model1[0].Address;
		   this.model.Mobile_No =this.model1[0].Mobile_No;
		   this.model.Student_Name =this.model1[0].Student_Name;
		   this.model.StudentID =this.model1[0].Student_ID	;
		   this.model.Student_Heading =this.model1[0].Student_Heading	;
		   this.model.Student_Bio =this.model1[0].Student_Bio	;
	  
	  if(this.model1[0].StudentEducational_Info.length != 0)
	  {
	      this.model.EducationDetail = this.model1[0].StudentEducational_Info;
	  }
	  else 
	  {
		  this.model.EducationDetail.push(this.studentEducationDetail);
	  }
	  
	  if(this.model1[0].StudentProfessional_Info.length != 0)
	  {
	  this.model.ProfessionalDetail= this.model1[0].StudentProfessional_Info;
	  }else{	  
	  
	  this.model.ProfessionalDetail.push(this.professionalDetail);
	  }
	  
	  this.model.Univ_Name = this.model1[0].StudentUniv_Info[0].Univ_Name
	  
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
  
  BindDegree()
  {
	  this.authService.getAllDegree().subscribe(data => {
		   for(let i=0; i< data.length; i++)
      this.DegreeList.push({DegreeID:data[i].DegreeID, DegreeName:data[i].DegreeName});
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
  }
  
  BindGrade()
  {
	  this.authService.getAllGrade().subscribe(data => {
		   for(let i=0; i< data.length; i++)
      this.GradeList.push({GradeID:data[i].GradeID, GradeName:data[i].GradeName});
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
  }
  
  BindSpecialization()
  {
	  this.authService.getAllSpecialization().subscribe(data => {
		   for(let i=0; i< data.length; i++)
      this.SpecializationList.push({SpecializationID:data[i].SpecializationID, SpecializationName:data[i].SpecializationName});
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
  }
  
  BindMonthList()
  {
	  for(let i=1; i<=12; i++)
	  {
		  this.MonthList.push({MonthID:i, Month:i.toString()});
	  }
  }
  
  BindYearList()
  {
	  for(let i=new Date().getFullYear()-50; i<=new Date().getFullYear()+5; i++)
	  {
		  this.YearList.push({YearID:i, Year:i.toString()});
	  }
  }
  
  AddMoreEducation()
  {
	  debugger;
	  let length = this.model.EducationDetail.length+1;
	  this.studentEducationDetail = { DegreeID:0,  SpecializationID:0, Year:0, GradeID:0};	  
	  this.model.EducationDetail.push(this.studentEducationDetail);
  }
  
  RemoveEducation()
  {
	  debugger
	  this.model.EducationDetail.pop();
  }
  
  AddMoreProfessional()
  {
	  debugger;
	  let length = this.model.ProfessionalDetail.length+1;
	  this.professionalDetail = {EmployerName :'', DurationStartMonth:0,  DurationStartYear:0, DurationEndMonth:0, DurationEndYear:0, Designation:'', JobProfile:'', FullTimeOrPartTime:'No', CurrentEmployer:false}; 
	  this.model.ProfessionalDetail.push(this.professionalDetail);
  }
  
  RemoveProfessional()
  {
	  debugger
	  this.model.ProfessionalDetail.pop();
  }
  
 onChange(item)
 {
	for(let i=0; i< this.model.ProfessionalDetail.length; i++)
	{
		this.model.ProfessionalDetail[i].CurrentEmployer = false;
	}
 }
  
  GetStyle(i)
  {
	  
	  if(i != this.model.EducationDetail.length)
	  {
	  return "solid 5px";
	  }else {
		  return "";
	  }
  }
  
  GetProfessionalStyle(i)
  {
	  
	  if(i != this.model.ProfessionalDetail.length)
	  {
	  return "solid 5px";
	  }else {
		  return "";
	  }
  }
  
  checkValidation()
{	debugger;
    let length = this.ErrorList.length;
	for(let i=0; i< length;i++)
	{
		this.ErrorList.pop();
	}
	
	
	
	if(this.model.ProfessionalDetail.length != 0)
	{
			for(let i=0; i<this.model.ProfessionalDetail.length;i++)
			{
				if(this.model.ProfessionalDetail[i].DurationStartYear >  this.model.ProfessionalDetail[i].DurationEndYear)
				{
					this.ErrorList.push("Duration start can not be greater than  end from professional row no: " + (i+1).toString());
				}else if(this.model.ProfessionalDetail[i].DurationStartYear ==  this.model.ProfessionalDetail[i].DurationEndYear && this.model.ProfessionalDetail[i].DurationStartMonth >  this.model.ProfessionalDetail[i].DurationEndMonth)
				{
					this.ErrorList.push("Duration start can not be greater than  end from professional row no: " + (i+1).toString());
				}
				
			}
	}

		
	
	// this.compareDates();
	if(this.ErrorList.length > 0)
	{
	return false;
	}
	else 
	{
		return true;
	}
}

  
  updateProfile()
  {
	  debugger;
	  if(!this.checkValidation())
	  {
		  return false;
	  }
  else {
	 
	 this.authService.updateProfile(this.model).subscribe(data => {
		
      if(data.success){		
		//this.SuccessMessage	= "profile updated successfully.";
		this.toastr.success('Profile updated successfully!', 'Success!');
		document.body.scrollTop = document.documentElement.scrollTop = 0;

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
     
	  //document.getElementById(btn).click();
      } else {
       // this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  }
  }
  
      

}
