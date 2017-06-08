const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');



const UnivTranscationTypeDetailMstrSchema = mongoose.Schema({

  Tran_Map_ID:{
  type: Number
  },

  Univ_ID:{
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

const UnivTranscationTypeDetailMaster = module.exports = mongoose.model('Univ_Tran_Type_Det', UnivTranscationTypeDetailMstrSchema,'Univ_Tran_Type_Det');

module.exports.getUnivTranscationTypeDetailByUnivIDAndTransType = function(univID, transTypeID, callback){ 

	var query = { 'Univ_ID': parseInt(univID), 'Tran_Type_ID': parseInt(transTypeID)};
	console.log(query);
	UnivTranscationTypeDetailMaster.find(query, callback);
}

module.exports.getUnivTranscationTypeDetailMstrByName = function(CategoryName,callback){
	const query = {CategoryName: CategoryName}
	UnivTranscationTypeDetailMaster.findOne(query,callback);}

module.exports.AddUnivTranscationTypeDetail = function(newUnivTranscationTypeDetailMstr, callback){ 
	console.log(newUnivTranscationTypeDetailMstr);
      newUnivTranscationTypeDetailMstr.save(callback);
}

module.exports.getAllUnivTranscationTypeDetail = function(callback){	
	UnivTranscationTypeDetailMaster.find("",callback);}
	
module.exports.getMaxTransMapID = function(callback){	
	//UnivTranscationTypeDetailMaster.find("",callback);
	
	// UnivTranscationTypeDetailMaster.find({ 'Tran_Map_ID' : 1 }).sort('Tran_Map_ID').limit.run( function(err, doc) {
     // var max = doc.Tran_Map_ID;
	 // console.log(max + " aaaa");
	 
	 UnivTranscationTypeDetailMaster.find("",callback).sort({Tran_Map_ID : -1}).limit(1);




	}
	
	
module.exports.UpdateUnivTranscationTypeDetailByTranMapID = function(TransTypeDet, callback)
{ 
var query = { Tran_Map_ID: TransTypeDet.Tran_Map_ID };
UnivTranscationTypeDetailMaster.update(query, {No_of_Levels:TransTypeDet.No_of_Levels}, callback);
}

module.exports.DeleteUnivTranscationTypeDetailById = function(univID, callback){ 
var query = { Univ_ID: univID };
UnivTranscationTypeDetailMaster.update(query, {Active: false}, callback);}





