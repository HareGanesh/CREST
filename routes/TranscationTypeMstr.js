const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const TranscationType = require('../models/TranscationTypeMstr');

router.post('/AddTranscationType', (req, res, next) => {
	
	 console.log(req.body);
	
  let newTranscationType = new TranscationType({
  	Tran_Type_ID: req.body.Tran_Type_ID,
  	Tran_Type_Name: req.body.Tran_Type_Name,
  	Active: req.body.Active,  
	Created_On: req.body.Created_On,
	Created_by: req.body.Created_by,
	Modified_On: req.body.Modified_On,
    Modified_by: req.body.Modified_by
  	});
  TranscationType.AddTranscationTypeMstr(newTranscationType, (err, TranscationType)=> {
	  console.log(newTranscationType);
  		if(err){
      res.json({success: false, msg:'Failed to TranscationType Creation.'});
    } else {
      res.json({success: true, msg:'TranscationType Created.'});
    }
  });
});

router.get('/GetTranscationTypeByID', (req, res) => {
  var TranscationTypeID = req.headers["TranscationTypeID"];  
  TranscationType.getTranscationTypeIDMstrById(TranscationTypeID, (err,TranscationType)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(TranscationType);
	  }
  });  
});



router.get('/getAllTranscationType', (req, res) => {

console.log("Test");	
  TranscationType.getAllTranscationType((err,TranscationType)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(TranscationType); 
		  res.json(TranscationType);
	  }
  });  
});

router.post('/RemoveTranscationTypeByID', (req, res) => {
  var TranscationTypeID = req.headers["TranscationTypeID"]; 
console.log(CategoryID);  
  TranscationType.DeleteTranscationTypeById(TranscationTypeID, (err,TranscationType)=>{
    if(err) {
		throw err;		
	}
     else
	  {	console.log(TranscationType);	 
		  res.json(TranscationType);
	  }
  });  
});


module.exports = router;
