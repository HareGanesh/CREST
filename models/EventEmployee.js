const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const EventEmployeeSchema = mongoose.Schema({

  EventID:{
    type: String
  },
  Employee_ID:{
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

const EventEmployee = module.exports = mongoose.model('EventEmployee', EventEmployeeSchema,'EventEmployee');

module.exports.getEventEmployeeById = function(id, callback){
	EventEmployee.findById(id, callback);
}

module.exports.getEventEmployeeByEventID = function(EventID,callback){
	const query = {EventID: EventID}
	EventEmployee.find(query,callback);}
	
module.exports.getEventEmployeeByEventIDAndEmployeeID = function(EventID, EmployeeID, callback){
	const query = {EventID: EventID, Employee_ID:EmployeeID}
	EventEmployee.find(query,callback);}
	

	
module.exports.getEventEmployeeByEventIDAndStudentIDWithEmployee= function(EmployeeID,callback){
	//const query = {Student_ID:StudentID};
	EventEmployee.aggregate([
	{ $match: {
            Employee_ID: EmployeeID
        }},
    {
      $lookup:
        {
          from: "OrganizationRoleUser",
          localField: "_id",
          foreignField: "Employee_ID",
          as: "Employee_Info"
        }
   }
], callback);}
	//EventEmployee.find(query,callback);}

module.exports.AddEventEmployee = function(newEventEmployee, callback){ 
	newEventEmployee.save(callback);
}	  
	  
module.exports.getAllEventEmployee = function(callback){	
	EventEmployee.find("",callback);
}

module.exports.setIsApproved = function(EmployeeID, Event_ID,callback){ 
var query = { Employee_ID: EmployeeID, EventID:Event_ID };
EventEmployee.update(query, {IsConfirmed: true}, callback);
}
module.exports.getEventEmployeeApproved = function(callback){ 
var query = {  IsConfirmed:true };
EventEmployee.find(query, callback);
}


module.exports.GetApprovedEventEmployeeByEventID = function(EventID,callback){
	const query = {EventID: EventID,IsConfirmed:true}
	EventEmployee.find(query,callback);}


module.exports.RemoveEventEmployeeByID = function(EventEmployeeID, callback){ 
var query = { EventEmployeeID: EventEmployeeID };
EventEmployee.update(query, {Active: false}, callback);}


module.exports.DeleteEventEmployeeByEventID = function(EventID, callback){ 
var query = { EventID: EventID };
EventEmployee.update(query, {Active: false}, callback);}

module.exports.getEventEmployeeByUnivID = function(univID, callback){
	const query = {Univ_ID: univID}
	EventEmployee.find(query,callback);} 


