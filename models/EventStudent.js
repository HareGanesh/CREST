const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const EventStudentSchema = mongoose.Schema({

  EventID:{
    type: String
  },
  Student_ID:{
    type: String
  },
  IsConfirmed:{
		type: Boolean,
		default:false
	},
	
   CreatedOn:{
    type: Date
  },

   Createdby:{
    type: String
  },

   ModifiedOn:{
    type: Date
  },

   Modifiedby:{
    type: String
  }


});

const EventStudent = module.exports = mongoose.model('EventStudent', EventStudentSchema,'EventStudent');

module.exports.getEventStudentById = function(id, callback){
	EventStudent.findById(id, callback);
}

module.exports.getEventStudentByEventID = function(EventID,callback){
	const query = {EventID: EventID}
	EventStudent.find(query,callback);}
	
module.exports.getEventStudentByEventIDAndStudentID = function(EventID, StudentID, callback){
	const query = {EventID: EventID, Student_ID:StudentID}
	EventStudent.find(query,callback);}
	

	
module.exports.getEventStudentByEventIDAndStudentIDWithStudent= function(StudentID,callback){
	//const query = {Student_ID:StudentID};
	EventStudent.aggregate([
	{ $match: {
            Student_ID: StudentID
        }},
    {
      $lookup:
        {
          from: "Student",
          localField: "Student_ID",
          foreignField: "Student_ID",
          as: "Student_Info"
        }
   }
], callback);}
	//EventStudent.find(query,callback);}

module.exports.AddEventStudent = function(newEventStudent, callback){ 
	newEventStudent.save(callback);
}	  
	  
module.exports.getAllEventStudent = function(callback){	
	EventStudent.find("",callback);
}

module.exports.setIsApproved = function(Student_ID, Event_ID,callback){ 
var query = { Student_ID: Student_ID, EventID:Event_ID };
EventStudent.update(query, {IsConfirmed: true}, callback);
}
module.exports.getEventStudentApproved = function(callback){ 
var query = {  IsConfirmed:true };
EventStudent.find(query, callback);
}


module.exports.GetApprovedEventStudentByEventID = function(EventID,callback){
	const query = {EventID: EventID,IsConfirmed:true}
	EventStudent.find(query,callback);}


module.exports.RemoveEventStudentByID = function(EventStudentID, callback){ 
var query = { EventStudentID: EventStudentID };
EventStudent.update(query, {Active: false}, callback);}


module.exports.DeleteEventStudentByEventID = function(EventID, callback){ 
var query = { EventID: EventID };
EventStudent.update(query, {Active: false}, callback);}

module.exports.getEventStudentByUnivID = function(univID, callback){
	const query = {Univ_ID: univID}
	EventStudent.find(query,callback);} 


