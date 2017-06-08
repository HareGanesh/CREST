const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const University = require('../models/UniversityMstr');

router.post('/AddUniversity', (req, res, next) => {
	
	 console.log(req.body);
	
  let newUniversity = new University({
  	Univ_ID: req.body.UnivID,
  	Univ_Name: req.body.UnivName,
  	Active: req.body.Active,  
	Created_On: req.body.Created_On,
	Created_by: req.body.Created_by,
	Modified_On: req.body.Modified_On,
    Modified_by: req.body.Modified_by
  	});
  University.AddUniversityMstr(newUniversity, (err, University)=> {
	  console.log(newUniversity);
  		if(err){
      res.json({success: false, msg:'Failed to University Creation.'});
    } else {
      res.json({success: true, msg:'University Created.'});
    }
  });
});

router.get('/GetUniversityByID', (req, res) => {
  var UniversityID = req.headers["UniversityID"];  
  University.getUniversityIDMstrById(UniversityID, (err,University)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(University);
	  }
  });  
});



router.get('/getAllUniversity', (req, res) => {

console.log("Test");	
  University.getAllUniversity((err,University)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(University); 
		  res.json(University);
	  }
  });  
});

router.post('/RemoveUniversityByID', (req, res) => {
  var UniversityID = req.headers["UniversityID"]; 
console.log(CategoryID);  
  University.DeleteUniversityById(UniversityID, (err,University)=>{
    if(err) {
		throw err;		
	}
     else
	  {	console.log(University);	 
		  res.json(University);
	  }
  });  
});


module.exports = router;
