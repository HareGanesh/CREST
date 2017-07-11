const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Degree = require('../models/DegreeMaster');

router.post('/AddDegree', (req, res, next) => {
	
	 console.log(req.body);
	
  let newDegree = new Degree({
  	DegreeID: req.body.DegreeID,
  	DegreeName: req.body.DegreeName,
  	Active: req.body.Active,  
	Created_On: req.body.Created_On,
	Created_by: req.body.Created_by,
	Modified_On: req.body.Modified_On,
    Modified_by: req.body.Modified_by
  	});
  Degree.AddDegree(newDegree, (err, degree)=> {
	  //console.log(newCategory);
  		if(err){
      res.json({success: false, msg:'Failed to Degree Creation.'});
    } else {
      res.json({success: true, msg:'Degree Created.'});
    }
  });
});

router.get('/GetDegreeByID', (req, res) => {
  var DegreeID = req.headers["degreeid"];  
  Degree.getDegreeById(DegreeID, (err,degree)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(degree);
	  }
  });  
});

router.get('/GetDegreeByName', (req, res) => {
  var degreename = req.headers["degreename"];  
  Degree.GetDegreeByName(degreename, (err,degree)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(degree);
	  }
  });  
});


router.get('/getAllDegree', (req, res) => {

console.log("Test");	
  Degree.getAllDegree((err,degree)=>{
    if(err) {	
		throw err;
	}
     else
	  {
		  res.json(degree);
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
