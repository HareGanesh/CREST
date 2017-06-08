const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const UnivTranscationMaskDetail = require('../models/UnivTranscationMaskDetail');

router.post('/AddUnivTranscationMaskDetail', (req, res, next) => {
	
	 console.log(req.body);
	
  let newUnivTranscationMaskDetail = new UnivTranscationMaskDetail({
  	Mask_ID: req.body.MaskID,
  	Tran_Map_ID: req.body.TransMapID,
	Priority:req.body.Priority,
  	Active: req.body.Active,  
	Created_On: req.body.Created_On,
	Created_by: req.body.Created_by,
	Modified_On: req.body.Modified_On,
    Modified_by: req.body.Modified_by
  	});
  UnivTranscationMaskDetail.AddUnivTranscationMaskDetail(newUnivTranscationMaskDetail, (err, UnivTranscationMaskDetail)=> {
	  console.log(newUnivTranscationMaskDetail);
  		if(err){
      res.json({success: false, msg:'Failed to UnivTranscationMaskDetail Creation.'});
    } else {
      res.json({success: true, msg:'UnivTranscationMaskDetail Created.'});
    }
  });
});

router.get('/GetUnivTranscationMaskDetailByID', (req, res) => {
  var UnivTranscationMaskDetailID = req.headers["UnivTranscationMaskDetailID"];  
  UnivTranscationMaskDetail.getUnivTranscationMaskDetailIDMstrById(UnivTranscationMaskDetailID, (err,UnivTranscationMaskDetail)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(UnivTranscationMaskDetail);
	  }
  });  
});



router.get('/getAllUnivTranscationMaskDetail', (req, res) => {

console.log("Test");	
  UnivTranscationMaskDetail.getAllUnivTranscationMaskDetail((err,UnivTranscationMaskDetail)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(UnivTranscationMaskDetail); 
		  res.json(UnivTranscationMaskDetail);
	  }
  });  
});

router.get('/getMaxTransMapID', (req, res) => {

console.log("Test Max");	
  UnivTranscationMaskDetail.getMaxTransMapID((err,UnivTranscationMaskDetail)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(UnivTranscationMaskDetail); 
		  res.json(UnivTranscationMaskDetail);
	  }
  });  
});

router.post('/RemoveUnivTranscationMaskDetailByID', (req, res) => {
  var UnivTranscationMaskDetailID = req.headers["UnivTranscationMaskDetailID"]; 
console.log(CategoryID);  
  UnivTranscationMaskDetail.DeleteUnivTranscationMaskDetailById(UnivTranscationMaskDetailID, (err,UnivTranscationMaskDetail)=>{
    if(err) {
		throw err;		
	}
     else
	  {	console.log(UnivTranscationMaskDetail);	 
		  res.json(UnivTranscationMaskDetail);
	  }
  });  
});


module.exports = router;
