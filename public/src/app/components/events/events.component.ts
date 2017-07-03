import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service'
import {Router, ActivatedRoute, Params} from '@angular/router';
import {EventModel} from '../../model/eventsModel';
import { UniversityTransEventApproval } from './UniversityTransEventApproval';

@Component({
  selector: 'app-home',
  templateUrl: './eventsDetails.component.html',
  styleUrls: ['./events.component.scss'],
  providers : [EventModel]
})
export class EventsComponent implements OnInit {
  eventDetails  =new EventModel();
  public eventRuleArray:Object;
  public eventPrizeArray :Object;
  public eventOrganizerArray :Object;
  public eventOrganizationArray:Object;
  public eventUniversityArray:Object;
  tagID:String;
  eventid:String;
  orgOrUnivLabel:String;
  univID:Number;
  StudentID:String;
  totalPeopleJoined:number;
  isJoinBtnDisabled:boolean=false;
  Students=[{Student_Name:"",Email_ID:"", Address:"", Mobile_No:""}];
  
  EventStudent=[{EventID:"",StudentID:""}];
   public dayDiff : number;
   public dayHours : number;
   public dayMin : number;
   TransApprovalMapping:UniversityTransEventApproval[]=[];
   public Organizations = [
	  {id: 0,  name:"Please select",title:"", address:"",country:"",overview:"", state:"",logo:""},
      
     ];
	public Universities = [
	  {id: 0,  name:"Please select", address:"",ContactNo:"",Email:""},
      
     ];

  constructor(
   private validateService: ValidateService,  
   private authService:AuthService,
   private router: Router,
   private activatedRoute:ActivatedRoute
  

    ) { }
ngOnInit() 
{	
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
},  err => {
      console.log(err);
      return false;
    });
	
	this.authService.GetEventUniversityByEventID(eventID).subscribe(university => {
	debugger;
	this.eventUniversityArray=university;
},  err => {
      console.log(err);
      return false;
    });

	// Get all organization
	  this.authService.getOrganizations().subscribe(data => {
		   for(let i=0; i< data.length; i++)
      this.Organizations.push({id:data[i].OrgnID, name:data[i].OrgnName,title:data[i].OrgnTitle, address:data[i].OrgnAddress, country:data[i].OrgnCountry,overview:data[i].OrgnOverview,state:data[i].OrgnState,logo:data[i].OrgnLogo});
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
		
		this.authService.getAllTranscationTypeWithRolesAndPriority(this.univID, 2).subscribe(data => {
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
  
  isDisabled()
  {
	  
  }
  
  GetStudent(studentId)
  {
	  debugger;
	  this.authService.getStudentInfoByStudentID(studentId).subscribe(data1 => {
		    // for(let i=0; i< data.length; i++)
				
       this.Students.push({Student_Name: data1.Student_Name ,Email_ID: data1.Email_ID, Address:data1.Address, Mobile_No:data1.Mobile_No});
				
		   
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
      // if(data.success){
        // //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        // //this.router.navigate(['/login']);
      // } else {
        // //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        // //this.router.navigate(['/register']);
      // }
    });
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
return this.Organizations.find(x=>x.id == orgnID).address  +"," + this.Organizations.find(x=>x.id == orgnID).state +"," + this.Organizations.find(x=>x.id == orgnID).country;
  }
  
  GetOrganizationLogo(orgnID)
  {
	  return this.Organizations.find(x=>x.id == orgnID).logo +".png";
  }
  
  ActiveTab(tab)
  {
                  //document.getElementsByClassName('nav')[0].childNodes;
                  //console.log(document.getElementsByClassName('nav')[0].childNodes);
                  document.getElementsByClassName(tab)[0].className='active';
                  console.log(document.getElementsByClassName('RulesTab'));
  }
      dayTimeDiff(format){
                
var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
var firstDate = new Date();
var secondDate = new Date(format);

this.dayDiff = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
this.dayHours = Math.abs(secondDate.getHours() - firstDate.getHours());
this.dayMin = Math.abs(secondDate.getMinutes() - firstDate.getMinutes());
}
}
