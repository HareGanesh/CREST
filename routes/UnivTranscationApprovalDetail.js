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



// router.get('/getAllUnivTranscationMapDetail', (req, res) => {

// console.log("Test");	
  // UnivTranscationMapDetail.getAllUnivTranscationMapDetail((err,UnivTranscationMapDetail)=>{
    // if(err) {	
		// throw err;
	// }
     // else
	  // {		console.log(UnivTranscationMapDetail); 
		  // res.json(UnivTranscationMapDetail);
	  // }
  // });  
// });

router.get('/getMaxTransApprovalID', (req, res) => {

console.log("Test Max");	
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

// router.post('/RemoveUnivTranscationMapDetailByID', (req, res) => {
  // var UnivTranscationMapDetailID = req.headers["UnivTranscationMapDetailID"]; 
// console.log(CategoryID);  
  // UnivTranscationMapDetail.DeleteUnivTranscationMapDetailById(UnivTranscationMapDetailID, (err,UnivTranscationMapDetail)=>{
    // if(err) {
		// throw err;		
	// }
     // else
	  // {	console.log(UnivTranscationMapDetail);	 
		  // res.json(UnivTranscationMapDetail);
	  // }
  // });  
// });


module.exports = router;
