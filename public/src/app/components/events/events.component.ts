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
  public dayDiff : number;
  public dayHours : number;
  public dayMin : number;
  
  isActive='OverviewTab';
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
       // console.log(eventID);
      });
                  
 this.authService.getEvents().subscribe(event => {

      let eventList = event;
                // this.eventDetails=event;
                  var data = eventList.filter(function (element, index) {

     if(element.EventID === parseInt(eventID))
   {
                  return eventList[index];
   }
});
this.dayTimeDiff(data[0].EventRegisterEndDt)
this.eventDetails=data[0];
    },         
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
  
    
  }
  
  dayTimeDiff(format){
                debugger;
var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
var firstDate = new Date();
var secondDate = new Date(format);

this.dayDiff = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
this.dayHours = Math.abs(secondDate.getHours() - firstDate.getHours());
this.dayMin = Math.abs(secondDate.getMinutes() - firstDate.getMinutes());
}
  ActiveTab(tab)
  {
                  //document.getElementsByClassName('nav')[0].childNodes;
                  //console.log(document.getElementsByClassName('nav')[0].childNodes);
                  document.getElementsByClassName(tab)[0].className='active';
                  console.log(document.getElementsByClassName('RulesTab'));
  }
}
