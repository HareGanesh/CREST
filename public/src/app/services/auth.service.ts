import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
	authToken: any;
	student: any;
	studentID:String; 

  constructor(private http:Http) { }
//connect to backend
  registerStudent(student){
  	let headers = new Headers();
  	headers.append('Content-Type','application/json');

    //students/register is temporary domain
  	return this.http.post('http://localhost:3777/students/register', student,{headers: headers})
  	.map(res => res.json());
  }


 authenticateStudent(student){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3777/students/authenticate', student,{headers: headers})
    .map(res => res.json());
  }

  //get the profile--will get unauthorized if the token is not sent
  getProfile(){
	  debugger
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3777/students/profile',{headers: headers})
    .map(res => res.json());

  }

  storeStudentData(token, student){
	  //let student_id String;
	  debugger;
	  this.studentID= student.id; 
    localStorage.setItem('id_token',token); //JWT look directly for this in local storage
    //localStorage.setItem('http://localhost:3777/student',JSON.stringify(student));
    this.authToken = token;	
    this.student = student;
	localStorage.setItem('currentUser', JSON.stringify(student)); 
  }


  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
	
  }
  
  getStudent()
  {
	  return localStorage.getItem('currentUser');
  }


  login(){
	  //debugger;
	 
    const token = localStorage.getItem('id_token');
	const user = localStorage.getItem('currentUser');
	this.authToken= token;
	this.student= user; 
	if(this.authToken != null || this.student != null)
	{
		return true;
	}else 
	{
		return false;
	}
  }


  logout(){
	  debugger;	
    this.authToken = null;
    this.student = null;
    localStorage.clear();
	localStorage.removeItem('id_token');
	localStorage.removeItem('currentUser');

	
  }
  
  registerEvent(event){
  	let headers = new Headers();
  	headers.append('Content-Type','application/json');

	
    //event/register is temporary domain
  	return this.http.post('http://localhost:3777/events/AddEvent', event,{headers: headers})
  	.map(res => res.json());
  }
  
  getCategories()
  {
	  debugger;
	  return this.http.get('http://localhost:3777/CategoryMstr/getAllCategory')
  	.map(res => res.json());
  }
  
  getSubCategories()
  {
	  debugger;
	  return this.http.get('http://localhost:3777/SubCategoryMstr/getAllSubCategory')
  	.map(res => res.json());
  }
  
  getEventTypes()
  {
	  debugger;
	  return this.http.get('http://localhost:3777/EventTypeMaster/getAllEventTypeMaster')
  	.map(res => res.json());
  }
  getEvents(){
	return this.http.get('http://localhost:3777/Events/getAllEvent')
                .map(res => res.json());
} 

getEventsById(id){
	debugger;
	
	let headers = new Headers();
  	headers.append('id',id);
	return this.http.get('http://localhost:3777/Events/getEventById',{headers: headers})
                .map(res => res.json());
}

GetEventRuleByEventID(id){
	console.log(id);
	let headers = new Headers();
  	headers.append('EventID',id);
	return this.http.get('http://localhost:3777/EventRule/GetEventRuleByEventID',{headers: headers})
                .map(res => res.json());
}  
 
 GetEventPrizeByEventID(id){
	
	let headers = new Headers();
  	headers.append('EventID',id);
	return this.http.get('http://localhost:3777/EventPrize/GetEventPrizeByEventID',{headers: headers})
                .map(res => res.json());
}

GetEventOrganizerByEventID(id){
	
	let headers = new Headers();
  	headers.append('EventID',id);
	return this.http.get('http://localhost:3777/EventOrganizer/GetEventOrganizerByEventID',{headers: headers})
                .map(res => res.json());
}  

GetEventOrganizationByEventID(id){
	
	let headers = new Headers();
  	headers.append('EventID',id);
	return this.http.get('http://localhost:3777/EventOrganization/GetEventOrganizationByEventID',{headers: headers})
                .map(res => res.json());
}  

getOrganizations()
  {
	  debugger;
	  return this.http.get('http://localhost:3777/OrganizationMstr/getAllOrganization')
  	.map(res => res.json());
  }


updateProfile(student){
                  debugger;
                let headers = new Headers();
                headers.append('Content-Type','application/json');

    //students/update is temporary domain
                return this.http.post('http://localhost:3777/students/update', student,{headers: headers})
                .map(res => res.json());
  }

   getStudentByID(id)
  {
	  debugger;
                  console.log(id);
let headers = new Headers();
                headers.append('id',id);
                return this.http.get('http://localhost:3777/students/getStudentByID',{headers: headers})
                .map(res => res.json());
  }
  
    addStudentCategory(studentCategroy){
                let headers = new Headers();
                headers.append('Content-Type','application/json');
   // headers.append('id',id);   
                
    //event/register is temporary domain
                return this.http.post('http://localhost:3777/StudentCategory/addStudentCategory', studentCategroy,{headers: headers})
                .map(res => res.json());
  }
  
  GetEventByOrgID(id){
	debugger;
	let headers = new Headers();
  	headers.append('id',id);
	return this.http.get('http://localhost:3777/EventOrganization/getEventOrganizerByOrgNo',{headers: headers})
                .map(res => res.json());
   }   
  

}
