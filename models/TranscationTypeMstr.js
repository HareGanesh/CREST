const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');



const TranscationTypeMstrSchema = mongoose.Schema({

  Tran_Type_ID:{
  type: String
  },

  Tran_Type_Name:{
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

const TranscationTypeMaster = module.exports = mongoose.model('Tran_Type_Det', TranscationTypeMstrSchema,'Tran_Type_Det');

module.exports.getTranscationTypeMstrById = function(id, callback){
	TranscationTypeMaster.findById(id, callback);
}

module.exports.getTranscationTypeMstrByName = function(CategoryName,callback){
	const query = {CategoryName: CategoryName}
	TranscationTypeMaster.findOne(query,callback);}

module.exports.AddTranscationTypeMstr = function(newTranscationTypeMstr, callback){ 
	console.log(newTranscationTypeMstr);
      newTranscationTypeMstr.save(callback);
}

module.exports.getAllTranscationType = function(callback){	
	TranscationTypeMaster.find("",callback);}

module.exports.DeleteTranscationTypeById = function(OrgnID, callback){ 
var query = { OrgnID: OrgnID };
TranscationTypeMaster.update(query, {Active: false}, callback);}





