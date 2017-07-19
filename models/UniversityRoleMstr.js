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

	Status:{
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

module.exports.getUniversityRoleMstrByUnivID = function(Univ_ID,callback){
	const query = {Univ_ID: Univ_ID}
	UniversityRoleMaster.find(query,callback);}

module.exports.getUniversityRoleInfoByUnivID = function(Univ_ID,callback){
		
	UniversityRoleMaster.aggregate([
	{ $match: {
            Univ_ID: parseInt(Univ_ID)
        }},
    {
      
		$lookup:
        {
          from: "UniversityRoleUser",
          localField: "Univ_ID",
          foreignField: "Univ_ID",
          as: "RoleUserInfo"
        }
   },
   
], callback);}
	
module.exports.AddUniversityRoleMstr = function(newUniversityRoleMstr, callback){ 
	console.log(newUniversityRoleMstr);
      newUniversityRoleMstr.save(callback);
}

module.exports.maxuniversityroleId = function(callback){	

	UniversityRoleMaster.find("",callback).sort({Univ_RoleID :-1}).limit(1);
}

module.exports.getAllUniversityRole = function(callback){	
	UniversityRoleMaster.find("",callback);}

module.exports.DeleteUniversityRoleById = function(OrgnID, callback){ 
var query = { OrgnID: OrgnID };
UniversityRoleMaster.update(query, {Active: false}, callback);}





