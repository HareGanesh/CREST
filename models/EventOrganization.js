const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const EventOrganizationSchema = mongoose.Schema({



  EventID:{
    type: String
  },
 OrgnID:{
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

const EventOrganization = module.exports = mongoose.model('EventOrganization', EventOrganizationSchema,'EventOrganization');

module.exports.getEventOrganizationById = function(id, callback){
	EventOrganization.findById(id, callback);
}

module.exports.getEventOrganizationByEventID = function(EventID,callback){
	const query = {EventID: EventID}
	EventOrganization.find(query,callback);}

module.exports.AddEventOrganization = function(newEventOrganization, callback){ 
	console.log(newEventOrganization);
      newEventOrganization.save(callback);
}	  
	  
module.exports.getAllEventOrganization = function(callback){	
	EventOrganization.find("",callback);
}


module.exports.RemoveEventOrganizationByEventID = function(EventID, callback){ 
var query = { EventID: EventID };
EventOrganization.update(query, callback);}


module.exports.DeleteEventOrganizationByEventID = function(EventID, callback){ 
var query = { EventID: EventID };
EventOrganization.update(query, {Active: false}, callback);}

module.exports.getEventOrganizerByOrgNo = function(OrganizerNo, callback){
	const query = {OrgnID: OrganizerNo}
	EventOrganization.find(query,callback);} 


