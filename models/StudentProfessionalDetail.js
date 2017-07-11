const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const StudentProfessionalDetailSchema = mongoose.Schema({



  StudentID:{
    type: String
  },
 EmployerName:{
    type: String
  },
  
  DurationStartMonth :{
    type: Number
  },
  
  DurationStartYear :{
    type: Number
  },
  DurationEndMonth :{
    type: Number
  },
  
  DurationEndYear :{
    type: Number
  },
  
  Designation:{
    type: String
  },
  
  JobProfile:{
    type: String
  },
  
  FullTimeOrPartTime:{
	  type:String
  },
  
  Active:{
		type: Boolean
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

const StudentProfessionalDetail = module.exports = mongoose.model('StudentProfessionalDetail', StudentProfessionalDetailSchema,'StudentProfessionalDetail');

module.exports.getStudentEducationById = function(id, callback){
	StudentProfessionalDetail.findById(id, callback);
}

module.exports.getStudentEducationByStudentId = function(StudentID,callback){
	const query = {StudentID: StudentID}
	StudentProfessionalDetail.find(query,callback);}

module.exports.AddStudentProfessionalDetail = function(newStudentEducation, callback){ 
	newStudentEducation.save(callback);
}	  
	  
module.exports.getAllStudentEducation = function(callback){	
	StudentProfessionalDetail.find("",callback);
}


// module.exports.RemoveEventRuleByID = function(EventRuleID, callback){ 
// var query = { EventRuleID: EventRuleID };
// EventRule.update(query, {Active: false}, callback);}


module.exports.DeleteStudentEducationByStudentID = function(StudentID, callback){ 
var query = { StudentID: StudentID };
StudentProfessionalDetail.remove(query,  callback);}
