const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');



const OrgnTranscationMaskDetailMstrSchema = mongoose.Schema({

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

const OrgnTranscationMaskDetailMaster = module.exports = mongoose.model('Orgn_Tran_Mask_Det', OrgnTranscationMaskDetailMstrSchema,'Orgn_Tran_Mask_Det');

module.exports.getOrgnTranscationMaskDetailMstrById = function(id, callback){
	OrgnTranscationMaskDetailMaster.findById(id, callback);
}

module.exports.getOrgnTranscationMaskDetailMstrByName = function(CategoryName,callback){
	const query = {CategoryName: CategoryName}
	OrgnTranscationMaskDetailMaster.findOne(query,callback);}

module.exports.AddOrgnTranscationMaskDetail = function(newOrgnTranscationMaskDetailMstr, callback){ 
	console.log(newOrgnTranscationMaskDetailMstr);
      newOrgnTranscationMaskDetailMstr.save(callback);
}

module.exports.getAllOrgnTranscationMaskDetail = function(callback){	
	OrgnTranscationMaskDetailMaster.find("",callback);}
	
module.exports.getMaxTransMapID = function(callback){	
	//UnivTranscationMaskDetailMaster.find("",callback);
	
	// UnivTranscationMaskDetailMaster.find({ 'Tran_Map_ID' : 1 }).sort('Tran_Map_ID').limit.run( function(err, doc) {
     // var max = doc.Tran_Map_ID;
	 // console.log(max + " aaaa");
	 
	 OrgnTranscationMaskDetailMaster.find("",callback).sort({Tran_Map_ID : -1}).limit(1);
	}	

module.exports.DeleteOrgnTranscationMaskDetailById = function(TransMapID, callback){ 
var query = { Tran_Map_ID: TransMapID };
OrgnTranscationMaskDetailMaster.remove(query,  callback);}





