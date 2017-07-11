const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const StudentEducationDetailSchema = mongoose.Schema({



  StudentID:{
    type: String
  },
 DegreeID:{
    type: Number
  },
  
  SpecializationID :{
    type: Number
  },
  
  GradeID :{
    type: Number
  },
  
  Year :{
    type: Number
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

const StudentEducationDetail = module.exports = mongoose.model('StudentEducationDetail', StudentEducationDetailSchema,'StudentEducationDetail');

module.exports.getStudentEducationById = function(id, callback){
	StudentEducationDetail.findById(id, callback);
}

module.exports.getStudentEducationByStudentId = function(StudentID,callback){
	const query = {StudentID: StudentID}
	StudentEducationDetail.find(query,callback);}

module.exports.AddStudentEducationDetail = function(newStudentEducation, callback){ 
	newStudentEducation.save(callback);
}	  
	  
module.exports.getAllStudentEducation = function(callback){	
	StudentEducationDetail.find("",callback);
}


// module.exports.RemoveEventRuleByID = function(EventRuleID, callback){ 
// var query = { EventRuleID: EventRuleID };
// EventRule.update(query, {Active: false}, callback);}


module.exports.DeleteStudentEducationByStudentID = function(StudentID, callback){ 
var query = { StudentID: StudentID };
StudentEducationDetail.remove(query,  callback);}



