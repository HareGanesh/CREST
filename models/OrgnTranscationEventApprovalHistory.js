const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');



const OrgnTranscationEventApprovalHistorySchema = mongoose.Schema({

  Tran_Approval_History_ID:{
  type: Number
  },
  
  Tran_Approval_ID:{
  type: String
  },
  
  Approved_By:{
    type: String
  },
  
  Approved_On:{
	  type: String
  }, 
  
  
  Mask_ID:{
    type: Number
  },
  
  Status:{
    type: Number
  },

   Comments:{
		type: String
	}


});

const OrgnTranscationEventApprovalHistory = module.exports = mongoose.model('Orgn_Tran_Event_Approval_History', OrgnTranscationEventApprovalHistorySchema,'Orgn_Tran_Event_Approval_History');

// module.exports.getOrgnTranscationTypeDetailByOrgnIDAndTransType = function(OrgnID, transTypeID, callback){ 

	// var query = { 'Orgn_ID': parseInt(OrgnID), 'Tran_Type_ID': parseInt(transTypeID)};
	// console.log(query);
	// OrgnTranscationTypeDetailMaster.find(query, callback);
// }

// module.exports.getOrgnTranscationTypeDetailMstrByName = function(CategoryName,callback){
	// const query = {CategoryName: CategoryName}
	// OrgnTranscationTypeDetailMaster.findOne(query,callback);}

module.exports.AddOrgnTranscationEventApprovalHistory = function(newOrgnTranscationEventApprovalHistory, callback){ 
	
      newOrgnTranscationEventApprovalHistory.save(callback);
}

module.exports.getAllOrgnTranscationEventApprovalHistory = function(callback){	
	OrgnTranscationEventApprovalHistory.find("",callback);}
	
module.exports.getMaxTransEventApprovalHistoryID = function(callback){
	 
	 OrgnTranscationEventApprovalHistory.find("",callback).sort({Tran_Approval_History_ID : -1}).limit(1);
		}
	
	
// module.exports.UpdateOrgnTranscationTypeDetailByTranMapID = function(TransApprovalDt, callback)
// { 
// var query = { Tran_Approval_ID: TransApprovalDt.Tran_Approval_ID };
// OrgnTranscationApprovalDetailMaster.update(query, {Status:TransTypeDet.Status}, callback);
// }

// module.exports.DeleteUnivTranscationTypeDetailById = function(univID, callback){ 
// var query = { Univ_ID: univID };
// UnivTranscationTypeDetailMaster.update(query, {Active: false}, callback);}





