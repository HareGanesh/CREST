const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Grade = require('../models/GradeMaster');

router.post('/AddGrade', (req, res, next) => {
	
	 console.log(req.body);
	
  let newGrade = new Grade({
  	GradeID: req.body.GradeID,
  	GradeName: req.body.GradeName,
  	Active: req.body.Active,  
	Created_On: req.body.Created_On,
	Created_by: req.body.Created_by,
	Modified_On: req.body.Modified_On,
    Modified_by: req.body.Modified_by
  	});
  Grade.AddGrade(newGrade, (err, Grade)=> {
	  //console.log(newCategory);
  		if(err){
      res.json({success: false, msg:'Failed to Grade Creation.'});
    } else {
      res.json({success: true, msg:'Grade Created.'});
    }
  });
});

router.get('/GetGradeByID', (req, res) => {
  var GradeID = req.headers["Gradeid"];  
  Grade.getGradeById(GradeID, (err,Grade)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(Grade);
	  }
  });  
});

router.get('/GetGradeByName', (req, res) => {
  var Gradename = req.headers["Gradename"];  
  Grade.GetGradeByName(Gradename, (err,Grade)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(Grade);
	  }
  });  
});


router.get('/getAllGrade', (req, res) => {

console.log("Test");	
  Grade.getAllGrade((err,Grade)=>{
    if(err) {	
		throw err;
	}
     else
	  {
		  res.json(Grade);
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
