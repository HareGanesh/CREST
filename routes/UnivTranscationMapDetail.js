const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const UnivTranscationMapDetail = require('../models/UnivTranscationMapDetail');

router.post('/AddUnivTranscationMapDetail', (req, res, next) => {
	
	 console.log(req.body);
	
  let newUnivTranscationMapDetail = new UnivTranscationMapDetail({
  	Priority: req.body.Priority,
  	Tran_Map_ID: req.body.TransMapID,
	Role_ID:req.body.RoleID,	
  	Active: req.body.Active,  
	Created_On: req.body.Created_On,
	Created_by: req.body.Created_by,
	Modified_On: req.body.Modified_On,
    Modified_by: req.body.Modified_by
  	});
  UnivTranscationMapDetail.AddUnivTranscationMapDetail(newUnivTranscationMapDetail, (err, UnivTranscationMapDetail)=> {
	  console.log(newUnivTranscationMapDetail);
  		if(err){
      res.json({success: false, msg:'Failed to UnivTranscationMapDetail Creation.'});
    } else {
      res.json({success: true, msg:'UnivTranscationMapDetail Created.'});
    }
  });
});

router.get('/getUnivTranscationMapDetailByID', (req, res) => {
  var UnivTranscationMapDetailID = req.headers["UnivTranscationMapDetailID"];  
  UnivTranscationMapDetail.getUnivTranscationMapDetailIDMstrById(UnivTranscationMapDetailID, (err,UnivTranscationMapDetail)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(UnivTranscationMapDetail);
	  }
  });  
});



router.get('/getAllUnivTranscationMapDetail', (req, res) => {

console.log("Test");	
  UnivTranscationMapDetail.getAllUnivTranscationMapDetail((err,UnivTranscationMapDetail)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(UnivTranscationMapDetail); 
		  res.json(UnivTranscationMapDetail);
	  }
  });  
});

router.get('/getMaxTransMapID', (req, res) => {

console.log("Test Max");	
  UnivTranscationMapDetail.getMaxTransMapID((err,UnivTranscationMapDetail)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(UnivTranscationMapDetail); 
		  res.json(UnivTranscationMapDetail);
	  }
  });  
});

router.post('/RemoveUnivTranscationMapDetailByID', (req, res) => {
  var UnivTranscationMapDetailID = req.headers["UnivTranscationMapDetailID"]; 
console.log(CategoryID);  
  UnivTranscationMapDetail.DeleteUnivTranscationMapDetailById(UnivTranscationMapDetailID, (err,UnivTranscationMapDetail)=>{
    if(err) {
		throw err;		
	}
     else
	  {	console.log(UnivTranscationMapDetail);	 
		  res.json(UnivTranscationMapDetail);
	  }
  });  
});


module.exports = router;
