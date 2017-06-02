import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service'
import {Router, ActivatedRoute, Params} from '@angular/router';
import {EventModel} from '../../model/eventsModel';

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
   public dayDiff : number;
  public dayHours : number;
  public dayMin : number;
public Organizations = [
	  {id: 0,  name:"Please select",title:"", address:"",country:"",overview:"", state:"",logo:""},
      
     ];

  constructor(
   private validateService: ValidateService,  
   private authService:AuthService,
   private router: Router,
   private activatedRoute:ActivatedRoute
  

    ) { }
ngOnInit() 
{	
	let eventID
	 this.activatedRoute.params.subscribe((params: Params) => {
         eventID = params['id'];
       
      });
	  
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
	
  }
  
  GetName(orgnID)
  {
	  debugger;
return this.Organizations.find(x=>x.id == orgnID).name;
  }
  
  GetTitle(orgnID)
  {
	  debugger;
return this.Organizations.find(x=>x.id == orgnID).title;
  }
  
  GetAddress(orgnID)
  {
	  debugger;
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
