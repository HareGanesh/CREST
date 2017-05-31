import { Component, OnInit,ChangeDetectorRef,ViewEncapsulation } from '@angular/core';
import {ValidateService} from '../../../services/validate.service';
import {AuthService} from '../../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';

import { Event } from './event';
import { EventRule } from './eventRule';
import { EventPrize } from './eventPrize';
import { EventOrganizer } from './eventOrganizer';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

 import { IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'app-registerevent',
  templateUrl: './registerevent.component.html',
  styleUrls: ['./registerevent.component.scss'],
  encapsulation: ViewEncapsulation.None 

})
export class RegistereventComponent implements OnInit {
	student:Object;
	category:Object;
	
	public organizations = [
	  
         
     ];

	  optionsModel: number[] = [1, 2];
 public selectedTexts: any[] = [];

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
	  
    path='';
	public eventId='';
   public file_srcs: string[] = [];
  public debug_size_before: string[] = [];
  public debug_size_after: string[] = [];
  public ErrorList:string[]=[];
  public eventRule:EventRule;
  public eventRuleArray:EventRule[]=[];
  public eventPrize:EventPrize;
  public eventOrganizer:EventOrganizer;
  //public RulesList:EventRules[]=["1",""];
 
  public selectedCategory:any = null;
public selectedSubCategory:any = null;
public selectedEvent:any = null;
  // postId: number;
  // options: Object = {
    // url: 'http://localhost:10050/upload',
    // params: { 'post_id': this.postId }
  // };
public Categories = [
	  {CategoryID: 0,  CategoryName:"Please select"}
         
     ];
 public SubCategories = [
	  
         
     ];
	 public SubCategoriesWithCategory = [
	  
         
     ];
public EventTypes = [
      {EventTypeID: 0,  EventTypeName:"Please select"}    
     ]; 
  
    EventTitle:String;  
    Description:String;
	CategoriesMstr:String;
	StartDt:Date;
    EndDt:Date;
	EventRegisterEndDt:Date;
    EventType:String;
    POCRequired:String;
    POCDeadLine:String;
    Location:String;
    Status:String;
    Rules:String;
    Event_Logo:String;
    Prizes:Number;
	//public ErrorList:string[]={'a','b'};
	
	
    model={  	
    EventTitle:'',  
    Description:'',
	CategoriesMstr:'0',
	CategoriesSubMstr:'0',
	StartDt:'',
    EndDt:'',
	EventRegisterEndDt:'',
    EventType:'0',
    POCRequired:'No',
    POCDeadLine:'',
    Location:'',
    Status:'Yes',
    //Rules:'',
    Event_Logo:'',
    Prizes:[],
	Rules:[],
	Organizers:[],
	Organizations:[],
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

	
onOrganizationChange(items) {
	debugger;
       this.model.Organizations = items;
    }

  ngOnInit() {
	  debugger;
	  
	  // Get all organization
	  this.authService.getOrganizations().subscribe(data => {
		   for(let i=0; i< data.length; i++)
      this.myOptions.push({id:data[i].OrgnID, name:data[i].OrgnName});
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
 
   

	  // Logged in user
	this.student = JSON.parse(this.authService.getStudent());
       debugger;
	   this.authService.getCategories().subscribe(data => {
		   for(let i=0; i< data.length; i++)
      this.Categories.push(data[i]);
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	
	
	// Load sub categories
	this.authService.getSubCategories().subscribe(data => {
		   for(let i=0; i< data.length; i++)
      this.SubCategoriesWithCategory.push(data[i]);
    },
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	
	// Load event types
	this.authService.getEventTypes().subscribe(data => {
		   for(let i=0; i< data.length; i++)
      this.EventTypes.push(data[i]);
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
	  
	  if(eventID == 0)
	  {
	  this.selectedCategory = 0;
	   this.eventRule = { RuleNo:"1", RuleDescription:""};	  
	   this.model.Rules.push(this.eventRule);
	  
	   this.eventPrize = { PrizeNo:"1", PrizeDescription:""};	  
	   this.model.Prizes.push(this.eventPrize);
	  
	  
	   this.eventOrganizer = { OrganizerNo:"1", OrganizerName:"", OrganizerEmail:"", OrganizerContact:""};	  
	   this.model.Organizers.push(this.eventOrganizer);
	  }else{
	  this.eventId ="eventid";
	  this.authService.getEvents().subscribe(event => {

      let eventList = event;
	// this.eventDetails=event;
	  var data = eventList.filter(function (element, index) {

     if(element.EventID === parseInt(eventID))
		{
   	  return eventList[index];
		}
		});

	this.model=data[0];
	this.file_srcs.push(this.model.Event_Logo);
	
	
    },	
    //observable also returns error
    err => {
      console.log(err);
      return false;
    });
	  }
  }
  
  
  parseDate(dateString: string): Date {
    if (dateString) {
        return new Date(dateString);
    } else {
        return null;
    }
}
  isDisabled() {
	  //debugger;
         if(this.validateService.validateEvent(this.model)){
		    return false;		 
		   }
          else{
		   return true;
	      }
  }
  
  onChange(category) {
	  debugger;
	  
	 this.SubCategories = this.SubCategoriesWithCategory.filter(x=>x.CategoryID ==category);
	 
	
  }
  
  

  
  AddMoreRules()
  {
	  debugger
	  let length = this.model.Rules.length+1;
	  this.eventRule = { RuleNo:length.toString(), RuleDescription:""};
	  
	  this.model.Rules.push(this.eventRule);
  }
  
  RemoveRules()
  {
	  debugger
	 
	  
	  this.model.Rules.pop();
  }
  
  AddMorePrizes()
  {
	  let length = this.model.Prizes.length+1;
	  this.eventPrize = { PrizeNo:length.toString(), PrizeDescription:""};
	  
	  this.model.Prizes.push(this.eventPrize);
  }
  
  RemovePrize()
  {
	  debugger
	 
	  
	  this.model.Prizes.pop();
  }
  
  AddMoreOrganizer()
  {
	  let length = this.model.Organizers.length+1;
	  this.eventOrganizer = { OrganizerNo:length.toString(),  OrganizerName:"", OrganizerEmail:"", OrganizerContact:""};	  
	  this.model.Organizers.push(this.eventOrganizer);
  }
  
  RemoveOrganizer()
  {
	  debugger
	 
	  
	  this.model.Organizers.pop();
  }
  
 compareDates()
{
	debugger;
   if(new Date(this.model.EndDt)<new Date(this.model.StartDt))
   {
      
      this.ErrorList.push("End Date can not before start date");	  
   }
   
   if(new Date(this.model.StartDt)<new Date(this.model.EventRegisterEndDt))
   {
      
	  this.ErrorList.push("Registration End Date can not after start date.");	  
   }
   
   if(new Date(this.model.EndDt)<new Date(this.model.EventRegisterEndDt))
   {
      
	  this.ErrorList.push("Registration End Date can not after event end date.");	  
   }
}
  
 // compareRegistrationDates()
// {
	// debugger;
   // if(new Date(this.model.StartDt)<new Date(this.model.EventRegisterEndDt))
   // {
	   // this.ErrorList.push("Registration End Date can not after start date.");	
   // }
// }
  
  fileChange(input){
	  debugger;
  this.readFiles(input.files);
}
readFile(file, reader, callback){
	debugger;
	this.file_srcs.pop();
  reader.onload = () => {
    callback(reader.result);
    this.model.Event_Logo=reader.result;
    console.log(reader.result);
  }

  reader.readAsDataURL(file);
}
readFiles(files, index=0){
  // Create the file reader
  let reader = new FileReader();
  
  // If there is a file
  if(index in files){
    // Start reading this file
    this.readFile(files[index], reader, (result) =>{
      // Create an img element and add the image file data to it
      var img = document.createElement("img");
      img.src = result;
  
      // Send this img to the resize function (and wait for callback)
      this.resize(img, 250, 250, (resized_jpeg, before, after)=>{
        // For debugging (size in bytes before and after)
        this.debug_size_before.push(before);
        this.debug_size_after.push(after);
  
        // Add the resized jpeg img source to a list for preview
        // This is also the file you want to upload. (either as a
        // base64 string or img.src = resized_jpeg if you prefer a file). 
        this.file_srcs.push(resized_jpeg);
  
        // Read the next file;
        this.readFiles(files, index+1);
      });
    });
  }else{
    // When all files are done This forces a change detection
    this.changeDetectorRef.detectChanges();
  }
}
resize(img, MAX_WIDTH:number, MAX_HEIGHT:number, callback){
  // This will wait until the img is loaded before calling this function
  return img.onload = () => {

    // Get the images current width and height
    var width = img.width;
    var height = img.height;

    // Set the WxH to fit the Max values (but maintain proportions)
    if (width > height) {
        if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
        }
    } else {
        if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
        }
    }

    // create a canvas object
    var canvas = document.createElement("canvas");

    // Set the canvas to the new calculated dimensions
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");  

    ctx.drawImage(img, 0, 0,  width, height); 

    // Get this encoded as a jpeg
    // IMPORTANT: 'jpeg' NOT 'jpg'
    var dataUrl = canvas.toDataURL('image/jpeg');

    // callback with the results
    callback(dataUrl, img.src.length, dataUrl.length);
  };
}


checkValidation()
{	debugger;
    let length = this.ErrorList.length;
	for(let i=0; i< length;i++)
	{
		this.ErrorList.pop();
	}
	
	if(this.model.EventTitle == "")
	{
		this.ErrorList.push("Event title is required");
	}

	if(this.model.Description == "")
	{
		this.ErrorList.push("Event Description is required");
	}
	
	// if(this.file_srcs.length == 0)
	// {
		// this.ErrorList.push("Event Logo is required");
	// }
	
	if(this.model.CategoriesMstr == "")
	{
		this.ErrorList.push("Please select the event category");
	}
	
	if(this.model.EventType == "")
	{
		this.ErrorList.push("Please select the event type");
	}
	
	if(this.model.StartDt == undefined)
	{
		this.ErrorList.push("Event Start Datet is required");
	}
	
	if(this.model.EndDt == "")
	{
		this.ErrorList.push("Event end date is required");
	}
	
	if(this.model.EventRegisterEndDt == "")
	{
		this.ErrorList.push("Event registration date is required");
	}
	
	if(this.model.Location == "")
	{
		this.ErrorList.push("Event location is required");
	}
	
	if(this.model.POCRequired != "" && this.model.POCRequired == "Yes" && this.model.POCDeadLine == "")
	{
		this.ErrorList.push("POC deadline is required");
	}
	
	this.compareDates();
}

OnNextClick(input, count,li1, li2)
{
	debugger;
	this.checkValidation();
	if(this.ErrorList.length !=0)
	{
	return false;
	}
	else {
    li1.className=''
		li2.className ='active';
	if(count == 1)
	{
		
	input.href="#RulesTab";
	}else if(count==2)
	{
		input.href="#PrizesTab"
	}else if(count==3)
	{
		input.href="#OrganizersTab"
	}else if(count==4)
	{
		input.href="#OrganizationsTab"
	}
	debugger;
}
}

OnPrevClick(input, count,li1, li2)
{
	debugger;
	li1.className=''
		li2.className ='active';
		if(count == '5')
	{
	input.href="#OrganizersTab";
	}
	else if(count == '4')
	{
	input.href="#PrizesTab";
	}else if(count=='3')
	{
		input.href="#RulesTab"
	}else if(count=='2')
	{
		input.href="#OverviewTab"
	}
	debugger;
	
}

  onEventSubmit(){
	  debugger;
	  this.submitted = true;
	  
  	this.model.StartDt = new Date(this.model.StartDt).toISOString();
	this.model.EndDt = new Date(this.model.EndDt).toISOString();
	this.model.EventRegisterEndDt = new Date(this.model.EventRegisterEndDt).toISOString();
	
	// Set created and modified properties
	this.model.Created_by = JSON.parse(this.authService.getStudent()).id;
	this.model.Created_On = new Date();
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
    this.authService.registerEvent(this.model).subscribe(data => {
		debugger;
      if(data.success){
        this.flashMessage.show('Event has been registered', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/EventInfo']);
      }
    });

  }

}
