const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');



const UniversityRoleMstrSchema = mongoose.Schema({

  Univ_ID:{
  type: Number
  },

  Univ_RoleID:{
    type: Number
  },
  Univ_RoleName:{
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

const UniversityRoleMaster = module.exports = mongoose.model('University_Role_Master', UniversityRoleMstrSchema,'University_Role_Master');

module.exports.getUniversityRoleMstrById = function(id, callback){
	UniversityRoleMaster.findById(id, callback);
}

module.exports.getUniversityRoleMstrByName = function(CategoryName,callback){
	const query = {CategoryName: CategoryName}
	UniversityRoleMaster.findOne(query,callback);}

module.exports.AddUniversityRoleMstr = function(newUniversityRoleMstr, callback){ 
	console.log(newUniversityRoleMstr);
      newUniversityRoleMstr.save(callback);
}

module.exports.getAllUniversityRole = function(callback){	
	UniversityRoleMaster.find("",callback);}

module.exports.DeleteUniversityRoleById = function(OrgnID, callback){ 
var query = { OrgnID: OrgnID };
UniversityRoleMaster.update(query, {Active: false}, callback);}





