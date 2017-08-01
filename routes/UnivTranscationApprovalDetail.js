const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const UnivTranscationApprovalDetail = require('../models/UnivTranscationApprovalDetail');

router.post('/AddUnivTranscationApprovalDetail', (req, res, next) => {
	
	 
	
  let newUnivTranscationApprovalDetail = new UnivTranscationApprovalDetail({
  	Tran_Approval_ID: req.body.TransApprovalID,
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
  UnivTranscationApprovalDetail.AddUnivTranscationApprovalDetail(newUnivTranscationApprovalDetail, (err, UnivTranscationApprovalDetailx)=> {
	  
  		if(err){
      res.json({success: false, msg:'Failed to UnivTranscationapprovalDetail Creation.'});
    } else {
		
      res.json({success: true, msg:'UnivTranscationApprovalDetail Created.'});
    }
  });
});

router.post('/UpdateUnivTranscationTypeDetailByTranMapID', (req, res, next) => {
	
	 
	
  let newUnivTranscationApprovalDetail = new UnivTranscationApprovalDetail({
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
  UnivTranscationApprovalDetail.UpdateUnivTranscationTypeDetailByTranMapID(newUnivTranscationApprovalDetail, (err, UnivTranscationApprovalDetailx)=> {
	  
  		if(err){
      res.json({success: false, msg:'Failed to UnivTranscationapprovalDetail updated.'});
    } else {
      res.json({success: true, msg:'UnivTranscationApprovalDetail updated.'});
    }
  });
});

// router.get('/getUnivTranscationApprovalDetailByID', (req, res) => {
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



router.get('/getAllUnivTranscationApprovalDetail', (req, res) => {

console.log("Test");	
  UnivTranscationApprovalDetail.getAllUnivTranscationApprovalDetail((err,UnivTranscationApprovalDetail)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(UnivTranscationApprovalDetail); 
		  res.json(UnivTranscationApprovalDetail);
	  }
  });  
});

router.get('/getAllUnivTranscationApprovalDetailByUnivID', (req, res) => {
var univid = req.headers["univid"]; 
var maskID = req.headers["maskid"]; 
console.log("Test");	
  UnivTranscationApprovalDetail.getAllUnivTranscationApprovalDetailByUnivID(univid,maskID, (err,UnivTranscationApprovalDetail)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(UnivTranscationApprovalDetail); 
		  res.json(UnivTranscationApprovalDetail);
	  }
  });  
});

router.get('/getAllUnivTranscationApprovalDetailInfoByUnivID', (req, res) => {
var univid = req.headers["univid"]; 
var maskID = req.headers["maskid"]; 
console.log(univid + maskID);	
  UnivTranscationApprovalDetail.getAllUnivTranscationApprovalDetailInfoByUnivID(univid,maskID, (err,UnivTranscationApprovalDetail)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(UnivTranscationApprovalDetail); 
		  res.json(UnivTranscationApprovalDetail);
	  }
  });  
});


router.get('/getAllUnivTranscationApprovalDetailInfoByUnivIDAndRoleID', (req, res) => {
var univid = req.headers["univid"]; 
var roleId = req.headers["roleId"]; 
console.log(univid + maskID);	
  UnivTranscationApprovalDetail.getAllUnivTranscationApprovalDetailInfoByUnivIDAndRoleID(univid,roleId, (err,UnivTranscationApprovalDetail)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(UnivTranscationApprovalDetail); 
		  res.json(UnivTranscationApprovalDetail);
	  }
  });  
});


router.get('/getMaxTransApprovalID', (req, res) => {


  UnivTranscationApprovalDetail.getMaxTransApprovalID((err,UnivTranscationApprovalDetail)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(UnivTranscationApprovalDetail); 
		  res.json(UnivTranscationApprovalDetail);
	  }
  });  
});

router.get('/getMaxTransApprovalNumberID', (req, res) => {


  UnivTranscationApprovalDetail.getMaxTransApprovalNumberID((err,UnivTranscationApprovalDetail)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(UnivTranscationApprovalDetail); 
		  res.json(UnivTranscationApprovalDetail);
	  }
  });  
});

router.post('/DeleteUnivTranscationApprovalDetailByApprovalId', (req, res) => {
  var UnivTranscationApprovalDetailID = req.headers["UnivTranscationApprovalDetailID"]; 
 
  UnivTranscationApprovalDetail.DeleteUnivTranscationApprovalDetailByApprovalId(UnivTranscationApprovalDetailID, (err,UnivTranscationApprovalDetail)=>{
    if(err) {
		throw err;		
	}
     else
	  {	 
		  res.json(UnivTranscationApprovalDetail);
	  }
  });  
});


module.exports = router;
