const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const UniversityRole = require('../models/UniversityRoleMstr');

router.post('/AddUniversityRole', (req, res, next) => {
	
	 console.log(req.body);
	for(var i=0;i<req.body.Univ_RoleName.length;i++)
	{
		let maxRoleID=0;
  let newUniversityRole = new UniversityRole({
  	Univ_ID: req.body.Univ_ID,
  	Univ_RoleName: req.body.Univ_RoleName[i].Univ_RoleName,
	Univ_RoleID:req.body.UnivRoleID,
  	Active: 1,  
	Created_On: req.body.Created_On,
	Created_by: req.body.Created_by,
	Modified_On: req.body.Modified_On,
    Modified_by: req.body.Modified_by
  	});
	
	  UniversityRole.getAllUniversityRole((err, roleCount)=> {
		  newUniversityRole.Univ_RoleID=roleCount.length+1;
		  
	   UniversityRole.AddUniversityRoleMstr(newUniversityRole, (err, UniversityRole)=> {
	  console.log(newUniversityRole);
  	
  });
  	
  });

  }
  res.json({success: true, msg:'UniversityRole Created.'});
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


router.get('/getUniversityRoleMstrByUnivID', (req, res) => {
  var univID = req.headers["univid"];  
  UniversityRole.getUniversityRoleMstrByUnivID(univID, (err,UniversityRole)=>{
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
