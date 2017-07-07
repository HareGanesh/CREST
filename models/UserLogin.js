const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Schema
const UserLoginSchema = mongoose.Schema
({
    id :{type: String},

	TagID:{
		type: String
	},

	UserName:{
		type: String,
		required: true
	},

	 PWD:{
		type: String,
		required: true

	},
	
	// EmailID:{
		// type: String
	// },

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

const UserLogin = module.exports = mongoose.model('UserLogin', UserLoginSchema,'UserLogin');

module.exports.getUserById = function(id, callback){
	console.log(id);
	UserLogin.findById(id, callback);
}

module.exports.getUserByUserName = function(username, callback){
	const query = {UserName: username}
	UserLogin.findOne(query,callback);
}

module.exports.getUserByEmail = function(emailID, callback){
	const query = {EmailID: emailID}
	UserLogin.findOne(query,callback);
}

module.exports.getUserLogin = function(username,callback){
	const query = {UserName: username}
	UserLogin.findOne(query,callback);
}

module.exports.updatePassword = function(user, callback){ 
var query = { UserName	: user.EmailID };
UserLogin.update(query, {PWD: user.PWD}, callback);
}


module.exports.addUser = function(user, callback){	
	user.save( callback);
}
