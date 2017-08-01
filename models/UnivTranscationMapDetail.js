const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');



const UnivTranscationMapDetailMstrSchema = mongoose.Schema({

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

const UnivTranscationMapDetailMaster = module.exports = mongoose.model('Univ_Tran_Mapping_Det', UnivTranscationMapDetailMstrSchema,'Univ_Tran_Mapping_Det');

module.exports.getUnivTranscationMapDetailByID = function(tranmapID, callback){
	const query = {'Tran_Map_ID': tranmapID}
	console.log(query);
	UnivTranscationMapDetailMaster.find(query, callback).sort({Priority : 1});
}

module.exports.getUnivTranscationMapDetailMstrByName = function(CategoryName,callback){
	const query = {CategoryName: CategoryName}
	UnivTranscationMapDetailMaster.findOne(query,callback);}

module.exports.AddUnivTranscationMapDetail = function(newUnivTranscationMapDetailMstr, callback){ 
	console.log(newUnivTranscationMapDetailMstr);
      newUnivTranscationMapDetailMstr.save(callback);
}

module.exports.getAllUnivTranscationMapDetail = function(callback){	
	UnivTranscationMapDetailMaster.find("",callback);}
	
module.exports.getMaxTransMapID = function(callback){	
	//UnivTranscationMapDetailMaster.find("",callback);
	
	// UnivTranscationMapDetailMaster.find({ 'Tran_Map_ID' : 1 }).sort('Tran_Map_ID').limit.run( function(err, doc) {
     // var max = doc.Tran_Map_ID;
	 // console.log(max + " aaaa");
	 
	 UnivTranscationMapDetailMaster.find("",callback).sort({Tran_Map_ID : -1}).limit(1);




	}
	
	

module.exports.DeleteUnivTranscationMapDetailById = function(TransMapID, callback){ 
var query = { Tran_Map_ID: TransMapID };
console.log("deleted" + TransMapID);
UnivTranscationMapDetailMaster.remove(query,  callback);}

module.exports.DeleteUnivTranscationMapDetailByRoleId = function(Role_ID, callback){ 
var query = { Role_ID: Role_ID };

UnivTranscationMapDetailMaster.remove(query,  callback);}



