const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');



const UniversityMstrSchema = mongoose.Schema({

  Univ_ID:{
  type: Number
  },

  Univ_Name:{
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

const UniversityMaster = module.exports = mongoose.model('UniversityMaster', UniversityMstrSchema,'UniversityMaster');

module.exports.getUniversityMstrById = function(id, callback){
	UniversityMaster.findById(id, callback);
}

module.exports.getUniversityMstrByName = function(CategoryName,callback){
	const query = {CategoryName: CategoryName}
	UniversityMaster.findOne(query,callback);}

module.exports.AddUniversityMstr = function(newUniversityMstr, callback){ 
	console.log(newUniversityMstr);
      newUniversityMstr.save(callback);
}

module.exports.getAllUniversity = function(callback){	
	UniversityMaster.find("",callback);}

module.exports.DeleteUniversityById = function(OrgnID, callback){ 
var query = { OrgnID: OrgnID };
UniversityMaster.update(query, {Active: false}, callback);}





