const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');



const SpecializationMasterSchema = mongoose.Schema({

  SpecializationID:{
  type: Number
  },

  SpecializationName:{
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

const SpecializationMaster = module.exports = mongoose.model('SpecializationMaster', SpecializationMasterSchema,'SpecializationMaster');

module.exports.getSpecializationById = function(id, callback){
	SpecializationMaster.findById(id, callback);
}

module.exports.getSpecializationByName = function(SpecializationName,callback){
	const query = {SpecializationName: SpecializationName}
	SpecializationMaster.findOne(query,callback);}

module.exports.AddSpecialization = function(newSpecializationMstr, callback){ 
	
      newSpecializationMstr.save(callback);
}	  
	  
// module.exports.getAllEvent = function(callback){	
	// Event.find("",callback);
// }

module.exports.getAllSpecialization = function(callback){	
	SpecializationMaster.find("",callback);}

// module.exports.DeleteCategoryById = function(CategoryID, callback){ 
// var query = { CategoryID: CategoryID };
// CategoryMstr.update(query, {Active: false}, callback);}





