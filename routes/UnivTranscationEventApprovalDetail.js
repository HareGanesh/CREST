const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const UnivTranscationEventApprovalDetail = require('../models/UnivTranscationEventApprovalDetail');
const Event = require('../models/Event');
const EventUniversity = require('../models/EventUniversity');

router.post('/AddUnivTranscationEventApprovalDetail', (req, res, next) => {
	
	 
	
  let newUnivTranscationEventApprovalDetail = new UnivTranscationEventApprovalDetail({
  	Tran_Approval_ID: req.body.TransApprovalID,
	Tran_Approval_IDNumber: req.body.TransApprovalIDNumber,	
	Univ_ID:req.body.UniversityID,
	Student_ID:req.body.StudentID,
	EventID:req.body.EventID,
  	Tran_Map_ID: req.body.TransMapID,
	Prev_Approver_RID:req.body.PrevApproverRoleID,	
	Next_Approver_RID:req.body.NextApproverRoleID,
	Mask_ID:req.body.MaskID,
  	Status: req.body.Status,  
	Tran_Dt:"",
	Created_On: req.body.Created_On,
	Created_by: req.body.Created_by,
	Modified_On: req.body.Modified_On,
    Modified_by: req.body.Modified_by
  	});
  UnivTranscationEventApprovalDetail.AddUnivTranscationEventApprovalDetail(newUnivTranscationEventApprovalDetail, (err, UnivTranscationEventApprovalDetailx)=> {
	  
  		if(err){
      res.json({success: false, msg:'Failed to UnivTranscationEventApprovalDetail Creation.'});
    } else {
		
      res.json({success: true, msg:'UnivTranscationEventApprovalDetail Created.'});
    }
  });
});

router.post('/UpdateUnivTranscationTypeDetailByTranMapID', (req, res, next) => {
	
	 
	
  let newUnivTranscationEventApprovalDetail = new UnivTranscationEventApprovalDetail({
  	Tran_Approval_ID: req.body.TransApprovalID,
	Tran_Approval_IDNumber: req.body.TransApprovalIDNumber,
	Univ_ID:req.body.UniversityID,
	Student_ID:req.body.Student_ID,
  	Tran_Map_ID: req.body.TransMapID,
	Prev_Approver_RID:req.body.PrevApproverRoleID,	
	Next_Approver_RID:req.body.NextApproverRoleID,
	Mask_ID:req.body.MaskID,
  	Status: req.body.Status,  
	Tran_Dt:req.body.TranDt,
	Created_On: req.body.Created_On,
	Created_by: req.body.Created_by,
	Modified_On: req.body.Modified_On,
    Modified_by: req.body.Modified_by
  	});
  UnivTranscationEventApprovalDetail.UpdateUnivTranscationTypeDetailByTranMapID(newUnivTranscationEventApprovalDetail, (err, UnivTranscationEventApprovalDetailx)=> {
	  
  		if(err){
      res.json({success: false, msg:'Failed to UnivTranscationEventApprovalDetail updated.'});
    } else {
      res.json({success: true, msg:'UnivTranscationEventApprovalDetail updated.'});
    }
  });
});

// router.get('/getUnivTranscationEventApprovalDetailByID', (req, res) => {
  // var UnivTranscationMapDetailID = req.headers["UnivTranscationMapDetailID"];  
  // UnivTranscationMapDetail.getUnivTranscationMapDetailIDMstrById(UnivTranscationMapDetailID, (err,UnivTranscationMapDetail)=>{
    // if(err) {
		// throw err;		
	// }
     // else
	  // {		 
		  // res.json(UnivTranscationMapDetail);
	  // }
  // });  
// });



router.get('/getAllUnivTranscationEventApprovalDetail', (req, res) => {

console.log("Test");	
  UnivTranscationEventApprovalDetail.getAllUnivTranscationEventApprovalDetail((err,UnivTranscationEventApprovalDetail)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(UnivTranscationEventApprovalDetail); 
		  res.json(UnivTranscationEventApprovalDetail);
	  }
  });  
});

router.get('/getAllUnivTranscationEventApprovalDetailByUnivID', (req, res) => {
var univid = req.headers["univid"]; 
var maskID = req.headers["maskid"]; 

console.log("Test");	
  UnivTranscationEventApprovalDetail.getAllUnivTranscationEventApprovalDetailByUnivID(univid,maskID, (err,UnivTranscationEventApprovalDetail)=>{
    if(err) {	
		throw err;
	}
     else
	  {		
          console.log(UnivTranscationEventApprovalDetail); 
		  EventUniversity.getEventUniversityByUnivID(univid, (err,Event)=>{
			if(err) {
                                throw err;                            
                }
			else
                  {                     
				console.log("aaaa");			
				
                   res.json({UnivTranscationEventApprovalDetail:UnivTranscationEventApprovalDetail, evt:Event});
				  
                  }
			});  
          
		 
	  }
  });  
});

router.get('/getMaxTransApprovalID', (req, res) => {


  UnivTranscationEventApprovalDetail.getMaxTransApprovalID((err,UnivTranscationEventApprovalDetail)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(UnivTranscationEventApprovalDetail); 
		  res.json(UnivTranscationEventApprovalDetail);
	  }
  });  
});

router.get('/getMaxTransApprovalNumberID', (req, res) => {


  UnivTranscationEventApprovalDetail.getMaxTransApprovalNumberID((err,UnivTranscationEventApprovalDetail)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(UnivTranscationEventApprovalDetail); 
		  res.json(UnivTranscationEventApprovalDetail);
	  }
  });  
});

router.post('/DeleteUnivTranscationEventApprovalDetailByApprovalId', (req, res) => {
  var UnivTranscationEventApprovalDetailID = req.headers["UnivTranscationEventApprovalDetailID"]; 
 
  UnivTranscationEventApprovalDetail.DeleteUnivTranscationEventApprovalDetailByApprovalId(UnivTranscationEventApprovalDetailID, (err,UnivTranscationEventApprovalDetail)=>{
    if(err) {
		throw err;		
	}
     else
	  {	 
		  res.json(UnivTranscationEventApprovalDetail);
	  }
  });  
});


module.exports = router;
