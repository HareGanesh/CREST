import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
	authToken: any;
	student: any;
	studentID:String; 
	tagID:String;
	university:any;
  constructor(private http:Http) { }
//connect to backend
  registerStudent(student, TransMapping){	 
  	let headers = new Headers();
  	headers.append('Content-Type','application/json');
	if(TransMapping.length > 0)
    student.TransApprovalMapping = (TransMapping.sort(x=>x.Priority))[TransMapping.length-1];	  
    //students/register is temporary domain
  	return this.http.post('http://localhost:3777/students/register', student,{headers: headers})
  	.map(res => res.json());
  }
  
  getMaxTranApprovalID()
  {
	  debugger;
	  return this.http.get('http://localhost:3777/UnivTranscationApprovalDetail/getMaxTransApprovalID')
  	.map(res => res.json());
  }
  
  getMaxTransApprovalHistoryID()
  {
	  debugger;
	  return this.http.get('http://localhost:3777/UnivTranscationApprovalHistory/getMaxTransApprovalHistoryID')
  	.map(res => res.json());
  }
  
  getMaxTranApprovalNumberID()
  {
	  debugger;
	  return this.http.get('http://localhost:3777/UnivTranscationApprovalDetail/getMaxTransApprovalNumberID')
  	.map(res => res.json());
  }
  
  getLoginUser()
  {
	  return localStorage.getItem('currentUser');
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
  
  addUniversityRole(universityRole){
  	let headers = new Headers();
  	headers.append('Content-Type','application/json');

    //students/register is temporary domain
  	return this.http.post('http://localhost:3777/UniversityRoleMstr/AddUniversityRole', universityRole,{headers: headers})
  	.map(res => res.json());
  } 

  storeStudentData(token, user,tagID){
      this.tagID=tagID;
	  debugger;
	  if(tagID=="S")
	  {
	     this.studentID= user.id; 
	     this.student = user;
	  }
    localStorage.setItem('id_token',token); //JWT look directly for this in local storage    
    this.authToken = token;	
    localStorage.setItem('tagID',tagID);
	localStorage.setItem('currentUser', JSON.stringify(user)); 
  }


  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
	
  }
  
  getStudent()
  {
	  return localStorage.getItem('currentUser');
  }
    
  getUserByEmail(student)
  {
	  debugger;
	  let headers = new Headers();
  	headers.append('emailid',student.Email_ID);
	console.log(student.Email_ID);
	return this.http.get('http://localhost:3777/UserLogin/getUserByEmail',{headers: headers})
                .map(res => res.json());
  }
  
  getUserByUserName(student)
  {
	  let headers = new Headers();
  	headers.append('username',student.username);
	return this.http.get('http://localhost:3777/UserLogin/getUserByUserName',{headers: headers})
                .map(res => res.json());
  } 
  
  
  getStudentByStudentID(student)
  {
	  let headers = new Headers();
  	headers.append('studentid',student.Student_ID);
	return this.http.get('http://localhost:3777/students/getStudentByStudentID',{headers: headers})
                .map(res => res.json());
  }
  
  SetIsApproveByStudentID(Student_ID)
  {
	  let headers = new Headers();
  	headers.append('studentid',Student_ID);
	return this.http.get('http://localhost:3777/students/setIsApproved',{headers: headers})
                .map(res => res.json());
  }
  
  getStudentInfoByStudentID(studentID)
  {
	  let headers = new Headers();
  	headers.append('studentid',studentID);
	return this.http.get('http://localhost:3777/students/getStudentByStudentID',{headers: headers})
                .map(res => res.json());
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
  
  getAllStudent()
  {
	  debugger;
	  return this.http.get('http://localhost:3777/students/getAllStudent')
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

GetEventUniversityByEventID(id){
	
	let headers = new Headers();
  	headers.append('EventID',id);
	return this.http.get('http://localhost:3777/EventUniversity/GetEventUniversityByEventID',{headers: headers})
                .map(res => res.json());
}  

getOrganizations()
  {
	  debugger;
	  return this.http.get('http://localhost:3777/OrganizationMstr/getAllOrganization')
  	.map(res => res.json());
  }

  getAllUniversity()
  {
	  debugger;
	  return this.http.get('http://localhost:3777/UniversityMstr/getAllUniversity')
  	.map(res => res.json());
  }
  
  getUniversityRoles()
  {
	  debugger;
	  return this.http.get('http://localhost:3777/UniversityRoleMstr/getAllUniversityRole')
  	.map(res => res.json());
  }
  
  getUniversityRolesByUnivID(univID)
  {
	  debugger;
	  let headers = new Headers();
      headers.append('univid',univID);
	  return this.http.get('http://localhost:3777/UniversityRoleMstr/getAllUniversityRole',{headers: headers})
  	.map(res => res.json());
  }
  
  getAllUniversityRolesByUnivID(univID)
  {
	  debugger;
	  let headers = new Headers();
      headers.append('univid',univID);
	  return this.http.get('http://localhost:3777/UniversityRoleMstr/getUniversityRoleMstrByUnivID',{headers: headers})
  	.map(res => res.json());
  }
  
  approveEvent(event){
                let headers = new Headers();
                headers.append('Content-Type','application/json');

                return this.http.post('http://localhost:3777/events/ApproveEvent', event,{headers: headers})
                .map(res => res.json());
  }
  
  getAllTranscationType()
  {
	  debugger;
	  return this.http.get('http://localhost:3777/TranscationTypeMstr/getAllTranscationType')
  	.map(res => res.json());
  }
  
  getAllTranscationTypeWithRolesAndPriority(univid, trantypeid)
  {
	  debugger;
	  let headers = new Headers();
      headers.append('univid',univid);
	  headers.append('transcationtypeid',trantypeid);
	  return this.http.get('http://localhost:3777/UnivTranscationTypeDetail/GetUnivTranscationTypeDetailByUnivIDAndTransType',{headers: headers})
  	.map(res => res.json());
  }
  
  getMaxTranMapID()
  {
	  debugger;
	  return this.http.get('http://localhost:3777/UnivTranscationTypeDetail/getMaxTransMapID')
  	.map(res => res.json());
  }
  
  AddUnivTranscationTypeDetail(UniversityTranscation){
  	let headers = new Headers();
  	headers.append('Content-Type','application/json');

	
    //UniversityTranscation/register is temporary domain
  	return this.http.post('http://localhost:3777/UnivTranscationTypeDetail/AddUnivTranscationTypeDetail', UniversityTranscation,{headers: headers})
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
   
   GetEventByUnivID(id){
	debugger;
	let headers = new Headers();
  	headers.append('id',id);
	return this.http.get('http://localhost:3777/EventUniversity/getEventUniversityByUnivID',{headers: headers})
                .map(res => res.json());
   }

authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3777/User/authenticate', user,{headers: headers})
    .map(res => res.json());
  }
  
  authenticateEmailAndPwd(user)
  {
	let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3777/UserLogin/authenticateEmailAndPwd', user,{headers: headers})
    .map(res => res.json());
  }
  
  updatePassword(model)
  {
	let headers = new Headers();
    headers.append('Content-Type','application/json');
	model.TagID = localStorage.getItem('tagID');
    return this.http.post('http://localhost:3777/UserLogin/updatePassword', model,{headers: headers})
    .map(res => res.json());
  }
  
  authenticateUniversity(university){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3777/UniversityMstr/authenticateUniversity', university,{headers: headers})
    .map(res => res.json());
  }
  
  authenticateUniversityRoleUser(universityRoleUser){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3777/UniversityRoleUser/authenticateUniversityRole', universityRoleUser,{headers: headers})
    .map(res => res.json());
  }
  
    getUniversity(){
                return this.http.get('http://localhost:3777/UniversityMstr/getAllUniversity')
                .map(res => res.json());
} 
  //connect to backend
  addUniversity(university){
                let headers = new Headers();
                headers.append('Content-Type','application/json');

    //students/register is temporary domain
                return this.http.post('http://localhost:3777/UniversityMstr/register', university,{headers: headers})
                .map(res => res.json());
  }
  
  addUniversityUserRole(universityUserRole){
                let headers = new Headers();
                headers.append('Content-Type','application/json');

    //UniversityRoleUser/register is temporary domain
                return this.http.post('http://localhost:3777/UniversityRoleUser/register', universityUserRole,{headers: headers})
                .map(res => res.json());
  }
  
   updateUniversity(university){
                let headers = new Headers();
                headers.append('Content-Type','application/json');

    //students/register is temporary domain
                return this.http.post('http://localhost:3777/UniversityMstr/updateUniversity', university,{headers: headers})
                .map(res => res.json());
  }
  
  getUniversityById(id){
                debugger;
                let headers = new Headers();
                headers.append('id',id);
                return this.http.get('http://localhost:3777/UniversityMstr/GetUniversityByID',{headers: headers})
                .map(res => res.json());
} 
   deleteUniversity(university){
                let headers = new Headers();
                //headers.append('id',id);
    //students/register is temporary domain
                return this.http.post('http://localhost:3777/UniversityMstr/deleteUniversity',university,{headers: headers})
                .map(res => res.json());
   }
   
   authenticateAppRoleMaster(user){
	 debugger;
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3777/UserLogin/authenticate', user,{headers: headers})
    .map(res => res.json());
   } 
  
  getAllUnivTranscationApprovalDetail(){
                return this.http.get('http://localhost:3777/UnivTranscationApprovalDetail/getAllUnivTranscationApprovalDetail')
                .map(res => res.json());
}

getAllUnivTranscationApprovalDetailByUnivIDAndMaskID(univID, maskID){
				let headers = new Headers();
                headers.append('univid',univID);
				headers.append('maskid',maskID);
                return this.http.get('http://localhost:3777/UnivTranscationApprovalDetail/getAllUnivTranscationApprovalDetailByUnivID',{headers: headers})
                .map(res => res.json());
}

  addUniversityTransApprovalHistory(model, universityTransApprovalHistory, TransApprovalMapping){
                let headers = new Headers();
                headers.append('Content-Type','application/json');
				if(TransApprovalMapping.length > 0)
				model.TransApprovalMapping = (TransApprovalMapping.sort(x=>x.Priority))[TransApprovalMapping.length-1];	
			    model.universityApprovalHistory = universityTransApprovalHistory;
				
				//UnivTranscationApprovalHistory/AddUnivTranscationApprovalHistory is temporary domain
                return this.http.post('http://localhost:3777/UnivTranscationApprovalHistory/AddUnivTranscationApprovalHistory', model,{headers: headers})
                .map(res => res.json());
  }

}
