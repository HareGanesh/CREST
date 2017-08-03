const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');



const OrgnTranscationEventApprovalDetailMstrSchema = mongoose.Schema({

  Tran_Approval_ID:{
  type: String
  },
  
  Tran_Approval_IDNumber:{
  type: Number
  },
  
  Orgn_ID:{
    type: Number
  },
  
  Employee_ID:{
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

const OrgnTranscationEventApprovalDetailMaster = module.exports = mongoose.model('Orgn_Tran_Event_Approval_Det', OrgnTranscationEventApprovalDetailMstrSchema,'Orgn_Tran_Event_Approval_Det');

// module.exports.getOrgnTranscationTypeDetailByOrgnIDAndTransType = function(OrgnID, transTypeID, callback){ 

	// var query = { 'Orgn_ID': parseInt(OrgnID), 'Tran_Type_ID': parseInt(transTypeID)};
	// console.log(query);
	// OrgnTranscationTypeDetailMaster.find(query, callback);
// }

// module.exports.getOrgnTranscationTypeDetailMstrByName = function(CategoryName,callback){
	// const query = {CategoryName: CategoryName}
	// OrgnTranscationTypeDetailMaster.findOne(query,callback);}

module.exports.AddOrgnTranscationEventApprovalDetail = function(newOrgnTranscationEventApprovalDetailMstr, callback){ 
	
      newOrgnTranscationEventApprovalDetailMstr.save(callback);
}

module.exports.getAllOrgnTranscationEventApprovalDetail = function(callback){	
	OrgnTranscationEventApprovalDetailMaster.find("",callback);}
	
	module.exports.getAllOrgnTranscationEventApprovalDetailByOrgnID = function(OrgnID, maskID, callback)
	{	 
	var query = { Orgn_ID: OrgnID, Mask_ID: {$lte:maskID}, Status:0, TranscationStatus:{$ne:'R'}};
	console.log(query);
	OrgnTranscationEventApprovalDetailMaster.find(query,callback);
	}


module.exports.getAllOrgnTranscationEventApprovalDetailInfoByOrgnID = function(OrgnID, maskID, callback)
	{	 
	var query = { Orgn_ID: OrgnID, Mask_ID: {$lte:maskID}, Status:0, TransactionStatus:{$ne:'R'}};
	OrgnTranscationEventApprovalDetailMaster.aggregate([
	{ $match: {
            Orgn_ID: parseInt(OrgnID),
			Mask_ID: {$lte:parseInt(maskID)},
			Status:0,
			TransactionStatus:{$ne:'R'}
        }},
    {
      
		$lookup:
        {
          from: "OrganizationRoleUser",
          localField: "id",
          foreignField: "Employee_ID",
          as: "Employee_Info"
        }
   }
], callback);}
	
module.exports.getAllOrgnTranscationEventApprovalDetailInfoByOrgnIDAndRoleID = function(OrgnID, roleId, callback)
	{	 
	//var query = { Orgn_ID: OrgnID, Mask_ID: {$lte:maskID}, Status:0, TransactionStatus:{$ne:'R'}};
	OrgnTranscationEventApprovalDetailMaster.aggregate([
	{ $match: {
            Orgn_ID: parseInt(OrgnID),
			Mask_ID: parseInt(roleId),
			Status:0,
			TransactionStatus:{$ne:'R'}
        }},
    {
      
		$lookup:
        {
          from: "OrganizationRoleUser",
          localField: "id",
          foreignField: "Employee_ID",
          as: "Employee_Info"
        }
   }
], callback);}
	
module.exports.getMaxTransApprovalID = function(callback){
	 
	 OrgnTranscationEventApprovalDetailMaster.find("",callback).sort({Tran_Approval_IDNumber :-1}).limit(1);
		}
	
module.exports.getMaxTransApprovalNumberID = function(callback){
	 
	 OrgnTranscationEventApprovalDetailMaster.find("",callback).sort({Tran_Approval_IDNumber :-1}).limit(1);
		}
	
module.exports.UpdateOrgnTranscationEventApprovalDetailByTranApprovalID = function(TransApprovalDt, callback)
{ 
var query = { Tran_Approval_ID: TransApprovalDt.Tran_Approval_ID };
OrgnTranscationEventApprovalDetailMaster.update(query, {Status:TransTypeDet.Status}, callback);
}

module.exports.UpdateOrgnEventTranscationStatusByTranApprovalID = function(TransApprovalDt, callback)
{ 
var query = { Tran_Approval_ID: TransApprovalDt };
OrgnTranscationEventApprovalDetailMaster.update(query, {TranscationStatus:'R'}, callback);
}

module.exports.DeleteOrgnTranscationEventApprovalDetailByApprovalId = function(Tran_Approval_ID, callback){ 

var query = { Tran_Approval_ID: Tran_Approval_ID };
console.log(query);
OrgnTranscationEventApprovalDetailMaster.remove(query, callback);
}




