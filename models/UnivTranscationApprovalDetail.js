const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');



const UnivTranscationApprovalDetailMstrSchema = mongoose.Schema({

  Tran_Approval_ID:{
  type: Number
  },
  
  Univ_ID:{
    type: Number
  },
  
  Student_ID:{
	  type: String
  },
  
  Tran_Map_ID:{
  type: Number
  },

  Prev_Approver_RID:{
	  type: Number
  },
  
  Next_Approver_RID:{
	  type: Number
  },
  
  Mask_ID:{
    type: Number
  },
  
  Status:{
    type: Number
  },

   Tran_Dt:{
		type: String
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

const UnivTranscationApprovalDetailMaster = module.exports = mongoose.model('Univ_Tran_Approval_Det', UnivTranscationApprovalDetailMstrSchema,'Univ_Tran_Approval_Det');

// module.exports.getUnivTranscationTypeDetailByUnivIDAndTransType = function(univID, transTypeID, callback){ 

	// var query = { 'Univ_ID': parseInt(univID), 'Tran_Type_ID': parseInt(transTypeID)};
	// console.log(query);
	// UnivTranscationTypeDetailMaster.find(query, callback);
// }

// module.exports.getUnivTranscationTypeDetailMstrByName = function(CategoryName,callback){
	// const query = {CategoryName: CategoryName}
	// UnivTranscationTypeDetailMaster.findOne(query,callback);}

module.exports.AddUnivTranscationApprovalDetail = function(newUnivTranscationApprovalDetailMstr, callback){ 
	
      newUnivTranscationApprovalDetailMstr.save(callback);
}

module.exports.getAllUnivTranscationApprovalDetail = function(callback){	
	UnivTranscationApprovalDetailMaster.find("",callback);}
	
module.exports.getMaxTransApprovalID = function(callback){
	 
	 UnivTranscationApprovalDetailMaster.find("",callback).sort({Tran_Approval_ID : -1}).limit(1);
		}
	
	
// module.exports.UpdateUnivTranscationTypeDetailByTranMapID = function(TransTypeDet, callback)
// { 
// var query = { Tran_Map_ID: TransTypeDet.Tran_Map_ID };
// UnivTranscationTypeDetailMaster.update(query, {No_of_Levels:TransTypeDet.No_of_Levels}, callback);
// }

// module.exports.DeleteUnivTranscationTypeDetailById = function(univID, callback){ 
// var query = { Univ_ID: univID };
// UnivTranscationTypeDetailMaster.update(query, {Active: false}, callback);}





