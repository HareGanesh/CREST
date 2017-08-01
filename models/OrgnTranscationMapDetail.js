const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');



const OrgnTranscationMapDetailMstrSchema = mongoose.Schema({

  Tran_Map_ID:{
  type: Number
  },

  Role_ID:{
    type: Number
  },
  
  Priority:{
    type: Number
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

const OrgnTranscationMapDetailMaster = module.exports = mongoose.model('Orgn_Tran_Mapping_Det', OrgnTranscationMapDetailMstrSchema,'Orgn_Tran_Mapping_Det');

module.exports.getOrgnTranscationMapDetailByID = function(tranmapID, callback){
	const query = {'Tran_Map_ID': tranmapID}
	console.log(query);
	OrgnTranscationMapDetailMaster.find(query, callback).sort({Priority : 1});
}

module.exports.getOrgnTranscationMapDetailMstrByName = function(CategoryName,callback){
	const query = {CategoryName: CategoryName}
	OrgnTranscationMapDetailMaster.findOne(query,callback);}

module.exports.AddOrgnTranscationMapDetail = function(newOrgnTranscationMapDetailMstr, callback){ 
	console.log(newOrgnTranscationMapDetailMstr);
      newOrgnTranscationMapDetailMstr.save(callback);
}

module.exports.getAllOrgnTranscationMapDetail = function(callback){	
	OrgnTranscationMapDetailMaster.find("",callback);}
	
module.exports.getMaxTransMapID = function(callback){	
	//OrgnTranscationMapDetailMaster.find("",callback);
	
	// OrgnTranscationMapDetailMaster.find({ 'Tran_Map_ID' : 1 }).sort('Tran_Map_ID').limit.run( function(err, doc) {
     // var max = doc.Tran_Map_ID;
	 // console.log(max + " aaaa");
	 
	 OrgnTranscationMapDetailMaster.find("",callback).sort({Tran_Map_ID : -1}).limit(1);
		}
	
	

module.exports.DeleteOrgnTranscationMapDetailById = function(TransMapID, callback){ 
var query = { Tran_Map_ID: TransMapID };
console.log("deleted" + TransMapID);
OrgnTranscationMapDetailMaster.remove(query,  callback);}

module.exports.DeleteOrgnTranscationMapDetailByRoleId = function(Role_ID, callback){ 
var query = { Role_ID: Role_ID };

OrgnTranscationMapDetailMaster.remove(query,  callback);}



