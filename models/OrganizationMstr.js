const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Schema
const OrganizationMasterSchema = mongoose.Schema({


    id:{
		type: String
	},
Orgn_ID:{
  type: Number
  }, 
	OrgnName:{
		type: String
	},

	EmailID:{
		type: String
	},

	username:{
		type: String
		
	},

	 Pwd:{
		type: String
		

	},
	
	Title:{
		type:String,
		default:''
	},

	Overview:{
		type:String,
		default:''
	},
	
	isPasswordChanged:{
	  type: Boolean,
	  default:false
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

const OrganizationMaster = module.exports = mongoose.model('OrganizationMaster', OrganizationMasterSchema,'OrganizationMaster');

module.exports.getAllOrganization = function(callback){	
const query = {Active: 1};
	OrganizationMaster.find(query,callback);
}

module.exports.organizationId = function(callback){	

	OrganizationMaster.find("",callback).count();
}

module.exports.maxorganizationId = function(callback){	

	OrganizationMaster.find("",callback).sort({Orgn_ID :-1}).limit(1);
}

 module.exports.getOrganizationById = function(id,callback){
	const query = {_id: id};
	OrganizationMaster.findOne(query, callback);	
}


module.exports.getOrganizationsWithRoles = function(callback){
	OrganizationMaster.aggregate([	
    { $match: {
            Active: true
        }},
	{
      
		$lookup:
        {
          from: "Organization_Role_Master",
          localField: "Orgn_ID",
          foreignField: "Orgn_ID",
          as: "Roles_Info"
        }
   }
], callback);}

module.exports.getOrganizationByUserName = function(name,callback){
	const query = {username: name};
	OrganizationMaster.findOne(query, callback);	
} 

 module.exports.getOrganizationByName = function(name,callback){
	const query = {OrgnName: name};
	OrganizationMaster.findOne(query, callback);	
}
module.exports.addOrganization = function(organization, callback){

  organization.save(callback);
 // if(err) throw err;
}
module.exports.deleteOrganization = function(id, callback){ 
var query = { _id: id };
console.log("db" + id);
OrganizationMaster.update(query, {Active:0}, callback);
} 

module.exports.updateOrganization = function(organization, callback){ 
var query = { _id: organization.id };
OrganizationMaster.update(query, {OrgnName: organization.OrgnName,EmailID:organization.EmailID,Address:organization.Address,ContactNo:organization.ContactNo}, callback);
} 

module.exports.updatePassword = function(user, callback){ 
var query = { username	: user.EmailID };
console.log(query);
OrganizationMaster.update(query, {Pwd: user.PWD, isPasswordChanged: user.isPasswordChanged}, callback);
}

