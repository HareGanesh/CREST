const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const EventUniversitySchema = mongoose.Schema({



  EventID:{
    type: String
  },
  Univ_ID:{
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

const EventUniversity = module.exports = mongoose.model('EventUniversity', EventUniversitySchema,'EventUniversity');

module.exports.getEventUniversityById = function(id, callback){
	EventUniversity.findById(id, callback);
}

module.exports.getEventUniversityByEventID = function(EventID,callback){
	const query = {EventID: EventID}
	EventUniversity.find(query,callback);}

module.exports.AddEventUniversity = function(newEventUniversity, callback){ 
	newEventUniversity.save(callback);
}	  
	  
module.exports.getAllEventUniversity = function(callback){	
	EventUniversity.find("",callback);
}


module.exports.RemoveEventUniversityByEventID = function(EventID, callback){ 
var query = { EventID: EventID };
EventUniversity.remove(query, callback);}


module.exports.DeleteEventUniversityByEventID = function(EventID, callback){ 
var query = { EventID: EventID };
EventUniversity.update(query, {Active: false}, callback);}

module.exports.getEventUniversityByUnivID = function(univID, callback){
	const query = {Univ_ID: univID}
	EventUniversity.find(query,callback);} 


