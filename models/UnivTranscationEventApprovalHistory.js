const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');



const UnivTranscationEventApprovalHistorySchema = mongoose.Schema({

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

const UnivTranscationEventApprovalHistory = module.exports = mongoose.model('Univ_Tran_Event_Approval_History', UnivTranscationEventApprovalHistorySchema,'Univ_Tran_Event_Approval_History');

// module.exports.getUnivTranscationTypeDetailByUnivIDAndTransType = function(univID, transTypeID, callback){ 

	// var query = { 'Univ_ID': parseInt(univID), 'Tran_Type_ID': parseInt(transTypeID)};
	// console.log(query);
	// UnivTranscationTypeDetailMaster.find(query, callback);
// }

// module.exports.getUnivTranscationTypeDetailMstrByName = function(CategoryName,callback){
	// const query = {CategoryName: CategoryName}
	// UnivTranscationTypeDetailMaster.findOne(query,callback);}

module.exports.AddUnivTranscationEventApprovalHistory = function(newUnivTranscationEventApprovalHistory, callback){ 
	
      newUnivTranscationEventApprovalHistory.save(callback);
}

module.exports.getAllUnivTranscationEventApprovalHistory = function(callback){	
	UnivTranscationEventApprovalHistory.find("",callback);}
	
module.exports.getMaxTransEventApprovalHistoryID = function(callback){
	 
	 UnivTranscationEventApprovalHistory.find("",callback).sort({Tran_Approval_History_ID : -1}).limit(1);
		}
	
	
// module.exports.UpdateUnivTranscationTypeDetailByTranMapID = function(TransApprovalDt, callback)
// { 
// var query = { Tran_Approval_ID: TransApprovalDt.Tran_Approval_ID };
// UnivTranscationApprovalDetailMaster.update(query, {Status:TransTypeDet.Status}, callback);
// }

// module.exports.DeleteUnivTranscationTypeDetailById = function(univID, callback){ 
// var query = { Univ_ID: univID };
// UnivTranscationTypeDetailMaster.update(query, {Active: false}, callback);}





