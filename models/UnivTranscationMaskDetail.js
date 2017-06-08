const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');



const UnivTranscationMaskDetailMstrSchema = mongoose.Schema({

  Tran_Map_ID:{
  type: Number
  },

  Mask_ID:{
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

const UnivTranscationMaskDetailMaster = module.exports = mongoose.model('Univ_Tran_Mask_Det', UnivTranscationMaskDetailMstrSchema,'Univ_Tran_Mask_Det');

module.exports.getUnivTranscationMaskDetailMstrById = function(id, callback){
	UnivTranscationMaskDetailMaster.findById(id, callback);
}

module.exports.getUnivTranscationMaskDetailMstrByName = function(CategoryName,callback){
	const query = {CategoryName: CategoryName}
	UnivTranscationMaskDetailMaster.findOne(query,callback);}

module.exports.AddUnivTranscationMaskDetail = function(newUnivTranscationMaskDetailMstr, callback){ 
	console.log(newUnivTranscationMaskDetailMstr);
      newUnivTranscationMaskDetailMstr.save(callback);
}

module.exports.getAllUnivTranscationMaskDetail = function(callback){	
	UnivTranscationMaskDetailMaster.find("",callback);}
	
module.exports.getMaxTransMapID = function(callback){	
	//UnivTranscationMaskDetailMaster.find("",callback);
	
	// UnivTranscationMaskDetailMaster.find({ 'Tran_Map_ID' : 1 }).sort('Tran_Map_ID').limit.run( function(err, doc) {
     // var max = doc.Tran_Map_ID;
	 // console.log(max + " aaaa");
	 
	 UnivTranscationMaskDetailMaster.find("",callback).sort({Tran_Map_ID : -1}).limit(1);




	}
	

module.exports.DeleteUnivTranscationMaskDetailById = function(TransMapID, callback){ 
var query = { Tran_Map_ID: TransMapID };
UnivTranscationMaskDetailMaster.remove(query,  callback);}





