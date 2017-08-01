const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');



const OrgnTranscationTypeDetailMstrSchema = mongoose.Schema({

  Tran_Map_ID:{
  type: Number
  },

  Orgn_ID:{
    type: Number
  },
  
  Tran_Type_ID:{
    type: Number
  },
  
  No_of_Levels:{
    type: Number
  },

  Active:{
	type: Boolean
  },
	
  Tran_Flow_Start_DT:{
	type:Date
  },
	
  Tran_Flow_End_DT:{
	type:Date,
	default:''
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

const OrgnTranscationTypeDetailMaster = module.exports = mongoose.model('Orgn_Tran_Type_Det', OrgnTranscationTypeDetailMstrSchema,'Orgn_Tran_Type_Det');

module.exports.getOrgnTranscationTypeDetailByOrgnID = function(orgnID, callback){ 

	var query = { 'Orgn_ID': parseInt(orgnID) };	
	OrgnTranscationTypeDetailMaster.find(query, callback);
}

module.exports.getOrgnTranscationTypeDetailByOrgnIDAndTransType = function(orgnID, transTypeID, callback){ 

	var query = { 'Orgn_ID': parseInt(orgnID), 'Tran_Type_ID': parseInt(transTypeID) };
	console.log(query);
	OrgnTranscationTypeDetailMaster.find(query, callback);
}

module.exports.getOrgnTranscationTypeDetailByOrgnIDAndTransTypeAndEffDate = function(orgnID, transTypeID, callback){ 

	var query = { 'Orgn_ID': parseInt(orgnID), 'Tran_Type_ID': parseInt(transTypeID)};
	
	OrgnTranscationTypeDetailMaster.find(query,callback).sort({Tran_Map_ID : -1}).limit(1);	
}

module.exports.getOrgnTranscationTypeDetailByOrgnIDAndTransTypeAndEffDateBetweenStartAndEnd = function(orgnID, transTypeID, startDate, callback){ 

	var query = { 'Orgn_ID': parseInt(orgnID), 'Tran_Type_ID': parseInt(transTypeID), Tran_Flow_Start_DT: new Date(startDate) };
	
	OrgnTranscationTypeDetailMaster.find(query,callback).sort({Tran_Map_ID : -1}).limit(1);	
}

module.exports.getOrgnTranscationTypeDetailByOrgnIDAndTransTypeAndCurrentDate = function(orgnID, transTypeID, callback){ 

	var query = { 'Orgn_ID': parseInt(orgnID), 'Tran_Type_ID': parseInt(transTypeID), Tran_Flow_Start_DT: {$lte:new Date()} };
	
	OrgnTranscationTypeDetailMaster.find(query,callback).sort({Tran_Map_ID : -1}).limit(1);	
}

module.exports.getOrgnTranscationTypeDetailMstrByName = function(CategoryName,callback){
	const query = {CategoryName: CategoryName}
	OrgnTranscationTypeDetailMaster.findOne(query,callback);}

module.exports.AddOrgnTranscationTypeDetail = function(newOrgnTranscationTypeDetailMstr, callback){ 
	console.log(newOrgnTranscationTypeDetailMstr);
      newOrgnTranscationTypeDetailMstr.save(callback);
}

module.exports.getAllOrgnTranscationTypeDetail = function(callback){	
	OrgnTranscationTypeDetailMaster.find("",callback);}
	
module.exports.getAllOrgnTranscationTypeListByOrgnIDAndTranType = function(orgnID, transTypeID, callback){	
var query = { 'Orgn_ID': parseInt(orgnID), 'Tran_Type_ID': parseInt(transTypeID)};
	OrgnTranscationTypeDetailMaster.find(query,callback);}
	
module.exports.getMaxTransMapID = function(callback){	
	//OrgnTranscationTypeDetailMaster.find("",callback);
	
	// OrgnTranscationTypeDetailMaster.find({ 'Tran_Map_ID' : 1 }).sort('Tran_Map_ID').limit.run( function(err, doc) {
     // var max = doc.Tran_Map_ID;
	 // console.log(max + " aaaa");
	 
	 OrgnTranscationTypeDetailMaster.find("",callback).sort({Tran_Map_ID : -1}).limit(1);




	}
	
	
module.exports.UpdateOrgnTranscationTypeDetailByTranMapID = function(TransTypeDet, callback)
{ 
var query = { Tran_Map_ID: TransTypeDet.Tran_Map_ID };
OrgnTranscationTypeDetailMaster.update(query, {No_of_Levels:TransTypeDet.No_of_Levels, Tran_Flow_End_DT:TransTypeDet.Tran_Flow_End_DT}, callback);
}

module.exports.DeleteOrgnTranscationTypeDetailById = function(orgnID, callback){ 
var query = { Orgn_ID: orgnID };
OrgnTranscationTypeDetailMaster.update(query, {Active: false}, callback);}





