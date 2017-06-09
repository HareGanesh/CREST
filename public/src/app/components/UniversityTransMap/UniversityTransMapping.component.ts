import { Component, OnInit,ChangeDetectorRef,ViewEncapsulation } from '@angular/core';
 import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';

import { UniversityTrans } from './UniversityTrans';
 import { UniversityRole } from './UniversityRole';
import { UniversityTransMask } from './UniversityTransMask';
import { UniversityTransMap } from './UniversityTransMap';
import {Router, ActivatedRoute, Params} from '@angular/router';



@Component({
  selector: 'app-UniversityTransMapping',
  templateUrl: './UniversityTransMapping.component.html',
  styleUrls: ['./UniversityTransMapping.component.scss'],
  encapsulation: ViewEncapsulation.None 

})
export class UniversityTransMappingComponent implements OnInit {
	student:Object;
	category:Object;
	isUpdate:Boolean;
	public organizations = [
	  
         
     ];

	  //optionsModel: number[] = [1, 2];
 

// // Settings configuration


// // Labels / Parents
 
	  
    path='';
	public eventId='';
  
  public ErrorList:string[]=[];
   public universityRole:UniversityRole;
  
  public universityTransMask:UniversityTransMask;
  public universityTransMap:UniversityTransMap;
  //public RulesList:EventRules[]=["1",""];
 
  public selectedCategory:any = null;
public selectedSubCategory:any = null;
public selectedEvent:any = null;
  // postId: number;
  // options: Object = {
    // url: 'http://localhost:10050/upload',
    // params: { 'post_id': this.postId }
  // };
public Universities = [
	  {Univ_ID: 0,  Univ_Name:"Please select"}
         
     ];
	 
public TranscationTypeList = [
	  {Tran_Type_ID: 0,  Tran_Type_Name:"Please select"}
         
     ];
	 
 public UniversityRoles = [
	  
         
     ];
	 public UniversityRolesWithUniversity = [
	   {Univ_RoleID: 0,  Univ_RoleName:"Please select", Univ_ID:""}
         
     ];
public EventTypes = [
      {EventTypeID: 0,  EventTypeName:"Please select"}    
     ]; 
  
    
	
	
    model={  	
    UniversityID:'0',  
    TransTypeID:'0',
	NoOfLevel:1,
	TransMapID:'',	
    Roles:[],
	TransMask:[],
	TransMap:[],
	
	Created_On:new Date(),
	Created_by:'',
	Modified_On:'',
	Modified_by:''
	
     	};
		
submitted = false;
  constructor(
   private validateService: ValidateService,
   private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router,
	private activatedRoute:ActivatedRoute,
	private changeDetectorRef: ChangeDetectorRef



    ) { }

	
	onChange(univID) {
		debugger;
		this.model.Roles=[];
	//document.getElementsByClassName('AddMoreDiv').cssClass='show';
       this.UniversityRoles = this.UniversityRolesWithUniversity.filter(x=>x.Univ_ID ==univID);
	   this.UniversityRoles.push(this.UniversityRolesWithUniversity[0]);
	   this.UniversityRoles = this.UniversityRoles.sort(x=>x.Univ_RoleID);
		if(this.model.TransTypeID != '0')
			{
				this.authService.getAllTranscationTypeWithRolesAndPriority(parseInt(univID), parseInt(this.model.TransTypeID)).subscribe(data => {
					if(data.length > 0)
					{
						this.model.TransMapID = data[0].Tran_Map_ID;
						for(let i=0; i< data.length; i++)
						{
							this.isUpdate = true;
							this.model.Roles.push({RoleID:data[i].Role_ID,Priority:data[i].Priority});
						}
					}else
					{
						this.isUpdate = false;
					}
			},
				//observable also returns error
					err => {
					console.log(err);
					return false;
				});
			}
		}
		
	onChangeTransType(TransTypeID) {
	debugger;
	//document.getElementsByClassName('AddMoreDiv').cssClass='show';
	this.model.Roles=[];
	if(this.model.UniversityID != '0')
	{
	this.authService.getAllTranscationTypeWithRolesAndPriority(parseInt(this.model.UniversityID), parseInt(TransTypeID)).subscribe(data => {
		   if(data.length > 0)
					{
						this.model.TransMapID = data[0].Tran_Map_ID;
						for(let i=0; i< data.length; i++)
						{
							this.isUpdate = true;
							this.model.Roles.push({RoleID:data[i].Role_ID,Priority:data[i].Priority});
						}
					}else
					{
						this.isUpdate = false;
					}
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	}
       
    }
	isDisabled() {
	  //debugger;
         if(this.model.UniversityID !="0"){
		    return false;		 
		   }
          else{
		   return true;
	      }
  }
  ngOnInit() {
	  debugger;
	  
	  this.authService.getMaxTranMapID().subscribe(data => {
		  this.model.TransMapID = data[0].Tran_Map_ID;
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	  
	  // Get all organization
	  this.authService.getAllUniversity().subscribe(data => {
		   for(let i=0; i< data.length; i++)
      this.Universities.push(data[i]);
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
 
   

	  // Logged in user
	this.student = JSON.parse(this.authService.getStudent());
       // debugger;
	   // this.authService.getCategories().subscribe(data => {
		   // for(let i=0; i< data.length; i++)
      // this.Categories.push(data[i]);
    // },
    // //observable also returns error
    // err => {
      // console.log(err);
      // return false;
    // });
	
	
	// Load sub categories
	this.authService.getUniversityRoles().subscribe(data => {
		   for(let i=0; i< data.length; i++)
      this.UniversityRolesWithUniversity.push(data[i]);
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	
	// Load event types
	this.authService.getAllTranscationType().subscribe(data => {
		   for(let i=0; i< data.length; i++)
      this.TranscationTypeList.push(data[i]);
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	  
	  let eventID
	 this.activatedRoute.params.subscribe((params: Params) => {
         eventID = params['id'];
       // console.log(eventID);
      });
	  
	  // if(eventID == 0)
	  // {
	  // this.selectedCategory = 0;
	   // this.eventRule = { RuleNo:"1", RuleDescription:""};	  
	   // this.model.Rules.push(this.eventRule);
	  
	   // this.eventPrize = { PrizeNo:"1", PrizeDescription:""};	  
	   // this.model.Prizes.push(this.eventPrize);
	  
	  
	   // this.eventOrganizer = { OrganizerNo:"1", OrganizerName:"", OrganizerEmail:"", OrganizerContact:""};	  
	   // this.model.Organizers.push(this.eventOrganizer);
	  // }else{
	  // this.eventId ="eventid";
	  // this.authService.getEvents().subscribe(event => {

      // let eventList = event;
	// // this.eventDetails=event;
	  // var data = eventList.filter(function (element, index) {

     // if(element.EventID === parseInt(eventID))
		// {
   	  // return eventList[index];
		// }
		// });

	// this.model=data[0];
	// //this.file_srcs.push(this.model.Event_Logo);
	
	
    // },	
    // //observable also returns error
    // err => {
      // console.log(err);
      // return false;
    // });
	  // }
  }
  
  
  

  
  AddMoreRoles()
  {
	  debugger
	  
	  
	  let levelNo = this.model.NoOfLevel;
	  if(levelNo == 0)
	  {
		  levelNo=1;
	  }
  
	  for(let i=0; i< levelNo;i++)
	  {
		  let length = this.model.Roles.length+1;

		  this.universityRole = { Priority:length, RoleID:0};
	  this.model.Roles.push(this.universityRole);
	  }
  }
  
  RemoveRoles(priority)
  {
	  debugger
	  let role = this.model.Roles.filter(x=>x.Priority == priority);
	  let index= this.model.Roles.indexOf(role);
	  this.model.Roles.splice(priority-1, 1)
	  //this.model.Roles.pop();
	  this.resetPriority();
	  
  }
  
  resetPriority()
  {
	 for(let i=0; i< this.model.Roles.length;i++)
	  {
		  this.model.Roles[i].Priority = i+1;
	  }
  }
  
  
 // compareDates()
// {
	// debugger;
   // if(new Date(this.model.EndDt)<new Date(this.model.StartDt))
   // {
      
      // this.ErrorList.push("End Date can not before start date");	  
   // }
   
   // if(new Date(this.model.StartDt)<new Date(this.model.EventRegisterEndDt))
   // {
      
	  // this.ErrorList.push("Registration End Date can not after start date.");	  
   // }
   
   // if(new Date(this.model.EndDt)<new Date(this.model.EventRegisterEndDt))
   // {
      
	  // this.ErrorList.push("Registration End Date can not after event end date.");	  
   // }
// }
  
 // compareRegistrationDates()
// {
	// debugger;
   // if(new Date(this.model.StartDt)<new Date(this.model.EventRegisterEndDt))
   // {
	   // this.ErrorList.push("Registration End Date can not after start date.");	
   // }
// }
  
checkValidation()
{	debugger;
    let length = this.ErrorList.length;
	for(let i=0; i< length;i++)
	{
		this.ErrorList.pop();
	}
	
	if(this.model.UniversityID == "0")
	{
		this.ErrorList.push("University ID is required.");
	}

	if(this.model.TransTypeID == "0")
	{
		this.ErrorList.push("Transcation Type is required.");
	}
	
	if(this.model.Roles.length == 0)
	{
		this.ErrorList.push("Please click on Add button to select roles corresponding to university.");
	}else 
	{
		let duplicateCount=0;
			for(let i=0; i<this.model.Roles.length;i++)
			{
				if(this.model.Roles[i].RoleID == "0")
				{
					this.ErrorList.push("Please select one value from role dropdown from row no: " + (i+1).toString());
				}
			
				duplicateCount=0;
				for(let j=0; j<this.model.Roles.length;j++)
					{
				if(this.model.Roles[i].RoleID == this.model.Roles[j].RoleID)
				{
					duplicateCount++;
				}
			}
			}
			
			if(duplicateCount > 1)
			{
				this.ErrorList.push("Duplicate role selected.");
			}
	}
	
	// if(this.file_srcs.length == 0)
	// {
		// this.ErrorList.push("Event Logo is required");
	// }
	
	// if(this.model.CategoriesMstr == "")
	// {
		// this.ErrorList.push("Please select the event category");
	// }
	
	// if(this.model.EventType == "")
	// {
		// this.ErrorList.push("Please select the event type");
	// }
	
	// if(this.model.StartDt == undefined)
	// {
		// this.ErrorList.push("Event Start Datet is required");
	// }
	
	// if(this.model.EndDt == "")
	// {
		// this.ErrorList.push("Event end date is required");
	// }
	
	// if(this.model.EventRegisterEndDt == "")
	// {
		// this.ErrorList.push("Event registration date is required");
	// }
	
	// if(this.model.Location == "")
	// {
		// this.ErrorList.push("Event location is required");
	// }
	
	// if(this.model.POCRequired != "" && this.model.POCRequired == "Yes" && this.model.POCDeadLine == "")
	// {
		// this.ErrorList.push("POC deadline is required");
	// }
	
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



  onSubmit(){
	  debugger;
	  if(!this.checkValidation())
	  {
		  return false;
	  }
  else {
	  
	  this.submitted = true;
	  
  	// this.model.StartDt = new Date(this.model.StartDt).toISOString();
	// this.model.EndDt = new Date(this.model.EndDt).toISOString();
	// this.model.EventRegisterEndDt = new Date(this.model.EventRegisterEndDt).toISOString();
	
	// Set created and modified properties
	this.model.Created_by = JSON.parse(this.authService.getStudent()).id;
	this.model.Created_On = new Date();
	if(!this.isUpdate)
	{
	this.model.TransMapID = this.model.TransMapID+1;
	}
	
	this.model.NoOfLevel = this.model.Roles.length;
		
	for(let i=0; i< this.model.Roles.length;i++)
	{
		//this.universityRole = { Priority:length.toString(), RoleID:"0"};
		this.model.TransMask.push({TransMapID:this.model.TransMapID, MaskID:Math.pow(2, this.model.Roles[i].Priority), Priority:this.model.Roles[i].Priority});
		this.model.TransMap.push({TransMapID:this.model.TransMapID, RoleID:this.model.Roles[i].RoleID, Priority:this.model.Roles[i].Priority});
	}
  	 // Required Fields
    // if(this.validateService.validateEvent(this.model)){     
	  // this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
	 // // this.ErrorList.push("Name required");
	  // this.submitted = false;
      // return false;
    // }

    // Validate Email
    //if(!this.validateService.validateEmail(this.model.Email_ID)){
     //this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      //return false;
    //}

	
	
  // Register user
    this.authService.AddUnivTranscationTypeDetail(this.model).subscribe(data => {
		debugger;
      if(data.success){
        //this.flashMessage.show('Event has been registered', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['']);
      } else {
        //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/EventInfo']);
      }
    });
  }

  }

}
