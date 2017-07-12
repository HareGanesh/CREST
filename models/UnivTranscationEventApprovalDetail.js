const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');



const UnivTranscationEventApprovalDetailMstrSchema = mongoose.Schema({

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
  
  EventID:{
	  type: String
  },
  
  EventTitile:
  {
	  type:String
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
  },
  
  TranscationStatus:{
	  type:String,
	  default:'O'
  }


});

const UnivTranscationEventApprovalDetailMaster = module.exports = mongoose.model('Univ_Tran_Event_Approval_Det', UnivTranscationEventApprovalDetailMstrSchema,'Univ_Tran_Event_Approval_Det');

// module.exports.getUnivTranscationTypeDetailByUnivIDAndTransType = function(univID, transTypeID, callback){ 

	// var query = { 'Univ_ID': parseInt(univID), 'Tran_Type_ID': parseInt(transTypeID)};
	// console.log(query);
	// UnivTranscationTypeDetailMaster.find(query, callback);
// }

// module.exports.getUnivTranscationTypeDetailMstrByName = function(CategoryName,callback){
	// const query = {CategoryName: CategoryName}
	// UnivTranscationTypeDetailMaster.findOne(query,callback);}

module.exports.AddUnivTranscationEventApprovalDetail = function(newUnivTranscationEventApprovalDetailMstr, callback){ 
	
      newUnivTranscationEventApprovalDetailMstr.save(callback);
}

module.exports.getAllUnivTranscationEventApprovalDetail = function(callback){	
	UnivTranscationEventApprovalDetailMaster.find("",callback);}
	
	module.exports.getAllUnivTranscationEventApprovalDetailByUnivID = function(univID, maskID, callback)
	{	 
	var query = { Univ_ID: univID, Mask_ID: {$lte:maskID}, Status:0, TranscationStatus:{$ne:'R'}};
	console.log(query);
	UnivTranscationEventApprovalDetailMaster.find(query,callback);
	}


module.exports.getAllUnivTranscationEventApprovalDetailInfoByUnivID = function(univID, maskID, callback)
	{	 
	var query = { Univ_ID: univID, Mask_ID: {$lte:maskID}, Status:0, TransactionStatus:{$ne:'R'}};
	UnivTranscationEventApprovalDetailMaster.aggregate([
	{ $match: {
            Univ_ID: parseInt(univID),
			Mask_ID: {$lte:parseInt(maskID)},
			Status:0,
			TransactionStatus:{$ne:'R'}
        }},
    {
      
		$lookup:
        {
          from: "Student",
          localField: "Student_ID",
          foreignField: "Student_ID",
          as: "Student_Info"
        }
   }
], callback);}
	
	
	
module.exports.getMaxTransApprovalID = function(callback){
	 
	 UnivTranscationEventApprovalDetailMaster.find("",callback).sort({Tran_Approval_IDNumber :-1}).limit(1);
		}
	
module.exports.getMaxTransApprovalNumberID = function(callback){
	 
	 UnivTranscationEventApprovalDetailMaster.find("",callback).sort({Tran_Approval_IDNumber :-1}).limit(1);
		}
	
module.exports.UpdateUnivTranscationEventApprovalDetailByTranApprovalID = function(TransApprovalDt, callback)
{ 
var query = { Tran_Approval_ID: TransApprovalDt.Tran_Approval_ID };
UnivTranscationEventApprovalDetailMaster.update(query, {Status:TransTypeDet.Status}, callback);
}

module.exports.UpdateUnivEventTranscationStatusByTranApprovalID = function(TransApprovalDt, callback)
{ 
var query = { Tran_Approval_ID: TransApprovalDt };
UnivTranscationEventApprovalDetailMaster.update(query, {TranscationStatus:'R'}, callback);
}

module.exports.DeleteUnivTranscationEventApprovalDetailByApprovalId = function(Tran_Approval_ID, callback){ 

var query = { Tran_Approval_ID: Tran_Approval_ID };
console.log(query);
UnivTranscationEventApprovalDetailMaster.remove(query, callback);
}




