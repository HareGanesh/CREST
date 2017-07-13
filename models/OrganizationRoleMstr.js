const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');



const OrganizationRoleMstrSchema = mongoose.Schema({

  Orgn_ID:{
  type: Number
  },

  Orgn_RoleID:{
    type: Number
  },
  Orgn_RoleName:{
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

const OrganizationRoleMaster = module.exports = mongoose.model('Organization_Role_Master', OrganizationRoleMstrSchema,'Organization_Role_Master');

module.exports.getOrganizationRoleMstrById = function(id, callback){
	OrganizationRoleMaster.findById(id, callback);
}

module.exports.getOrganizationRoleMstrByName = function(CategoryName,callback){
	const query = {CategoryName: CategoryName}
	OrganizationRoleMaster.findOne(query,callback);}

module.exports.getOrganizationRoleMstrByOrgnID = function(Orgn_ID,callback){
	const query = {Orgn_ID: Orgn_ID}
	OrganizationRoleMaster.find(query,callback);}

module.exports.AddOrganizationRoleMstr = function(newOrganizationRoleMstr, callback){ 
	console.log(newOrganizationRoleMstr + "------");
	console.log("teeeeeeeee");
      newOrganizationRoleMstr.save(callback);
}

module.exports.maxOrganizationRoleId = function(callback){	

	OrganizationRoleMaster.find("",callback).sort({Orgn_RoleID :-1}).limit(1);
}

module.exports.getAllOrganizationRole = function(callback){	
	OrganizationRoleMaster.find("",callback);}

module.exports.DeleteOrganizationRoleById = function(OrgnID, callback){ 
var query = { OrgnID: OrgnID };
OrganizationRoleMaster.update(query, {Active: false}, callback);}





