const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const config = require('../config/database');
var bcrypt = require('bcrypt');
//Schema
const OrganizationRoleUserSchema = mongoose.Schema({
 id:{
	 type:String
 },

  Orgn_ID:{
    type: Number
  },

  Role_ID:{
		type: Number
	},

  Email_ID:{
		type: String		
	},

  username:{
		type: String
	},

  Pwd:{
		type: String

	},
	
	isPasswordChanged:{
	  type: Boolean,
	  default:false
  },

  Mobile_No:{
    type: String
  },
  
   Department:{
    type:String
  },
  

   Active:{
    type: Boolean,
	default:true
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

const OrganizationRoleUser = module.exports = mongoose.model('OrganizationRoleUser', OrganizationRoleUserSchema,'OrganizationRoleUser');
const saltRounds = 10;
module.exports.getOrganizationRoleUserById = function(id, callback){
	console.log(id);
	OrganizationRoleUser.findById(id, callback);
}

module.exports.profile = function(id, callback){
	console.log(id);
	OrganizationRoleUser.findById(id, callback);
}

module.exports.getOrganizationRoleUserByUserName = function(username1,callback){
	const query = {username: username1}	
	OrganizationRoleUser.findOne(query,callback);
}

module.exports.getOrganizationRoleUserByEmail = function(emailID,callback){
	const query = {Email_ID: emailID}
	OrganizationRoleUser.findOne(query,callback);
}

module.exports.getOrganizationRoleUserByOrganizationRoleUserID = function(OrganizationRoleUserID,callback){
	const query = {OrganizationRoleUser_ID: OrganizationRoleUserID}
	OrganizationRoleUser.findOne(query,callback);
}

module.exports.addOrganizationRoleUser = function(newOrganizationRoleUser, callback){
// To Create a hash value with the password entered in the form to store in DB - hareganx - 06/06/17	
	
		newOrganizationRoleUser.save(callback);
   

  //if(err) throw err;
}
module.exports.getOrganizationRoleUserByOrgnID = function(orgn_ID,callback){
	const query = {Orgn_ID: orgn_ID, Active: true}
	OrganizationRoleUser.find(query,callback);
}

module.exports.deleteOrganizationUserRole = function(id, callback){ 
var query = { _id: id };
console.log("db" + id);
OrganizationRoleUser.update(query, {Active:false}, callback);
} 

module.exports.RemoveOrganizationUserRoleByRoleID = function(roleId, callback){ 
var query = { Role_ID: roleId };

OrganizationRoleUser.remove(query, callback);
}

module.exports.getAllOrganizationRoleUser = function(callback){	

	OrganizationRoleUser.find("",callback);
}

module.exports.updateOrganizationRoleUser = function(organizationRoleUser, callback){ 
var query = { _id: organizationRoleUser.id };
console.log(query);
OrganizationRoleUser.update(query, {username: organizationRoleUser.username,Email_ID:organizationRoleUser.Email_ID,Mobile_No:organizationRoleUser.Mobile_No,Department:organizationRoleUser.Department}, callback);
} 


module.exports.udpateProfile = function(newOrganizationRoleUser, callback){ 
var query = { OrganizationRoleUser_ID: newOrganizationRoleUser.OrganizationRoleUser_ID };
//OrganizationRoleUser.update(query, {OrganizationRoleUser_Heading: newOrganizationRoleUser.OrganizationRoleUser_Heading,OrganizationRoleUser_Bio:newOrganizationRoleUser.OrganizationRoleUser_Bio,OrganizationRoleUser_Name:newOrganizationRoleUser.OrganizationRoleUser_Name}, callback);
} 

module.exports.updatePassword = function(user, callback){ 
var query = { username	: user.EmailID  };
OrganizationRoleUser.update(query, {Pwd: user.PWD, isPasswordChanged: user.isPasswordChanged}, callback);
}
