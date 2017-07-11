const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Specialization = require('../models/SpecializationMaster');

router.post('/AddSpecialization', (req, res, next) => {
	
	 console.log(req.body);
	
  let newSpecialization = new Specialization({
  	SpecializationID: req.body.SpecializationID,
  	SpecializationName: req.body.SpecializationName,
  	Active: req.body.Active,  
	Created_On: req.body.Created_On,
	Created_by: req.body.Created_by,
	Modified_On: req.body.Modified_On,
    Modified_by: req.body.Modified_by
  	});
  Specialization.AddSpecialization(newSpecialization, (err, Specialization)=> {
	  //console.log(newCategory);
  		if(err){
      res.json({success: false, msg:'Failed to Specialization Creation.'});
    } else {
      res.json({success: true, msg:'Specialization Created.'});
    }
  });
});

router.get('/GetSpecializationByID', (req, res) => {
  var SpecializationID = req.headers["Specializationid"];  
  Specialization.getSpecializationById(SpecializationID, (err,Specialization)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(Specialization);
	  }
  });  
});

router.get('/GetSpecializationByName', (req, res) => {
  var Specializationname = req.headers["Specializationname"];  
  Specialization.GetSpecializationByName(Specializationname, (err,Specialization)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(Specialization);
	  }
  });  
});


router.get('/getAllSpecialization', (req, res) => {

console.log("Test");	
  Specialization.getAllSpecialization((err,Specialization)=>{
    if(err) {	
		throw err;
	}
     else
	  {
		  console.log(Specialization);
		  res.json(Specialization);
	  }
  });  
});

// router.post('/RemoveCategoryByID', (req, res) => {
  // var CategoryID = req.headers["CategoryID"]; 
// console.log(CategoryID);  
  // Category.DeleteCategoryById(CategoryID, (err,Category)=>{
    // if(err) {
		// throw err;		
	// }
     // else
	  // {	console.log(Category);	 
		  // res.json(Category);
	  // }
  // });  
// });


module.exports = router;
