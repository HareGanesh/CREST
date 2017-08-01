import { Component, OnInit,ChangeDetectorRef,ViewContainerRef } from '@angular/core';
 import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';

import { OrganizationTrans } from './OrganizationTrans';
 import { OrganizationRole } from './OrganizationRole';
import { OrganizationTransMask } from './OrganizationTransMask';
import { OrganizationTransMap } from './OrganizationTransMap';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-OrganizationTransMapping',
  templateUrl: './OrganizationTransMapping.component.html',
  styleUrls: ['./OrganizationTransMapping.component.scss']

})
export class OrganizationTransMappingComponent implements OnInit {
	student:Object;
	category:Object;
	isUpdate:Boolean;
	tagID:String;
	isRolesDisabled:boolean = false;
	SuccessMessage='';
	orgnID:number;
	public SavedTransData=[];
	public organizations = [
	  
         
     ];

	  //optionsModel: number[] = [1, 2];
 

// // Settings configuration


// // Labels / Parents
 
	  
    path='';
	public eventId='';
  
  public ErrorList:string[]=[];
   public organizationRole:OrganizationRole;
  
  public universityTransMask:OrganizationTransMask;
  public universityTransMap:OrganizationTransMap;
  //public RulesList:EventRules[]=["1",""];
 
  public selectedCategory:any = null;
public selectedSubCategory:any = null;
public selectedEvent:any = null;
  // postId: number;
  // options: Object = {
    // url: 'http://localhost:10050/upload',
    // params: { 'post_id': this.postId }
  // };
public Organizations = [
	  {Orgn_ID: 0,  OrgnName:"Please select"}
         
     ];

	 public OrganizationsWithRoles = [
	  {Orgn_ID: 0,  OrgnName:"Please select", RoleList:[]}
         
     ];
	 
public TranscationTypeList = [
	  {Tran_Type_ID: 0,  Tran_Type_Name:"Please select"}
         
     ];
	 
 public OrganizationRoles = [
	  
         
     ];
	 public OrganizationRolesWithOrganization = [
	   {Orgn_RoleID: 0,  Orgn_RoleName:"Please select", Orgn_ID:""}
         
     ];
public EventTypes = [
      {EventTypeID: 0,  EventTypeName:"Please select"}    
     ]; 
  
    
	
	
    model={  	
    OrganizationID:'0',  
    TransTypeID:'0',
	NoOfLevel:1,
	TransMapID:'',	
	TransFlowStartDate:'',
	TransFlowEndDate:'',
    Roles:[],
	TransMask:[],
	TransMap:[],
	OrganizationName:'',
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
	private changeDetectorRef: ChangeDetectorRef,
	public toastr: ToastsManager, public vcr: ViewContainerRef
	)
	{
	
	this.toastr.setRootViewContainerRef(vcr);
		}

	
	onChange(orgnID) {
		debugger;
		this.OrganizationRoles=[];
		this.SavedTransData=[];
		this.model.Roles=[];
		//document.getElementsByClassName('AddMoreDiv').cssClass='show';
		//this.OrganizationRoles = this.OrganizationRolesWithOrganization.filter(x=>x.Orgn_ID ==orgnID);
	   
	   // if(this.OrganizationsWithRoles.find(x=>x.Orgn_ID == parseInt(orgnID)).RoleList.length > 0)
	   // {
	   // this.OrganizationRoles = this.OrganizationsWithRoles.find(x=>x.Orgn_ID == parseInt(orgnID)).RoleList;
	   // }
	   
	   // this.OrganizationRoles.push(this.OrganizationRolesWithOrganization[0]);
	   // this.OrganizationRoles = this.OrganizationRoles.sort(x=>x.Orgn_RoleID);
	   
		if(this.model.TransTypeID != '0')
			{
				this.authService.getAllOrgnTranscationTypeInfoWithRolesAndPriority(parseInt(orgnID), parseInt(this.model.TransTypeID)).subscribe(data => {
					this.isRolesDisabled = false;
					debugger;
					this.OrganizationRoles =  data.orgnRoles;
					this.OrganizationRoles.push(this.OrganizationRolesWithOrganization[0]);
					this.OrganizationRoles = this.OrganizationRoles.sort(x=>x.Orgn_RoleID);
					if(data.TransMapArray.length > 0 && data.OrgnTranscationTypeDetail[0].Tran_Flow_End_DT == null)
					{
						this.model.TransMapID = data.TransMapArray[0].Tran_Map_ID;
						for(let i=0; i< data.TransMapArray.length; i++)
						{
							this.isUpdate = true;
							this.model.Roles.push({RoleID:data.TransMapArray[i].Role_ID,Priority:data.TransMapArray[i].Priority});
						}
						
						this.model.TransFlowStartDate = data.OrgnTranscationTypeDetail[0].Tran_Flow_Start_DT;
						//this.model.TransFlowEndDate = data.UnivTranscationTypeDetail[0].Tran_Flow_End_DT;
					}else
					{
						if(data.TransMapArray.length == 0)
						{
						this.model.TransFlowStartDate = new Date().toString();
						}else {
						this.model.TransFlowStartDate = new Date((new Date(data.OrgnTranscationTypeDetail[0].Tran_Flow_End_DT)).getTime() + (60*60*24*1000)).toString();
						this.model.TransFlowEndDate = '';
						}
						//this.model.TransFlowStartDate = data.UnivTranscationTypeDetail[0].Tran_Flow_End_DT;
						this.isUpdate = false;
					}
					
			},
				//observable also returns error
					err => {
					console.log(err);
					return false;
				});
				
				// Old transaction data
				
				
				this.authService.getAllOrgnTranscationTypeListByOrgnIDAndTranType(parseInt(orgnID), parseInt(this.model.TransTypeID)).subscribe(data => {
		
		   if(data.length > 0 )
					{
						debugger;
						this.SavedTransData = data;
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
		this.OrganizationRoles=[];
		this.SavedTransData=[];
		this.model.Roles=[];
		//document.getElementsByClassName('AddMoreDiv').cssClass='show';
		//this.OrganizationRoles = this.OrganizationRolesWithOrganization.filter(x=>x.Orgn_ID ==orgnID);
	   
	   // if(this.OrganizationsWithRoles.find(x=>x.Orgn_ID == parseInt(orgnID)).RoleList.length > 0)
	   // {
	   // this.OrganizationRoles = this.OrganizationsWithRoles.find(x=>x.Orgn_ID == parseInt(orgnID)).RoleList;
	   // }
	   
	   // this.OrganizationRoles.push(this.OrganizationRolesWithOrganization[0]);
	   // this.OrganizationRoles = this.OrganizationRoles.sort(x=>x.Orgn_RoleID);
	   
		if(this.model.TransTypeID != '0')
			{
				this.authService.getAllOrgnTranscationTypeInfoWithRolesAndPriority(parseInt(this.model.OrganizationID), parseInt(TransTypeID)).subscribe(data => {
					this.isRolesDisabled = false;
					debugger;
					this.OrganizationRoles =  data.orgnRoles;
					this.OrganizationRoles.push(this.OrganizationRolesWithOrganization[0]);
					this.OrganizationRoles = this.OrganizationRoles.sort(x=>x.Orgn_RoleID);
					if(data.TransMapArray.length > 0 && data.OrgnTranscationTypeDetail[0].Tran_Flow_End_DT == null)
					{
						this.model.TransMapID = data.TransMapArray[0].Tran_Map_ID;
						for(let i=0; i< data.TransMapArray.length; i++)
						{
							this.isUpdate = true;
							this.model.Roles.push({RoleID:data.TransMapArray[i].Role_ID,Priority:data.TransMapArray[i].Priority});
						}
						
						this.model.TransFlowStartDate = data.OrgnTranscationTypeDetail[0].Tran_Flow_Start_DT;
						//this.model.TransFlowEndDate = data.UnivTranscationTypeDetail[0].Tran_Flow_End_DT;
					}else
					{
						if(data.TransMapArray.length == 0)
						{
						this.model.TransFlowStartDate = new Date().toString();
						}else {
						this.model.TransFlowStartDate = new Date((new Date(data.OrgnTranscationTypeDetail[0].Tran_Flow_End_DT)).getTime() + (60*60*24*1000)).toString();
						this.model.TransFlowEndDate = '';
						}
						//this.model.TransFlowStartDate = data.UnivTranscationTypeDetail[0].Tran_Flow_End_DT;
						this.isUpdate = false;
					}
					
			},
				//observable also returns error
					err => {
					console.log(err);
					return false;
				});
				
				// Old transaction data
				
				
				this.authService.getAllOrgnTranscationTypeListByOrgnIDAndTranType(parseInt(this.model.OrganizationID), parseInt(TransTypeID)).subscribe(data => {		
				if(data.length > 0 )
					{
						debugger;
						this.SavedTransData = data;
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
         if(this.model.OrganizationID !="0"){
		    return false;		 
		   }
          else{
		   return true;
	      }
	}
  
	parseDate(dateString: string): Date {
		if (dateString) {
			return new Date(dateString);
		} else {
			return null;
		}
	}
	
	compareDates()
	{
		// if(this.isUpdate)
		// {
			// this.model.Roles=[];
		// }

		let length = this.ErrorList.length;
		for(let i=0; i< length;i++)
		{
			this.ErrorList.pop();
		}
			
		 debugger;
		if(this.model.TransFlowEndDate != '')
		{
		if(new Date(this.model.TransFlowEndDate) < new Date(this.model.TransFlowStartDate))
		{
		  
		  this.ErrorList.push("End Date can not before start date");	  
		}
		}
		  
	   if(this.model.TransFlowEndDate != '')
		{
			if(new Date(this.model.TransFlowEndDate) <= new Date((new Date()).getTime() + (60*60*24*1000)))
			{
			 this.ErrorList.push("End Date can not be before next day of  current date.");	  
			}
		}
	}

  ngOnInit() {
	  debugger;
	  this.tagID=localStorage.getItem('tagID');
	  if(this.tagID == 'O')
	  {
		  this.orgnID = JSON.parse(this.authService.getLoginUser()).Orgn_ID;
		  this.model.OrganizationID = this.orgnID.toString();		  
	  }
	  	  
	  this.authService.getMaxOrgnTranMapID().subscribe(data => {
		  if(data.length > 0)
		  {
		  this.model.TransMapID = data[0].Tran_Map_ID;
		  }
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	  
	  // Get all organization
	  this.authService.GetOrganizationsWithRoles().subscribe(data => {
		  if(data.length > 0)
		  {
		   for(let i=0; i< data.length; i++)
		   {
            //this.Organizations.push(data[i]);
			debugger;
			this.OrganizationsWithRoles.push({Orgn_ID: data[i].Orgn_ID,  OrgnName:data[i].OrgnName, RoleList:data[i].Roles_Info});
		   }
		   
		   if(this.tagID == 'O')
			{
		   this.model.OrganizationName = this.OrganizationsWithRoles.filter(x=>x.Orgn_ID == this.orgnID)[0].OrgnName;
			}
		  }
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
	
	if(this.tagID == 'O')
				{
				this.onChange(this.orgnID);
				}
				
	// Load roles
	// this.authService.getOrganizationRoles().subscribe(data => {
		   // for(let i=0; i< data.length; i++)
			   // if(data.length > 0)
			   // {
				// this.OrganizationRolesWithOrganization.push(data[i]);
				// if(this.tagID == 'O')
				// {
				// this.onChange(this.orgnID);
				// }
			   // }
    // },
    // //observable also returns error
    // err => {
      // console.log(err);
      // return false;
    // });
	
	// Load event types
	this.authService.getAllTranscationType().subscribe(data => {
		if(data.length > 0)
		{
		   for(let i=0; i< data.length; i++)
		   {
			this.TranscationTypeList.push(data[i]);
		   }
		   
		this.TranscationTypeList.find(x=> x.Tran_Type_ID == 1).Tran_Type_Name = "Employee Registration Approval";
		}
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
  
  isButtonDisabled() {
	  //debugger;
         
		if(this.isRolesDisabled)
			{
		   return true;		 
			}
		else 
			{
			return false;
			}		   
  }
  
  ViewSavedTransactionFlow(tranMapID)
  {
	  debugger;
	  this.model.Roles=[];
	this.authService.getOrgnTranscationMapDetailByTranMapID(parseInt(tranMapID)).subscribe(data => {
		
		   if(data.length > 0)
					{
						this.isRolesDisabled = true;
						//this.model.TransMapID = data.TransMapArray[0].Tran_Map_ID;
						for(let i=0; i< data.length; i++)
						{
							//this.isUpdate = true;
							this.model.Roles.push({RoleID:data[i].Role_ID,Priority:data[i].Priority});
						}
						
						this.model.TransFlowStartDate = this.SavedTransData.filter(x=> x.Tran_Map_ID == tranMapID)[0].Tran_Flow_Start_DT;
						this.model.TransFlowEndDate = this.SavedTransData.filter(x=> x.Tran_Map_ID == tranMapID)[0].Tran_Flow_End_DT;
						this.toastr.info("Please have a look on saved transaction", 'Saved transaction!');
					}else
					{
						//this.model.TransFlowStartDate = data.UnivTranscationTypeDetail[0].Tran_Flow_End_DT;
						//this.model.TransFlowStartDate = new Date((new Date(data.UnivTranscationTypeDetail[0].Tran_Flow_End_DT)).getTime() + (60*60*24*1000)).toString();;
						//this.isUpdate = false;
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
	  debugger
	  
	  
	  let levelNo = this.model.NoOfLevel;
	  if(levelNo == 0)
	  {
		  levelNo=1;
	  }
  
	  for(let i=0; i< levelNo;i++)
	  {
		  let length = this.model.Roles.length+1;
		  let organizationRole:OrganizationRole;
		  this.organizationRole = { Priority:length, RoleID:0};
	  this.model.Roles.push(this.organizationRole);
	  
	  
	   console.log(this.OrganizationRoles);
	  }
	  
	  //this.model.Roles.sort(x=>x.RoleID);
		  
	  
	  debugger;
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
	{	
	debugger;
    let length = this.ErrorList.length;
	for(let i=0; i< length;i++)
	{
		this.ErrorList.pop();
	}
	
	if(this.model.OrganizationID == "0")
	{
		this.ErrorList.push("Organization ID is required.");
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

	onReset()
	{
		this.isRolesDisabled = false;
		this.SavedTransData = [];
		this.model.Roles = [];
		this.model.TransFlowStartDate='';
		this.model.TransFlowEndDate = '';
		this.model.TransTypeID='0';
	}

  onSubmit(){
	  debugger;
	  if(!this.checkValidation())
	  {
		  return false;
	  }
  else {
	  
	  
	  
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
    this.authService.AddOrgnTranscationTypeDetail(this.model).subscribe(data => {
		debugger;
      if(data.success){
		  this.SuccessMessage = "New Transcation type added by admin. Click + button to add more.";
		  this.toastr.success(this.SuccessMessage, 'Success!');
		  this.Organizations = [
	  {Orgn_ID: 0,  OrgnName:"Please select"}
         
     ];

	 this.OrganizationsWithRoles = [
	  {Orgn_ID: 0,  OrgnName:"Please select", RoleList:[]}
         
     ];
	 
	this.TranscationTypeList = [
	  {Tran_Type_ID: 0,  Tran_Type_Name:"Please select"}
         
     ];
	this.OrganizationRoles = [
	  
         
     ];
	 this.OrganizationRolesWithOrganization = [
	   {Orgn_RoleID: 0,  Orgn_RoleName:"Please select", Orgn_ID:""}
         
     ];
	 this.EventTypes = [
      {EventTypeID: 0,  EventTypeName:"Please select"}    
     ]; 
	 
	 this.model.TransMask=[];
	 this.model.TransMap=[];
	 //this.model.Roles=[];
	 // this. model={  	
    // UniversityID:'0',  
    // TransTypeID:'0',
	// NoOfLevel:1,
	// TransMapID:'',	
    // Roles:[],
	// TransMask:[],
	// TransMap:[],
	// UniversityName:'',
	// TransFlowStartDate:'',
	// TransFlowEndDate:'',
	// Created_On:new Date(),
	// Created_by:'',
	// Modified_On:'',
	// Modified_by:''
	
     	// };
	 this.ngOnInit();
	 if(this.tagID == 'C')
	 {
	 this.onChange(this.model.OrganizationID);
	 }
      } else {
        //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/EventInfo']);
      }
    });
  }

  }

}
