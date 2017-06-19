const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');



const UnivTranscationApprovalDetailMstrSchema = mongoose.Schema({

  Tran_Approval_ID:{
  type: String
  },
  
  Tran_Approval_IDNumber:{
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
	
	module.exports.getAllUnivTranscationApprovalDetailByUnivID = function(univID, maskID, callback)
	{	 
	var query = { Univ_ID: univID, Mask_ID: {$lte:maskID}, Status:0};
	console.log(query);
	UnivTranscationApprovalDetailMaster.find(query,callback);
	}
	
	
	
module.exports.getMaxTransApprovalID = function(callback){
	 
	 UnivTranscationApprovalDetailMaster.find("",callback).sort({Tran_Approval_IDNumber :-1}).limit(1);
		}
	
module.exports.getMaxTransApprovalNumberID = function(callback){
	 
	 UnivTranscationApprovalDetailMaster.find("",callback).sort({Tran_Approval_IDNumber :-1}).limit(1);
		}
	
module.exports.UpdateUnivTranscationApprovalDetailByTranApprovalID = function(TransApprovalDt, callback)
{ 
var query = { Tran_Approval_ID: TransApprovalDt.Tran_Approval_ID };
UnivTranscationApprovalDetailMaster.update(query, {Status:TransTypeDet.Status}, callback);
}

module.exports.DeleteUnivTranscationApprovalDetailByApprovalId = function(Tran_Approval_ID, callback){ 

var query = { Tran_Approval_ID: Tran_Approval_ID };
console.log(query);
UnivTranscationApprovalDetailMaster.remove(query, callback);
}




