const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const OrganizationRole = require('../models/OrganizationRoleMstr');

router.post('/AddOrganizationRole', (req, res, next) => {
	
	 console.log(req.body);
	 let maxRoleID=0;
	 OrganizationRole.maxOrganizationRoleId((err,res2)=>{
									console.log(res2);
									if(res2.length > 0)
									{
                                        maxRoleID=res2[0].Orgn_RoleID+1;
									
	for(var i=0;i<req.body.Orgn_RoleName.length;i++)
	{
		console.log("aaaajjj")
  let newOrganizationRole = new OrganizationRole({
  	Orgn_ID: parseInt(req.body.Orgn_ID),
  	Orgn_RoleName: req.body.Orgn_RoleName[i].Orgn_RoleName,
	Orgn_RoleID:maxRoleID++,
  	Active: 1,  
	Created_On: req.body.Created_On,
	Created_by: req.body.Created_by,
	Modified_On: req.body.Modified_On,
    Modified_by: req.body.Modified_by
  	});
	
	  // OrganizationRole.getAllOrganizationRole((err, roleCount)=> {
		  // newOrganizationRole.Univ_RoleID=roleCount.length+1;
		  
	   OrganizationRole.AddOrganizationRoleMstr(newOrganizationRole, (err, OrganizationRole)=> {
	  console.log(newOrganizationRole);
  	
  });
  	
  //});

  }
  }else {
	  for(var i=0;i<req.body.Orgn_RoleName.length;i++)
	{
		
  let newOrganizationRole = new OrganizationRole({
  	Orgn_ID: parseInt(req.body.Orgn_ID),
  	Orgn_RoleName: req.body.Orgn_RoleName[i].Orgn_RoleName,
	Orgn_RoleID:1,
  	Active: 1,  
	Created_On: req.body.Created_On,
	Created_by: req.body.Created_by,
	Modified_On: req.body.Modified_On,
    Modified_by: req.body.Modified_by
  	});
	
	  // OrganizationRole.getAllOrganizationRole((err, roleCount)=> {
		  // newOrganizationRole.Univ_RoleID=roleCount.length+1;
		  
	   OrganizationRole.AddOrganizationRoleMstr(newOrganizationRole, (err, OrganizationRole)=> {
	  console.log(newOrganizationRole);
  	
  });
  	
  //});

  }
  }
	 });
	 
  res.json({success: true, msg:'OrganizationRole Created.'});
});

router.get('/GetOrganizationRoleByID', (req, res) => {
  var OrganizationRoleID = req.headers["OrganizationRoleID"];  
  OrganizationRole.getOrganizationRoleIDMstrById(OrganizationRoleID, (err,OrganizationRole)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(OrganizationRole);
	  }
  });  
});


router.get('/getOrganizationRolesByOrgnID', (req, res) => {
  var orgnID = req.headers["orgnid"];  
  OrganizationRole.getOrganizationRoleMstrByOrgnID(orgnID, (err,OrganizationRole)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(OrganizationRole);
	  }
  });  
});


router.get('/getAllOrganizationRole', (req, res) => {

console.log("Test22");	
  OrganizationRole.getAllOrganizationRole((err,OrganizationRole)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(OrganizationRole); 
		  res.json(OrganizationRole);
	  }
  });  
});

router.post('/RemoveOrganizationRoleByID', (req, res) => {
  var OrganizationRoleID = req.headers["OrganizationRoleID"]; 
console.log(CategoryID);  
  OrganizationRole.DeleteOrganizationRoleById(OrganizationRoleID, (err,OrganizationRole)=>{
    if(err) {
		throw err;		
	}
     else
	  {	console.log(OrganizationRole);	 
		  res.json(OrganizationRole);
	  }
  });  
});


module.exports = router;
