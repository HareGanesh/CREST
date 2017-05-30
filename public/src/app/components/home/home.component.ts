import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss','./custom.min.css']
})
export class HomeComponent implements OnInit {

eventModel:EventModel[];
  
 searchFilter:any;
  constructor(
   private validateService: ValidateService,  
    private authService:AuthService,
    private router: Router



    ) { }
ngOnInit() {
	
	//this.dayDiff('01/01/2039');
	this.bindGrid();
  }
  
  

  bindGrid()
  {
	  	var modelData=[];
    this.authService.getEvents().subscribe(event => {
      modelData= event;
	  for(var i=0;i<modelData.length;i++)
	 {
		  var m =this.dayDiff(modelData[i].StartDt);
		  
		  modelData[i].RemainDay=m;
	 }
	 this.eventModel=modelData;
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
  }
dayDiff(format){
	
	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
var firstDate = new Date();
var secondDate = new Date(format);

var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
return diffDays;
}

public open() {
	
	if(this.searchFilter !=undefined && this.searchFilter !='')
	{
	var modelData=this.eventModel;
	var filterData=[];
	
	  for(var i=0;i<modelData.length;i++)
	 {
		  if(modelData[i].Location.toString().toLowerCase().indexOf(this.searchFilter.toLowerCase())!=-1 || modelData[i].Description.toString().toLowerCase().indexOf(this.searchFilter.toLowerCase())!=-1)
		  {
			  filterData.push(modelData[i]);
		  }
	 }
	 this.eventModel=filterData;
	}
	else
	{
		this.bindGrid();
	}
    //alert(filterData);
  }
  
 

}
export class EventModel
{
EventID:Number  ;
EventTitle:{type: String};
Description:{type: String};
CategoriesMstr:{type: String};
StartDt:{type: Date	};
EndDt:{	type: Date};
EventRegisterEndDt:{type: Date};
EventType:{type: String}
POCRequired:{type: String};
POCDeadLine:{type: String};
Location:{ type: String };
Status:{type: String};
Rules:{type: String }; 
Event_Logo:{type: String};
Published_Tag:{type: String};
Prizes:{type: Number};
Created_On:{type: Date };
Created_by:{type: String};
Modified_On:{type: Date};
Modified_by:{type: String};
RemainDay:{type: String};
}