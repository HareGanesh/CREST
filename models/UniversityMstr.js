const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Schema
const UniversityMasterSchema = mongoose.Schema({


    id:{
		type: String
	},
Univ_ID:{
  type: Number
  }, 
	Univ_Name:{
		type: String
	},

	EmailID:{
		type: String,
		required: true
	},

	UserName:{
		type: String
		
	},

	 Pwd:{
		type: String
		

	},

   Address:{
    type: String
  },

  ContactNo:{
    type: String
  },

   Active:{
    type: Boolean
  },

   Created_On:{
    type: Date
  },

   Created_by:{
    type: String
  },

   Modified_On:{
    type: Date
  },

   Modified_by:{
    type: String
  }

});

const UniversityMaster = module.exports = mongoose.model('UniversityMaster', UniversityMasterSchema,'UniversityMaster');

module.exports.getAllUniversity = function(callback){	
const query = {Active: 1};
	UniversityMaster.find(query,callback);
}

module.exports.universityId = function(callback){	

	UniversityMaster.find("",callback).count();
}
 module.exports.getUniversityById = function(id,callback){
	const query = {_id: id};
	UniversityMaster.findOne(query, callback);	
}

 module.exports.getUniversityByName = function(name,callback){
	const query = {UniversityName: name};
	UniversityMaster.findOne(query, callback);	
}
module.exports.addUnivesity = function(univesity, callback){

  univesity.save(callback);
 // if(err) throw err;
}
module.exports.deleteUniversity = function(id, callback){ 
var query = { _id: id };
console.log("db" + id);
UniversityMaster.update(query, {Active:0}, callback);
} 

module.exports.updateUniversity = function(university, callback){ 
var query = { _id: university.id };
UniversityMaster.update(query, {UniversityName: university.UniversityName,EmailID:university.EmailID,Address:university.Address,ContactNo:university.ContactNo}, callback);
} 

