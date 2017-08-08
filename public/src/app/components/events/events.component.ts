import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service'
import {Router, ActivatedRoute, Params} from '@angular/router';
import {EventModel} from '../../model/eventsModel';
import { UniversityTransEventApproval } from './UniversityTransEventApproval';
import { OrganizationTransEventApproval } from './OrganizationTransEventApproval';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import {Observable} from 'rxjs/Rx';
import { Ng2SmartTableModule, LocalDataSource  } from 'ng2-smart-table';




@Component({
  selector: 'app-home',
  templateUrl: './eventsDetails.component.html',
  styleUrls: ['./events.component.scss'],
  providers : [EventModel]
})
export class EventsComponent implements OnInit {
	
	public SuccessMessage='';
	public DangerMessage='';
	source: LocalDataSource; 
	
	// region ng2-smart-table
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
    Email_ID: {
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
	
	// End here
	
  // Invite init
  public organizations = [
	  
         
     ];

	  optionsModel: number[] = [8, 2];
 public selectedTexts: any[] = [21,22];

// // Settings configuration


// // Labels / Parents
 myOptions: IMultiSelectOption[] = [
     // { id: 1, name: 'Car brands', isLabel: true },
     
     
    
 ];


 mySettings: IMultiSelectSettings = {
     enableSearch: true,
     checkedStyle: 'fontawesome',
     buttonClasses: 'btn btn-block',
     dynamicTitleMaxItems: 3,
     displayAllSelectedText: true,
	 showCheckAll:true,
	 showUncheckAll:true
 };

// // Text configuration
 myTexts: IMultiSelectTexts = {
     checkAll: 'Select all',
     uncheckAll: 'Unselect all',
     checked: 'item selected',
     checkedPlural: 'items selected',
     searchPlaceholder: 'Organization Name',
     defaultTitle: 'Select Organizations',
    allSelected: 'All selected',
};

 myUnivTexts: IMultiSelectTexts = {
     checkAll: 'Select all',
     uncheckAll: 'Unselect all',
     checked: 'item selected',
     checkedPlural: 'items selected',
     searchPlaceholder: 'University Name',
     defaultTitle: 'Select University',
    allSelected: 'All selected',
};

myUnivOptions: IMultiSelectOption[] = [
     // { id: 1, name: 'Car brands', isLabel: true },
     
     
    
 ];
  
  eventDetails  =new EventModel();
  public eventRuleArray:Object;
  public eventPrizeArray :Object;
  public eventOrganizerArray :Object;
  public eventOrganizationArray:Object;
  public eventUniversityArray:Object;
  tagID:String;
  eventid:String;
  orgOrUnivLabel:String;
  Comments:string;
  univID:Number;
  StudentID:String;
  orgnID:Number;
  employeeID:String;
  totalPeopleJoined:number;
  isJoinBtnDisabled:boolean=false;
  Students=[{Student_Name:"",Email_ID:"", Address:"", Mobile_No:""}];
  
  EventStudent=[{EventID:"",StudentID:""}];
  EventEmployee=[{EventID:"",EmployeeID:""}];
   public dayDiff : number;
   public dayHours : number;
   public dayMin : number;
   public daySecond : number;
   TransApprovalMapping:UniversityTransEventApproval[]=[];
   OrgnTransApprovalMapping:OrganizationTransEventApproval[]=[];
   public Organizations = [
	  {id: 0,  name:"Please select",title:"", address:"",overview:""},
      
     ];
	public Universities = [
	  {id: 0,  name:"Please select", address:"",ContactNo:"",Email:""},
      
     ];
	 
	 model={  	
    
	Organizations:[],
	Universities:[],
	eventID:''
	
     	};

  constructor(
   private validateService: ValidateService,  
   private authService:AuthService,
   private router: Router,
   private activatedRoute:ActivatedRoute,
	public toastr: ToastsManager, public vcr: ViewContainerRef
	)
	{
	
this.toastr.setRootViewContainerRef(vcr);
		}
	

	
  onOrganizationChange(items) {
	debugger;
       this.model.Organizations = items;
    }
	
onUniversityChange(items) {
	debugger;
       this.model.Universities = items;
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
      field: 'Email_ID',
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
	
ngOnInit() 
{	
      // Invite on init
	  // Get all organization
	  
	  this.loadScript('assets/plugins/waves.min.js'); 
	  
	  debugger;
	  this.authService.getOrganizations().subscribe(data => {
		   for(let i=0; i< data.length; i++)
      this.myOptions.push({id:data[i].Orgn_ID, name:data[i].OrgnName});
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
 
	this.authService.getAllUniversity().subscribe(data => {
		   for(let i=0; i< data.length; i++)
		   {
      this.myUnivOptions.push({id:data[i].Univ_ID, name:data[i].Univ_Name});
		   
		   }		   
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	
	  this.tagID=localStorage.getItem('tagID');
	  if(this.tagID == 'S' || this.tagID == 'C')
	  {
		  this.orgOrUnivLabel = "University";
	  }else if(this.tagID == 'O')
	  {
		  this.orgOrUnivLabel = "Organization";
	  }
	  
	  if(this.tagID == 'S')
	  {
	   this.univID = JSON.parse(this.authService.getLoginUser()).Univ_ID;
	   this.StudentID = JSON.parse(this.authService.getLoginUser()).Student_ID
	   this.LoadTransMapping();  
	  }else if(this.tagID == 'OR')
	  {
		  this.orgnID = JSON.parse(this.authService.getLoginUser()).Orgn_ID;
		  this.employeeID = JSON.parse(this.authService.getLoginUser()).id;
		  this.LoadOrgnTransMapping();  
	  }
	
	 let eventID
	 this.activatedRoute.params.subscribe((params: Params) => {
         eventID = params['id'];
       
      });
	  
	  this.eventid  = eventID;
 this.authService.getEventsById(eventID).subscribe(event => {
	 debugger;
this.dayTimeDiff(event.EventRegisterEndDt);
this.eventDetails=event;

    },	
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
  
   this.authService.GetEventRuleByEventID(eventID).subscribe(Rule => {
	debugger;
	this.eventRuleArray=Rule;
},  err => {
      console.log(err);
      return false;
    });
this.authService.GetEventPrizeByEventID(eventID).subscribe(prize => {
	debugger;
	this.eventPrizeArray=prize;
},  err => {
      console.log(err);
      return false;
    });

this.authService.GetEventOrganizerByEventID(eventID).subscribe(organizer => {
	debugger;
	this.eventOrganizerArray=organizer;
},  err => {
      console.log(err);
      return false;
    });	
	
	this.authService.GetEventOrganizationByEventID(eventID).subscribe(organization => {
	debugger;
	this.eventOrganizationArray=organization;
	for(let i=0; i<organization.length; i++)
	{
		this.model.Organizations.push(parseInt(this.eventOrganizationArray[i].OrgnID));
	}
},  err => {
      console.log(err);
      return false;
    });
	
	this.authService.GetEventUniversityByEventID(eventID).subscribe(university => {
	debugger;
	this.eventUniversityArray=university;
	for(let i=0; i<university.length; i++)
	{
		this.model.Universities.push(parseInt(this.eventUniversityArray[i].Univ_ID));
	}
},  err => {
      console.log(err);
      return false;
    });

	// Get all organization
	  this.authService.getOrganizations().subscribe(data => {
		   for(let i=0; i< data.length; i++)
      this.Organizations.push({id:data[i].Orgn_ID, name:data[i].OrgnName,title:data[i].Title, address:data[i].Address, overview:data[i].Overview});
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });	
	
	// Get all university
	  this.authService.getUniversity().subscribe(data => {
		   for(let i=0; i< data.length; i++)
      this.Universities.push({id:data[i].Univ_ID, name:data[i].Univ_Name,address:data[i].Address,Email:data[i].EmailID, ContactNo:data[i].ContactNo});
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });	
	
	
	this.checkJoinButtonDisabled();
	this.GetPeopleJoined();
	
	Observable.interval(1).subscribe(x => {
    this.dayTimeDiff(this.eventDetails.EventRegisterEndDt);
  });

  }
  
  GetPeopleJoined()
  {
	 
	  this.authService.GetApprovedEventStudentByEventID(this.eventid).subscribe(data => {
		   if(data.length > 0)
		   {
			this.totalPeopleJoined = data.length;	
			this.Students.pop();
             for(let i=0; i< data.length;i++)
			 {
				 this.GetStudent(data[i].Student_ID);
			 }	

			  debugger;
             			 
		   }else{
			   this.totalPeopleJoined =0;
		   }
		},
		//observable also returns error
		err => {
		console.log(err);
		return false;
		});
  }
  
  checkJoinButtonDisabled()
  {
	  debugger;
	  let isDisabled = false;
	  if(this.tagID == 'S')
	  {
	  this.authService.GetEventStudentByEventIDAndStudentID(this.eventid, this.StudentID).subscribe(data => {
		   if(data.length > 0)
		   {
		    this.isJoinBtnDisabled = true;
		   }
		},
		//observable also returns error
		err => {
		console.log(err);
		return false;
		});
	  }else if(this.tagID == 'OR')
	  {
		this.authService.GetEventEmployeeByEventIDAndEmployeeID(this.eventid, this.employeeID).subscribe(data => {
		   if(data.length > 0)
		   {
		    this.isJoinBtnDisabled = true;
		   }
		},
		//observable also returns error
		err => {
		console.log(err);
		return false;
		});
	  }
		
		
  }
  
  public loadScript(url) {
    console.log('preparing to load...')
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
 }
  
  onEventInviteSubmit(){
	  debugger;
	  if(this.model.Organizations.length == 0 && this.model.Universities.length == 0)
	  {
		  this.DangerMessage="Please select any organization or university to invite.";
		  return;
	  }else
	  {
		  this.DangerMessage ='';
	  }
	  
	  
  	this.model.eventID = this.eventid.toString();
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
    this.authService.registerEventInvite(this.model).subscribe(data => {
		debugger;
      if(data.success){
		  this.model.Organizations =[];
		  this.model.Universities=[]; 
		  this.SuccessMessage = "Selected universities and organizations successfully invited."
		  this.toastr.success(this.SuccessMessage , 'Success!');
		  
		  this.authService.GetEventOrganizationByEventID(this.model.eventID).subscribe(organization => {
			debugger;
			this.eventOrganizationArray=organization;
			for(let i=0; i<organization.length; i++)
			{
				this.model.Organizations.push(parseInt(this.eventOrganizationArray[i].OrgnID));
			}
			},  err => {
			  console.log(err);
			  return false;
			});
			
			this.authService.GetEventUniversityByEventID(this.model.eventID).subscribe(university => {
			debugger;
			this.eventUniversityArray=university;
			for(let i=0; i<university.length; i++)
			{
				this.model.Universities.push(parseInt(this.eventUniversityArray[i].Univ_ID));
			}
			},  err => {
			  console.log(err);
			  return false;
			});
		  
       // this.flashMessage.show('univer has been registered', {cssClass: 'alert-success', timeout: 3000});
        //this.router.navigate(['/universitydashboard']);
      } else {
        //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        //this.router.navigate(['/EventInfo']);
      }
    });

  }
  
  LoadTransMapping()
  {
	  debugger;
	  this.TransApprovalMapping=[];
	   let TransApprovalID="ReqEA-1";
	   let transApprovalIDNumber=1;
	   let transDt='';
	   this.authService.getMaxTranEventApprovalID().subscribe(data => {
		   if(data.length > 0)
		   {
		    TransApprovalID = "ReqEA-" +(parseInt(((data[0].Tran_Approval_ID).split('-')[1])) +1).toString();
		   }
		},
		//observable also returns error
		err => {
		console.log(err);
		return false;
		});
		
		this.authService.getMaxTranEventApprovalNumberID().subscribe(data => {
		   if(data.length > 0)
		   {
		    transApprovalIDNumber = data[0].Tran_Approval_IDNumber + 1;
		   }
		},
		//observable also returns error
		err => {
		console.log(err);
		return false;
		});
		
		this.authService.getUnivTranscationTypeDetailByUnivIDAndTransTypeAndCurrentDate(this.univID, 2).subscribe(data => {
					if(data.length > 0)
					{
						for(let i=0; i< data.length; i++)
						{							
							 this.TransApprovalMapping.push({TransMapID : data[i].Tran_Map_ID, NextApproverRoleID:data[i].Role_ID, PrevApproverRoleID:0,
							 Priority:data[i].Priority,MaskID:Math.pow(2, data[i].Priority), Status:0, EventID: this.eventid,
							 UniversityID:this.univID, TransApprovalID:TransApprovalID, TransDt:transDt, StudentID:this.StudentID, TransApprovalIDNumber:transApprovalIDNumber});
						}
					}
			},
				//observable also returns error
					err => {
					console.log(err);
					return false;
				});		
			
  }
  
  LoadOrgnTransMapping()
  {
	  debugger;
	  this.OrgnTransApprovalMapping=[];
	   let TransApprovalID="ReqEA-1";
	   let transApprovalIDNumber=1;
	   let transDt='';
	   this.authService.getMaxTranOrgnEventApprovalID().subscribe(data => {
		   if(data.length > 0)
		   {
		    TransApprovalID = "ReqEA-" +(parseInt(((data[0].Tran_Approval_ID).split('-')[1])) +1).toString();
		   }
		},
		//observable also returns error
		err => {
		console.log(err);
		return false;
		});
		
		this.authService.getMaxTranOrgnEventApprovalNumberID().subscribe(data => {
		   if(data.length > 0)
		   {
		    transApprovalIDNumber = data[0].Tran_Approval_IDNumber + 1;
		   }
		},
		//observable also returns error
		err => {
		console.log(err);
		return false;
		});
		
		this.authService.getOrgnTranscationTypeDetailByOrgnIDAndTransTypeAndCurrentDate(this.orgnID, 2).subscribe(data => {
					if(data.length > 0)
					{
						for(let i=0; i< data.length; i++)
						{							
							 this.OrgnTransApprovalMapping.push({TransMapID : data[i].Tran_Map_ID, NextApproverRoleID:data[i].Role_ID, PrevApproverRoleID:0,
							 Priority:data[i].Priority,MaskID:Math.pow(2, data[i].Priority), Status:0, EventID: this.eventid,
							 OrganizationID:this.orgnID, TransApprovalID:TransApprovalID, TransDt:transDt, EmployeeID:this.employeeID, TransApprovalIDNumber:transApprovalIDNumber});
						}
					}
			},
				//observable also returns error
					err => {
					console.log(err);
					return false;
				});		
			
  }
  
  clearComments()
  {
	  this.Comments='';
  }
  
  approveEvent()
  {	
	var  model=
	  {
         _id: '',
		 comments:''
      }
	  model._id=this.eventid.toString();
	  model.comments = this.Comments;
	  debugger;
	  this.authService.approveEvent(model).subscribe(event => {
		  if(event.success)
		  {
			  document.getElementById('close').click();
			  this.authService.SetActionResult('A');
			  this.router.navigate(['/']);
			  
		  }
	  });
  }
  
  rejectEvent()
  {	
	var  model=
	  {
         _id: '' ,
		 comments:''
      }
	  model._id = this.eventid.toString();
	  model.comments = this.Comments;
	  debugger;
	  this.authService.rejectEvent(model).subscribe(event => {
		  if(event.success)
		  {
			  document.getElementById('close2').click();
			  this.authService.SetActionResult('R');
			  this.router.navigate(['/']);
		  }
	  });
  }
  
  isDisabled()
  {
	  if(this.tagID == 'S')
	  {
		  return true;
	  }else {
		  return false;
	  }
  }
  
  GetStudent(studentId)
  {
	  debugger;
	  this.authService.getStudentInfoByStudentID(studentId).subscribe(data1 => {
		    // for(let i=0; i< data.length; i++)
				
       this.Students.push({Student_Name: data1.Student_Name ,Email_ID: data1.username, Address:data1.Address, Mobile_No:data1.Mobile_No});
	   this.data = this.Students;
	   this.source = new LocalDataSource(this.data);
		   
       },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	
  }
  
  onJoinEvent(event)
  {
	  this.isJoinBtnDisabled = true;
	  event.target.disabled = true;
	  debugger;
	  if(this.tagID == 'S')
	  {
	  this.EventStudent.pop();
	  this.EventStudent.push({EventID:this.eventid.toString(), StudentID:this.StudentID.toString()});
	  this.authService.addUniversityTransEventApprovalDetail(this.TransApprovalMapping).subscribe(data => {
		debugger;
      // if(data.success){
        // //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        // //this.router.navigate(['/login']);
      // } else {
        // //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        // //this.router.navigate(['/register']);
      // }
	  });
	   
	
		this.authService.addIntoEventStudent(this.EventStudent[0]).subscribe(data => {
			debugger;
		if(data.success){
			this.toastr.success("You have been successfully invited. Please wait for the approval by university." , 'Success!');
		}
		// else {
		// //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        // //this.router.navigate(['/register']);
		// }
		});
	  }else if(this.tagID == 'OR')
	  {
	  this.EventEmployee.pop();
	  this.EventEmployee.push({EventID:this.eventid.toString(), EmployeeID:this.employeeID.toString()});
	  this.authService.addOrganizationTransEventApprovalDetail(this.OrgnTransApprovalMapping).subscribe(data => {
		debugger;
      // if(data.success){
        // //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        // //this.router.navigate(['/login']);
      // } else {
        // //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        // //this.router.navigate(['/register']);
      // }
	  });
	   
	
		this.authService.addIntoEventEmployee(this.EventEmployee[0]).subscribe(data => {
			debugger;
		if(data.success){
			this.toastr.success("You have been successfully invited. Please wait for the approval by organization." , 'Success!');
		}
		// else {
		// //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        // //this.router.navigate(['/register']);
		// }
		});
	  }
  }
  
  onPopupClick()
  {
	  debugger;
	  //document.getElementById('OrganizationModal').modal()
	  //$("#myModal").modal();
	  return false;
  }
  
  GetUnivName(univID)
  {
	  
	return this.Universities.find(x=>x.id == univID).name;
  }
  
  GetUnivAddress(univID)
  {
	  
	return this.Universities.find(x=>x.id == univID).address;
  }
  
  GetUnivContact(univID)
  {
	  
	return this.Universities.find(x=>x.id == univID).ContactNo;
  }
  
  GetName(orgnID)
  {
	  
return this.Organizations.find(x=>x.id == orgnID).name;
  }
  
  GetTitle(orgnID)
  {
	  
return this.Organizations.find(x=>x.id == orgnID).title;
  }
  
  GetOverview(orgnID)
  {
	  
return this.Organizations.find(x=>x.id == orgnID).overview;
  }
  
  GetAddress(orgnID)
  {
//return this.Organizations.find(x=>x.id == orgn_ID).address  +"," + this.Organizations.find(x=>x.id == orgn_ID).state +"," + this.Organizations.find(x=>x.id == orgn_ID).country;
  }
  
  GetOrganizationLogo(orgnID)
  {
	  //return this.Organizations.find(x=>x.id == orgnID).logo +".png";
  }
  
  ActiveTab(tab)
  {
                  //document.getElementsByClassName('nav')[0].childNodes;
                  //console.log(document.getElementsByClassName('nav')[0].childNodes);
                  document.getElementsByClassName(tab)[0].className='active';
                  
  }
  dayTimeDiff(format)
  {         
  
	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	var firstDate = new Date();
	var secondDate = new Date(format);
    
	// this.dayDiff = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
	// this.dayHours = Math.floor(secondDate.getHours() - firstDate.getHours());
	// this.dayMin = Math.floor(secondDate.getMinutes() - firstDate.getMinutes());
	// this.daySecond = Math.floor(secondDate.getSeconds() - firstDate.getSeconds());
	
	// var diffMs = (secondDate.getTime() - firstDate.getTime()); // milliseconds between now & Christmas
	// this.dayDiff = Math.floor(diffMs / 86400000); // days
	// this.dayHours = Math.floor((diffMs % 86400000) / 3600000); // hours
	// this.dayMin = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes	
	// this.daySecond = Math.round((((diffMs % 86400000) % 3600000) % 3600000) / 360000); // minutes	
	//this.daySecond = Math.round((diffMs )/1000); // second
	var diffMs = (secondDate.getTime() - firstDate.getTime()); // milliseconds between now & Christmas
	this.dayDiff = Math.floor(diffMs / 86400000); // days
	

	this.dayHours = Math.floor(Math.abs(diffMs) / (1000 * 60 * 60) % 24); // hours
	
	//Math.floor(Math.abs(diffMs) / (1000 * 60) % 60);

	this.dayMin = Math.floor(Math.abs(diffMs) / (1000 * 60) % 60); // minutes	
	
	this.daySecond = Math.floor(Math.abs(diffMs) / (1000) % 60); 
  }
}
