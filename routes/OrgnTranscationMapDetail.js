const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const OrgnTranscationMapDetail = require('../models/OrgnTranscationMapDetail');

router.post('/AddOrgnTranscationMapDetail', (req, res, next) => {
	
	 console.log(req.body);
	
  let newOrgnTranscationMapDetail = new OrgnTranscationMapDetail({
  	Priority: req.body.Priority,
  	Tran_Map_ID: req.body.TransMapID,
	Role_ID:req.body.RoleID,	
  	Active: req.body.Active,  
	Created_On: req.body.Created_On,
	Created_by: req.body.Created_by,
	Modified_On: req.body.Modified_On,
    Modified_by: req.body.Modified_by
  	});
  OrgnTranscationMapDetail.AddOrgnTranscationMapDetail(newOrgnTranscationMapDetail, (err, OrgnTranscationMapDetail)=> {
	  console.log(newOrgnTranscationMapDetail);
  		if(err){
      res.json({success: false, msg:'Failed to OrgnTranscationMapDetail Creation.'});
    } else {
      res.json({success: true, msg:'OrgnTranscationMapDetail Created.'});
    }
  });
});

router.get('/getOrgnTranscationMapDetailByID', (req, res) => {
  var OrgnTranscationMapDetailID = req.headers["OrgnTranscationMapDetailID"];  
  OrgnTranscationMapDetail.getOrgnTranscationMapDetailIDMstrById(OrgnTranscationMapDetailID, (err,OrgnTranscationMapDetail)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(OrgnTranscationMapDetail);
	  }
  });  
});

router.get('/getOrgnTranscationMapDetailByTranMapID', (req, res) => {
  var Tran_Map_ID = req.headers["tranmapid"];  
  OrgnTranscationMapDetail.getOrgnTranscationMapDetailByID(Tran_Map_ID, (err,OrgnTranscationMapDetail)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(OrgnTranscationMapDetail);
	  }
  });  
});




router.get('/getAllOrgnTranscationMapDetail', (req, res) => {

console.log("Test");	
  OrgnTranscationMapDetail.getAllOrgnTranscationMapDetail((err,OrgnTranscationMapDetail)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(OrgnTranscationMapDetail); 
		  res.json(OrgnTranscationMapDetail);
	  }
  });  
});

router.get('/getMaxOrgnTransMapID', (req, res) => {

console.log("Test Max");	
  OrgnTranscationMapDetail.getMaxTransMapID((err,OrgnTranscationMapDetail)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(OrgnTranscationMapDetail); 
		  res.json(OrgnTranscationMapDetail);
	  }
  });  
});

router.post('/RemoveOrgnTranscationMapDetailByID', (req, res) => {
  var OrgnTranscationMapDetailID = req.headers["OrgnTranscationMapDetailID"]; 
console.log(CategoryID);  
  OrgnTranscationMapDetail.DeleteOrgnTranscationMapDetailById(OrgnTranscationMapDetailID, (err,OrgnTranscationMapDetail)=>{
    if(err) {
		throw err;		
	}
     else
	  {	console.log(OrgnTranscationMapDetail);	 
		  res.json(OrgnTranscationMapDetail);
	  }
  });  
});


module.exports = router;
