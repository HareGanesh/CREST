const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');



const DegreeMasterSchema = mongoose.Schema({

  DegreeID:{
  type: Number
  },

  DegreeName:{
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

const DegreeMaster = module.exports = mongoose.model('DegreeMaster', DegreeMasterSchema,'DegreeMaster');

module.exports.getDegreeById = function(id, callback){
	DegreeMaster.findById(id, callback);
}

module.exports.getDegreeByName = function(DegreeName,callback){
	const query = {DegreeName: DegreeName}
	DegreeMaster.findOne(query,callback);}

module.exports.AddDegree = function(newDegreeMstr, callback){ 
	
      newDegreeMstr.save(callback);
}	  
	  
// module.exports.getAllEvent = function(callback){	
	// Event.find("",callback);
// }

module.exports.getAllDegree = function(callback){	
	DegreeMaster.find("",callback);}

// module.exports.DeleteCategoryById = function(CategoryID, callback){ 
// var query = { CategoryID: CategoryID };
// CategoryMstr.update(query, {Active: false}, callback);}





