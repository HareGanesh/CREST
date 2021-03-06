const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const UniversityRole = require('../models/UniversityRoleMstr');
const UniversityRoleUser = require('../models/UniversityRoleUser');
const UnivTranscationMapDetail = require('../models/UnivTranscationMapDetail');

router.post('/AddUniversityRole', (req, res, next) => {
	
	 console.log(req.body);
	 let maxRoleID=0;
	 UniversityRole.maxuniversityroleId((err,res2)=>{
									
									if(res2.length > 0)
									{
                                        maxRoleID=res2[0].Univ_RoleID+1;
									
	for(var i=0;i<req.body.Univ_RoleName.length;i++)
	{
		
  let newUniversityRole = new UniversityRole({
  	Univ_ID: parseInt(req.body.Univ_ID),
  	Univ_RoleName: req.body.Univ_RoleName[i].Univ_RoleName,
	Univ_RoleID:maxRoleID++,
  	Active: 1,  
	Created_On: req.body.Created_On,
	Created_by: req.body.Created_by,
	Modified_On: req.body.Modified_On,
    Modified_by: req.body.Modified_by
  	});
	
	  // UniversityRole.getAllUniversityRole((err, roleCount)=> {
		  // newUniversityRole.Univ_RoleID=roleCount.length+1;
		  
	   UniversityRole.AddUniversityRoleMstr(newUniversityRole, (err, UniversityRole)=> {
	  console.log(newUniversityRole);
  	
  });
  	
  //});

  }
  
  for(var i=0;i<req.body.DeletedRoleIDList.length;i++)
	{
		console.log("deleted");
	   UniversityRole.DeleteUniversityRoleByRoleId(req.body.DeletedRoleIDList[i], (err, UniversityRoleDet)=> {
		console.log(UniversityRoleDet);	
		});
  	
	   UniversityRoleUser.RemoveUniversityUserRoleByRoleID(req.body.DeletedRoleIDList[i], (err, UniversityRoleUserDet)=> {
		console.log(UniversityRoleUserDet);	
		});
		
		UnivTranscationMapDetail.DeleteUnivTranscationMapDetailByRoleId(req.body.DeletedRoleIDList[i], (err, UniversityRoleUserDet)=> {
		console.log(UniversityRoleUserDet);	
		});
  //});

  }
  
  }
	 });
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

router.get('/getUniversityRoleInfoByUnivID', (req, res) => {
  var univID = req.headers["univid"];  
  UniversityRole.getUniversityRoleInfoByUnivID(univID, (err,UniversityRole)=>{
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
