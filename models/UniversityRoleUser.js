const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const config = require('../config/database');
var bcrypt = require('bcrypt');
//Schema
const UniversityRoleUserSchema = mongoose.Schema({
 id:{
	 type:String
 },

  Univ_ID:{
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

const UniversityRoleUser = module.exports = mongoose.model('UniversityRoleUser', UniversityRoleUserSchema,'UniversityRoleUser');
const saltRounds = 10;
module.exports.getUniversityRoleUserById = function(id, callback){
	console.log(id);
	UniversityRoleUser.findById(id, callback);
}

module.exports.profile = function(id, callback){
	console.log(id);
	UniversityRoleUser.findById(id, callback);
}

module.exports.getUniversityRoleUserByUserName = function(username,callback){
	const query = {username: username}
	UniversityRoleUser.findOne(query,callback);
}

module.exports.getUniversityRoleUserByEmail = function(emailID,callback){
	const query = {Email_ID: emailID}
	UniversityRoleUser.findOne(query,callback);
}

module.exports.getUniversityRoleUserByUniversityRoleUserID = function(UniversityRoleUserID,callback){
	const query = {UniversityRoleUser_ID: UniversityRoleUserID}
	UniversityRoleUser.findOne(query,callback);
}

module.exports.addUniversityRoleUser = function(newUniversityRoleUser, callback){
// To Create a hash value with the password entered in the form to store in DB - hareganx - 06/06/17	
	
		newUniversityRoleUser.save(callback);
   

  //if(err) throw err;
}
module.exports.getUniversityRoleUserByUnivID = function(univ_ID,callback){
	const query = {Univ_ID: univ_ID, Active: true}
	UniversityRoleUser.find(query,callback);
}

module.exports.deleteUniversityUserRole = function(id, callback){ 
var query = { _id: id };
console.log("db" + id);
UniversityRoleUser.update(query, {Active:false}, callback);
} 

module.exports.RemoveUniversityUserRoleByRoleID = function(roleId, callback){ 
var query = { Role_ID: roleId };

UniversityRoleUser.remove(query, callback);
}

module.exports.getAllUniversityRoleUser = function(callback){	

	UniversityRoleUser.find("",callback);
}

module.exports.updateUniversityRoleUser = function(universityRoleUser, callback){ 
var query = { _id: universityRoleUser.id };
console.log(query);
UniversityRoleUser.update(query, {username: universityRoleUser.username,Email_ID:universityRoleUser.Email_ID,Mobile_No:universityRoleUser.Mobile_No,Department:universityRoleUser.Department}, callback);
} 


module.exports.udpateProfile = function(newUniversityRoleUser, callback){ 
var query = { UniversityRoleUser_ID: newUniversityRoleUser.UniversityRoleUser_ID };
//UniversityRoleUser.update(query, {UniversityRoleUser_Heading: newUniversityRoleUser.UniversityRoleUser_Heading,UniversityRoleUser_Bio:newUniversityRoleUser.UniversityRoleUser_Bio,UniversityRoleUser_Name:newUniversityRoleUser.UniversityRoleUser_Name}, callback);
} 

module.exports.updatePassword = function(user, callback){ 
var query = { username	: user.EmailID  };
UniversityRoleUser.update(query, {Pwd: user.PWD, isPasswordChanged: user.isPasswordChanged}, callback);
}
