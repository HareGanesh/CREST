const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const StudentCategorySchema = mongoose.Schema({



 StudentID:{
    type: String
  },
 CategoryID:{
    type: String
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

const StudentCategory = module.exports = mongoose.model('StudentCategory', StudentCategorySchema,'StudentCategory');

module.exports.getCategoryById = function(id, callback){
	StudentCategory.findById(id, callback);
}


module.exports.addStudentCategory = function(studentCategory, callback){ 
	console.log(studentCategory);
      studentCategory.save(callback);
}	  
	  
// module.exports.getAllEventRule = function(callback){	
	// StudentCategory.find("",callback);
// }


// module.exports.RemoveEventRuleByID = function(EventRuleID, callback){ 
// var query = { EventRuleID: EventRuleID };
// EventRule.update(query, {Active: false}, callback);}


module.exports.DeleteEventRuleByEventID = function(EventID, callback){ 
var query = { EventID: EventID };
EventRule.update(query, {Active: false}, callback);}



