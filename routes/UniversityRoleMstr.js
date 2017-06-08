const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const UniversityRole = require('../models/UniversityRoleMstr');

router.post('/AddUniversityRole', (req, res, next) => {
	
	 console.log(req.body);
	
  let newUniversityRole = new UniversityRole({
  	Univ_ID: req.body.UnivID,
  	Univ_Name: req.body.UnivName,
	Univ_RoleID:req.body.UnivRoleID,
  	Active: req.body.Active,  
	Created_On: req.body.Created_On,
	Created_by: req.body.Created_by,
	Modified_On: req.body.Modified_On,
    Modified_by: req.body.Modified_by
  	});
  UniversityRole.AddUniversityRoleMstr(newUniversityRole, (err, UniversityRole)=> {
	  console.log(newUniversityRole);
  		if(err){
      res.json({success: false, msg:'Failed to UniversityRole Creation.'});
    } else {
      res.json({success: true, msg:'UniversityRole Created.'});
    }
  });
});

router.get('/GetUniversityRoleByID', (req, res) => {
  var UniversityRoleID = req.headers["UniversityRoleID"];  
  UniversityRole.getUniversityRoleIDMstrById(UniversityRoleID, (err,UniversityRole)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(UniversityRole);
	  }
  });  
});



router.get('/getAllUniversityRole', (req, res) => {

console.log("Test22");	
  UniversityRole.getAllUniversityRole((err,UniversityRole)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(UniversityRole); 
		  res.json(UniversityRole);
	  }
  });  
});

router.post('/RemoveUniversityRoleByID', (req, res) => {
  var UniversityRoleID = req.headers["UniversityRoleID"]; 
console.log(CategoryID);  
  UniversityRole.DeleteUniversityRoleById(UniversityRoleID, (err,UniversityRole)=>{
    if(err) {
		throw err;		
	}
     else
	  {	console.log(UniversityRole);	 
		  res.json(UniversityRole);
	  }
  });  
});


module.exports = router;
