import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/timeout'



@Injectable()
export class AuthService {
	authToken: any;
	student: any;
	studentID:String; 
	tagID:String;
	actionResult:string;
	university:any;
  constructor(private http:Http) { }
//connect to backend

  registerStudent(student, TransMapping){	 
  	let headers = new Headers();
  	headers.append('Content-Type','application/json');
	
	// Commeting this for time being
	//student.Pwd = this.generatePassword();
	student.Pwd = "admin12345";
	student.ConfirmPwd = student.Pwd;
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
  
  generatePassword() 
                {
        var length = 6,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
       retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) 
                                {
           retVal += charset.charAt(Math.floor(Math.random() * n));
        }
    return retVal;
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
  
  addUniversityRole(universityRole, deletedRoleIDList){
  	let headers = new Headers();
  	headers.append('Content-Type','application/json');
    if(deletedRoleIDList.length > 0)
	{
		universityRole.DeletedRoleIDList = deletedRoleIDList;
	}
	
    //students/register is temporary domain
  	return this.http.post('http://localhost:3777/UniversityRoleMstr/AddUniversityRole', universityRole,{headers: headers})
  	.map(res => res.json());
  } 
  
  SetActionResult(actionresult){
      this.actionResult = actionresult;
    localStorage.setItem('actionResult',this.actionResult);
	 
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
	  
	 
    const token = localStorage.getItem('id_token');
	const user = localStorage.getItem('currentUser');
	this.authToken= token;
	this.student= user; 
	if(this.authToken != null || this.student != null )
	{
		if(JSON.parse(this.student).isPasswordChanged || JSON.parse(this.student).TagID == 'C')
		{
		return true;
		}else {
			return false;
		}
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
  
  registerEventInvite(event){
  	let headers = new Headers();
  	headers.append('Content-Type','application/json');

	
    //event/register is temporary domain
  	return this.http.post('http://localhost:3777/events/AddEventInvite', event,{headers: headers})
  	.map(res => res.json());
  }
  
  getAllDegree()
  {
	  debugger;
	  return this.http.get('http://localhost:3777/DegreeMstr/getAllDegree')
  	.map(res => res.json());
  }
  
  getAllGrade()
  {
	  debugger;
	  return this.http.get('http://localhost:3777/GradeMstr/getAllGrade')
  	.map(res => res.json());
  }
  
  getAllSpecialization()
  {
	  debugger;
	  return this.http.get('http://localhost:3777/SpecializationMstr/getAllSpecialization')
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
  
  
  getAllUniversityUserByUnivID(univID)
  {
	  debugger;
	  let headers = new Headers();
      headers.append('univid',univID);
	  return this.http.get('http://localhost:3777/UniversityRoleUser/getUniversityRoleUserByUnivID',{headers: headers})
  	.map(res => res.json());
  }
  
  approveEvent(event){
                let headers = new Headers();
                headers.append('Content-Type','application/json');

                return this.http.post('http://localhost:3777/events/ApproveEvent', event,{headers: headers})
                .map(res => res.json());
  }
  
  rejectEvent(event){
                let headers = new Headers();
                headers.append('Content-Type','application/json');

                return this.http.post('http://localhost:3777/events/RejectEvent', event,{headers: headers})
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
  
  getAllTranscationTypeInfoWithRolesAndPriority(univid, trantypeid)
  {
	  debugger;
	  let headers = new Headers();
      headers.append('univid',univid);
	  headers.append('transcationtypeid',trantypeid);
	  return this.http.get('http://localhost:3777/UnivTranscationTypeDetail/GetUnivTranscationTypeDetailInfoByUnivIDAndTransType',{headers: headers})
  	.map(res => res.json());
  } 
  
  
  getUnivTranscationTypeDetailByUnivID(univid)
  {
	  debugger;
	  let headers = new Headers();
      headers.append('univid',univid);
	  return this.http.get('http://localhost:3777/UnivTranscationTypeDetail/getUnivTranscationTypeDetailByUnivID',{headers: headers})
  	.map(res => res.json());
  }
  
  getAllUnivTranscationTypeListByUnivIDAndTranType(univid, trantypeid)
  {
	  debugger;
	  let headers = new Headers();
      headers.append('univid',univid);
	  headers.append('transcationtypeid',trantypeid);
	  return this.http.get('http://localhost:3777/UnivTranscationTypeDetail/getAllUnivTranscationTypeListByUnivIDAndTranType',{headers: headers})
  	.map(res => res.json());
  }
  
  getUnivTranscationTypeDetailByUnivIDAndTransTypeAndCurrentDate(univid, trantypeid)
  {
	  debugger;
	  let headers = new Headers();
      headers.append('univid',univid);
	  headers.append('transcationtypeid',trantypeid);
	  return this.http.get('http://localhost:3777/UnivTranscationTypeDetail/getUnivTranscationTypeDetailByUnivIDAndTransTypeAndCurrentDate',{headers: headers})
  	.map(res => res.json());
  }
  
  
  getUnivTranscationMapDetailByTranMapID(tranMapID)
  {
	  debugger;
	  let headers = new Headers();
      headers.append('tranmapid',tranMapID);
	  
	  return this.http.get('http://localhost:3777/UnivTranscationMapDetail/getUnivTranscationMapDetailByTranMapID',{headers: headers})
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
  
  getStudentProfileByStudentID(studentID)
  {
	  debugger;
                  
let headers = new Headers();
                headers.append('studentid',studentID);
                return this.http.get('http://localhost:3777/students/getStudentProfileByStudentID',{headers: headers})
                .map(res => res.json());
  }
  
  
  getStudentByUnivID(univID)
  {
	  let headers = new Headers();
                headers.append('univid',univID);
                return this.http.get('http://localhost:3777/students/getStudentByUnivID',{headers: headers})
                .map(res => res.json());
  }
  
  getPendingStudentByUnivID(univID)
  {
	  let headers = new Headers();
                headers.append('univid',univID);
                return this.http.get('http://localhost:3777/students/getPendingStudentByUnivID',{headers: headers})
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
   
   getAllEventUniversityByUnivID(id){
	debugger;
	let headers = new Headers();
  	headers.append('id',id);
	return this.http.get('http://localhost:3777/EventUniversity/getAllEventUniversityByUnivID',{headers: headers})
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
  
  updateUniversityUserRole(universityUserRole){
                let headers = new Headers();
                headers.append('Content-Type','application/json');

    //UniversityRoleUser/register is temporary domain
                return this.http.post('http://localhost:3777/UniversityRoleUser/updateUniversityUser', universityUserRole,{headers: headers})
                .map(res => res.json());
  }
  
  
  deleteUniversityUserRole(universityUserRole){
                let headers = new Headers();
                //headers.append('id',id);
    //students/register is temporary domain
                return this.http.post('http://localhost:3777/UniversityRoleUser/deleteUniversityUserRole',universityUserRole,{headers: headers})
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

getAllUnivTranscationApprovalDetailInfoByUnivIDAndMaskID(univID, maskID){
				let headers = new Headers();
                headers.append('univid',univID);
				headers.append('maskid',maskID);
                return this.http.get('http://localhost:3777/UnivTranscationApprovalDetail/getAllUnivTranscationApprovalDetailInfoByUnivID',{headers: headers})
                .map(res => res.json());
}

getAllUnivTranscationApprovalDetailInfoByUnivIDAndRoleID(univID, roleID){
				let headers = new Headers();
                headers.append('univid',univID);
				headers.append('roleid',roleID);
                return this.http.get('http://localhost:3777/UnivTranscationApprovalDetail/getAllUnivTranscationApprovalDetailInfoByUnivIDAndRoleID',{headers: headers})
                .map(res => res.json());
}

getAllUnivTranscationEventApprovalDetailByUnivIDAndMaskID(univID, maskID){
				let headers = new Headers();
                headers.append('univid',univID);
				headers.append('maskid',maskID);
                return this.http.get('http://localhost:3777/UnivTranscationEventApprovalDetail/getAllUnivTranscationEventApprovalDetailByUnivID',{headers: headers})
                .map(res => res.json());
}

getAllUnivTranscationEventApprovalDetailInfoByUnivIDAndRoleID(univID, roleID){
				let headers = new Headers();
                headers.append('univid',univID);
				headers.append('roleid',roleID);
                return this.http.get('http://localhost:3777/UnivTranscationEventApprovalDetail/getAllUnivTranscationEventApprovalDetailInfoByUnivIDAndRoleID',{headers: headers})
                .map(res => res.json());
}

getAllUnivTranscationEventApprovalDetailInfoByUnivIDAndMaskID(univID, maskID){
				let headers = new Headers();
                headers.append('univid',univID);
				headers.append('maskid',maskID);
                return this.http.get('http://localhost:3777/UnivTranscationEventApprovalDetail/getAllUnivTranscationEventApprovalDetailInfoByUnivID',{headers: headers})
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
  
  addUniversityTransEventApprovalHistory(model, universityTransEventApprovalHistory, TransEventApprovalMapping){
                let headers = new Headers();
                headers.append('Content-Type','application/json');
				if(TransEventApprovalMapping.length > 0)
				model.TransEventApprovalMapping = TransEventApprovalMapping;//.sort(x=>x.Priority))[TransEventApprovalMapping.length-1];	
			    model.universityApprovalHistory = universityTransEventApprovalHistory;
				
				//UnivTranscationApprovalHistory/AddUnivTranscationApprovalHistory is temporary domain
                return this.http.post('http://localhost:3777/UnivTranscationEventApprovalHistory/AddUnivTranscationEventApprovalHistory', model,{headers: headers})
				.timeout(3000)
                .map(res => res.json());
  }
  
  addUniversityTransApprovalHistoryArray(model, universityTransApprovalHistory, TransApprovalMapping){
                let headers = new Headers();
                headers.append('Content-Type','application/json');
				if(TransApprovalMapping.length > 0)
				model.TransApprovalMapping = TransApprovalMapping;//.sort(x=>x.Priority))[TransEventApprovalMapping.length-1];	
			    model.universityApprovalHistory = universityTransApprovalHistory;
				
				//UnivTranscationApprovalHistory/AddUnivTranscationApprovalHistory is temporary domain
                return this.http.post('http://localhost:3777/UnivTranscationApprovalHistory/AddUnivAllTranscationApprovalHistory', model,{headers: headers})				
                .map(res => res.json());
  }
  
  
  addUniversityTransRejectionHistory(model, universityTransApprovalHistory, TransApprovalMapping){
                let headers = new Headers();
                headers.append('Content-Type','application/json');
				
				model.TransApprovalMapping = TransApprovalMapping;	
			    model.universityApprovalHistory = universityTransApprovalHistory;
				
				//UnivTranscationApprovalHistory/AddUnivTranscationApprovalHistory is temporary domain
                return this.http.post('http://localhost:3777/UnivTranscationApprovalHistory/AddUnivTranscationRejectionHistory', model,{headers: headers})
                .map(res => res.json());
  }
  
  addUniversityTransRejectionHistoryArray(model, universityTransApprovalHistory, TransApprovalMapping){
                let headers = new Headers();
                headers.append('Content-Type','application/json');
				if(TransApprovalMapping.length > 0)
				model.TransApprovalMapping = TransApprovalMapping;//.sort(x=>x.Priority))[TransEventApprovalMapping.length-1];	
			    model.universityApprovalHistory = universityTransApprovalHistory;
				
				//UnivTranscationApprovalHistory/AddUnivTranscationApprovalHistory is temporary domain
                return this.http.post('http://localhost:3777/UnivTranscationApprovalHistory/AddUnivAllTranscationRejectionHistory', model,{headers: headers})				
                .map(res => res.json());
  }
  
  addUniversityEventTransRejectionHistoryArray(model, universityTransApprovalHistory, TransApprovalMapping){
                let headers = new Headers();
                headers.append('Content-Type','application/json');
				if(TransApprovalMapping.length > 0)
				model.TransEventApprovalMapping = TransApprovalMapping;//.sort(x=>x.Priority))[TransEventApprovalMapping.length-1];	
			    model.universityApprovalHistory = universityTransApprovalHistory;
				
				//UnivTranscationApprovalHistory/AddUnivTranscationApprovalHistory is temporary domain
                return this.http.post('http://localhost:3777/UnivTranscationEventApprovalHistory/AddUnivTranscationEventRejectionHistory', model,{headers: headers})				
                .map(res => res.json());
  }
  
  // Event approval
  
  getMaxTranEventApprovalID()
  {
	  debugger;
	  return this.http.get('http://localhost:3777/UnivTranscationEventApprovalDetail/getMaxTransApprovalID')
  	.map(res => res.json());
  }
  
  getMaxTransEventApprovalHistoryID()
  {
	  debugger;
	  return this.http.get('http://localhost:3777/UnivTranscationEventApprovalHistory/getMaxTransEventApprovalHistoryID')
  	.map(res => res.json());
  }
  
  getMaxTranEventApprovalNumberID()
  {
	  debugger;
	  return this.http.get('http://localhost:3777/UnivTranscationEventApprovalDetail/getMaxTransApprovalNumberID')
  	.map(res => res.json());
  }
  
  getEventStudentApproved()
  {
	debugger;
    //let headers = new Headers();
    //headers.append('eventid',eventid);
    return this.http.get('http://localhost:3777/EventStudent/getEventStudentApproved')
     .map(res => res.json());
  }
  
  GetApprovedEventStudentByEventID(eventId)
  {
	debugger;
    let headers = new Headers();
    headers.append('eventid',eventId);
    return this.http.get('http://localhost:3777/EventStudent/GetApprovedEventStudentByEventID', {headers:headers})
     .map(res => res.json());
  }
  
  addUniversityTransEventApprovalDetail(TransMapping){	 
  	let headers = new Headers();
  	headers.append('Content-Type','application/json');
	if(TransMapping.length > 0)
    TransMapping = (TransMapping.sort(x=>x.Priority))[TransMapping.length-1];	  
    //students/register is temporary domain
  	return this.http.post('http://localhost:3777/UnivTranscationEventApprovalDetail/AddUnivTranscationEventApprovalDetail', TransMapping,{headers: headers})
  	.map(res => res.json());
  }
  
  addIntoEventStudent(eventStudent){	 
  	let headers = new Headers();
  	headers.append('Content-Type','application/json');
		  
    //students/register is temporary domain
  	return this.http.post('http://localhost:3777/EventStudent/EventStudent', eventStudent,{headers: headers})
  	.map(res => res.json());
  }
  
  GetEventStudentByEventIDAndStudentID(eventID, studentID)
  {
	  let headers = new Headers();
                headers.append('eventid',eventID);
				headers.append('studentid',studentID);
                return this.http.get('http://localhost:3777/EventStudent/getEventStudentByEventIDAndStudentID',{headers: headers})
                .map(res => res.json());
  }
  
  // GetEventStudentByEventIDAndStudentID(eventID, studentID)
  // {
	  // let headers = new Headers();
                // headers.append('eventid',eventID);
				// headers.append('studentid',studentID);
                // return this.http.get('http://localhost:3777/EventStudent/getEventStudentByEventIDAndStudentIDWithStudent',{headers: headers})
                // .map(res => res.json());
  // }
  
  
  // Organization calls starts here
  
  updateOrganization(organization){
                let headers = new Headers();
                headers.append('Content-Type','application/json');

    //students/register is temporary domain
                return this.http.post('http://localhost:3777/OrganizationMstr/updateOrganization', organization,{headers: headers})
                .map(res => res.json());
  }
  
  getOrganizationById(id){
                debugger;
                let headers = new Headers();
                headers.append('id',id);
                return this.http.get('http://localhost:3777/OrganizationMstr/GetOrganizationByID',{headers: headers})
                .map(res => res.json());
} 
   deleteOrganization(organization){
                let headers = new Headers();
                //headers.append('id',id);
    //students/register is temporary domain
                return this.http.post('http://localhost:3777/OrganizationMstr/deleteOrganization',organization,{headers: headers})
                .map(res => res.json());
   }
   
   addOrganization(organization){
                let headers = new Headers();
                headers.append('Content-Type','application/json');

    //students/register is temporary domain
                return this.http.post('http://localhost:3777/OrganizationMstr/register', organization,{headers: headers})
                .map(res => res.json());
  }
  
  addOrganizationRole(organizationRole){
  	let headers = new Headers();
  	headers.append('Content-Type','application/json');

    //students/register is temporary domain
  	return this.http.post('http://localhost:3777/OrganizationRoleMstr/AddOrganizationRole', organizationRole,{headers: headers})
  	.map(res => res.json());
  } 
  
  getOrganizationRoles()
  {
	  debugger;
	  return this.http.get('http://localhost:3777/OrganizationRoleMstr/getAllOrganizationRole')
  	.map(res => res.json());
  }
  
  getOrganizationRolesByOrgnID(OrgnID)
  {
	  let headers = new Headers();
      headers.append('orgnid',OrgnID);
	  return this.http.get('http://localhost:3777/OrganizationRoleMstr/getOrganizationRolesByOrgnID', {headers:headers})
  	.map(res => res.json());
  }
  
  authenticateOrganization(organization){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3777/OrganizationMstr/authenticateOrganization', organization,{headers: headers})
    .map(res => res.json());
  }
  
  GetOrganizationsWithRoles(){
                
    //students/register is temporary domain
                return this.http.get('http://localhost:3777/OrganizationMstr/GetOrganizationsWithRoles')
                .map(res => res.json());
  }
  
  // organization transaction map starts here
  
  getAllOrgnTranscationType()
  {
	  debugger;
	  return this.http.get('http://localhost:3777/OrgnTranscationTypeMstr/getAllOrgnTranscationType')
  	.map(res => res.json());
  }
  
  getAllOrgnTranscationTypeWithRolesAndPriority(orgnid, trantypeid)
  {
	  debugger;
	  let headers = new Headers();
      headers.append('orgnid',orgnid);
	  headers.append('transcationtypeid',trantypeid);
	  return this.http.get('http://localhost:3777/OrgnTranscationTypeDetail/GetOrgnTranscationTypeDetailByUnivIDAndTransType',{headers: headers})
  	.map(res => res.json());
  }
  
  getMaxOrgnTranMapID()
  {
	  debugger;
	  return this.http.get('http://localhost:3777/OrgnTranscationTypeDetail/getMaxOrgnTransMapID')
  	.map(res => res.json());
  }
  
  AddOrgnTranscationTypeDetail(OrganizationTranscation){
  	let headers = new Headers();
  	headers.append('Content-Type','application/json');

	
    //OrganizationTranscation/register is temporary domain
  	return this.http.post('http://localhost:3777/OrgnTranscationTypeDetail/AddOrgnTranscationTypeDetail', OrganizationTranscation,{headers: headers})
  	.map(res => res.json());
  }
  
  // Will update sooon
  getAllOrgnTranscationTypeInfoWithRolesAndPriority(orgnid, trantypeid)
  {
	  debugger;
	  let headers = new Headers();
      headers.append('orgnid',orgnid);
	  headers.append('transcationtypeid',trantypeid);
	  return this.http.get('http://localhost:3777/OrgnTranscationTypeDetail/GetOrgnTranscationTypeDetailInfoByOrgnIDAndTransType',{headers: headers})
  	.map(res => res.json());
  }
  
  getAllOrgnTranscationTypeListByOrgnIDAndTranType(orgnid, trantypeid)
  {
	  debugger;
	  let headers = new Headers();
      headers.append('orgnid',orgnid);
	  headers.append('transcationtypeid',trantypeid);
	  return this.http.get('http://localhost:3777/OrgnTranscationTypeDetail/getAllOrgnTranscationTypeListByOrgnIDAndTranType',{headers: headers})
  	.map(res => res.json());
  }
  
   getOrgnTranscationMapDetailByTranMapID(tranMapID)
  {
	  debugger;
	  let headers = new Headers();
      headers.append('tranmapid',tranMapID);
	  
	  return this.http.get('http://localhost:3777/OrgnTranscationMapDetail/getOrgnTranscationMapDetailByTranMapID',{headers: headers})
  	.map(res => res.json());
  } 
  
  
  getAllOrganizationRolesByOrgnID(orgnID)
  {
	  debugger;
	  let headers = new Headers();
      headers.append('orgnid',orgnID);
	  return this.http.get('http://localhost:3777/OrganizationRoleMstr/getOrganizationRolesByOrgnID',{headers: headers})
  	.map(res => res.json());
  }
  
  
  getAllOrganizationUserByOrgnID(orgnID)
  {
	  debugger;
	  let headers = new Headers();
      headers.append('orgnid',orgnID);
	  return this.http.get('http://localhost:3777/OrganizationRoleUser/getOrganizationRoleUserByOrgnID',{headers: headers})
  	.map(res => res.json());
  }
  
  addOrganizationUserRole(organizationUserRole){
                let headers = new Headers();
                headers.append('Content-Type','application/json');

    //UniversityRoleUser/register is temporary domain
                return this.http.post('http://localhost:3777/OrganizationRoleUser/register', organizationUserRole,{headers: headers})
                .map(res => res.json());
  }
  
  updateOrganizationUserRole(organizationUserRole){
                let headers = new Headers();
                headers.append('Content-Type','application/json');

    //UniversityRoleUser/register is temporary domain
                return this.http.post('http://localhost:3777/OrganizationRoleUser/updateOrganizationUser', organizationUserRole,{headers: headers})
                .map(res => res.json());
  }
  
  
  deleteOrganizationUserRole(organizationRoleUser){
                let headers = new Headers();
                //headers.append('id',id);
    //students/register is temporary domain
                return this.http.post('http://localhost:3777/OrganizationRoleUser/deleteOrganizationUserRole',organizationRoleUser,{headers: headers})
                .map(res => res.json());
   }
  
  
  authenticateOrganizationRole(organizationRole){
    let headers = new Headers();
	
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3777/OrganizationRoleUser/authenticateOrganizationRole', organizationRole,{headers: headers})
    .map(res => res.json());
  }
  
  // End here

  
  //Organization event approval mapping
  
  // addOrganizationTransEventApprovalDetail(TransMapping){	 
  	// let headers = new Headers();
  	// headers.append('Content-Type','application/json');
	// if(TransMapping.length > 0)
    // TransMapping = (TransMapping.sort(x=>x.Priority))[TransMapping.length-1];	  
    // //students/register is temporary domain
  	// return this.http.post('http://localhost:3777/OrgnTranscationEventApprovalDetail/AddOrgnTranscationEventApprovalDetail', TransMapping,{headers: headers})
  	// .map(res => res.json());
  // }



getMaxTranOrgnEventApprovalNumberID()
  {
	  debugger;
	  return this.http.get('http://localhost:3777/OrgnTranscationEventApprovalDetail/getMaxTransApprovalNumberID')
  	.map(res => res.json());
  }

getMaxTranOrgnEventApprovalID()
  {
	  debugger;
	  return this.http.get('http://localhost:3777/OrgnTranscationEventApprovalDetail/getMaxTransApprovalID')
  	.map(res => res.json());
  }


getAllOrgnTranscationEventApprovalDetailByOrgnIDAndMaskID(orgnID, maskID){
				let headers = new Headers();
                headers.append('orgnid',orgnID);
				headers.append('maskid',maskID);
                return this.http.get('http://localhost:3777/OrgnTranscationEventApprovalDetail/getAllOrgnTranscationEventApprovalDetailByUnivID',{headers: headers})
                .map(res => res.json());
}

getAllOrgnTranscationEventApprovalDetailInfoByOrgnIDAndRoleID(orgnID, roleID){
				let headers = new Headers();
                headers.append('orgnid',orgnID);
				headers.append('roleid',roleID);
                return this.http.get('http://localhost:3777/OrgnTranscationEventApprovalDetail/getAllOrgnTranscationEventApprovalDetailInfoByOrgnIDAndRoleID',{headers: headers})
                .map(res => res.json());
}

getAllOrgnTranscationEventApprovalDetailInfoByOrgnIDAndMaskID(orgnID, maskID){
				let headers = new Headers();
                headers.append('orgnid',orgnID);
				headers.append('maskid',maskID);
                return this.http.get('http://localhost:3777/OrgnTranscationEventApprovalDetail/getAllOrgnTranscationEventApprovalDetailInfoByOrgnID',{headers: headers})
                .map(res => res.json());
}

getOrgnTranscationTypeDetailByOrgnIDAndTransTypeAndCurrentDate(orgnid, trantypeid)
  {
	  debugger;
	  let headers = new Headers();
      headers.append('orgnid',orgnid);
	  headers.append('transcationtypeid',trantypeid);
	  return this.http.get('http://localhost:3777/OrgnTranscationTypeDetail/getOrgnTranscationTypeDetailByOrgnIDAndTransTypeAndCurrentDate',{headers: headers})
  	.map(res => res.json());
  }
  
 GetEventEmployeeByEventIDAndEmployeeID(eventID, employeeID)
  {
	  let headers = new Headers();
                headers.append('eventid',eventID);
				headers.append('employeeid',employeeID);
                return this.http.get('http://localhost:3777/EventEmployee/GetEventEmployeeByEventIDAndEmployeeID',{headers: headers})
                .map(res => res.json());
  }
  
  GetApprovedEventEmployeeByEventID(eventId)
  {
	debugger;
    let headers = new Headers();
    headers.append('eventid',eventId);
    return this.http.get('http://localhost:3777/EventEmployee/GetApprovedEventEmployeeByEventID', {headers:headers})
     .map(res => res.json());
  }
  
  addOrganizationTransEventApprovalDetail(TransMapping){	 
  	let headers = new Headers();
  	headers.append('Content-Type','application/json');
	if(TransMapping.length > 0)
    TransMapping = (TransMapping.sort(x=>x.Priority))[TransMapping.length-1];	  
    //students/register is temporary domain
  	return this.http.post('http://localhost:3777/OrgnTranscationEventApprovalDetail/AddOrgnTranscationEventApprovalDetail', TransMapping,{headers: headers})
  	.map(res => res.json());
  }
  
  addIntoEventEmployee(eventEmployee){	 
  	let headers = new Headers();
  	headers.append('Content-Type','application/json');
		  
    //students/register is temporary domain
  	return this.http.post('http://localhost:3777/EventEmployee/EventEmployee', eventEmployee,{headers: headers})
  	.map(res => res.json());
  }
  
  getEmployeeByOrgnID(orgnID)
  {
	  let headers = new Headers();
      headers.append('orgnid',orgnID);
       return this.http.get('http://localhost:3777/OrganizationRoleUser/getOrganizationRoleUserByOrgnID',{headers: headers})
        .map(res => res.json());
  }
  
  addOrganizationTransEventApprovalHistory(model, organizationTransEventApprovalHistory, TransEventApprovalMapping){
                let headers = new Headers();
                headers.append('Content-Type','application/json');
				if(TransEventApprovalMapping.length > 0)
				model.TransEventApprovalMapping = TransEventApprovalMapping;//.sort(x=>x.Priority))[TransEventApprovalMapping.length-1];	
			    model.organizationApprovalHistory = organizationTransEventApprovalHistory;
				
				//UnivTranscationApprovalHistory/AddUnivTranscationApprovalHistory is temporary domain
                return this.http.post('http://localhost:3777/OrgnTranscationEventApprovalHistory/AddOrgnTranscationEventApprovalHistory', model,{headers: headers})
				.timeout(3000)
                .map(res => res.json());
  }

addOrganizationEventTransRejectionHistoryArray(model, organizationTransApprovalHistory, TransApprovalMapping){
                let headers = new Headers();
                headers.append('Content-Type','application/json');
				if(TransApprovalMapping.length > 0)
				model.TransEventApprovalMapping = TransApprovalMapping;//.sort(x=>x.Priority))[TransEventApprovalMapping.length-1];	
			    model.organizationApprovalHistory = organizationTransApprovalHistory;
				
				//UnivTranscationApprovalHistory/AddUnivTranscationApprovalHistory is temporary domain
                return this.http.post('http://localhost:3777/OrgnTranscationEventApprovalHistory/AddOrgnTranscationEventRejectionHistory', model,{headers: headers})				
                .map(res => res.json());
  }
  
  GetEventByOrgnID(id){
	debugger;
	let headers = new Headers();
  	headers.append('id',id);
	return this.http.get('http://localhost:3777/EventOrganization/getEventOrganizationByOrgnID',{headers: headers})
                .map(res => res.json());
   }
   
   getEventEmployeeApproved()
  {
	debugger;
    //let headers = new Headers();
    //headers.append('eventid',eventid);
    return this.http.get('http://localhost:3777/EventEmployee/getEventEmployeeApproved')
     .map(res => res.json());
  }
}
