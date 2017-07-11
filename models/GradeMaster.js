const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');



const GradeMasterSchema = mongoose.Schema({

  GradeID:{
  type: Number
  },

  GradeName:{
    type: String
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

const GradeMaster = module.exports = mongoose.model('GradeMaster', GradeMasterSchema,'GradeMaster');

module.exports.getGradeById = function(id, callback){
	GradeMaster.findById(id, callback);
}

module.exports.getGradeByName = function(DegreeName,callback){
	const query = {DegreeName: DegreeName}
	GradeMaster.findOne(query,callback);}

module.exports.AddGrade = function(newGradeMstr, callback){ 
	
      newGradeMstr.save(callback);
}	  
	  
// module.exports.getAllEvent = function(callback){	
	// Event.find("",callback);
// }

module.exports.getAllGrade = function(callback){	
	GradeMaster.find("",callback);}

// module.exports.DeleteCategoryById = function(CategoryID, callback){ 
// var query = { CategoryID: CategoryID };
// CategoryMstr.update(query, {Active: false}, callback);}





