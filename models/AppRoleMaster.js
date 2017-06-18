const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Schema
const AppRoleMasterSchema = mongoose.Schema
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

const AppRoleMaster = module.exports = mongoose.model('AppRoleMaster', AppRoleMasterSchema,'AppRoleMaster');

module.exports.getUserById = function(id, callback){
	console.log(id);
	AppRoleMaster.findById(id, callback);
}

module.exports.getAppRoleMaster = function(username,callback){
	const query = {UserName: username}
	AppRoleMaster.findOne(query,callback);
}



