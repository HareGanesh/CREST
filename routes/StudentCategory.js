const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const StudentCategory = require('../models/StudentCategory');

router.post('/AddStudentCategory', (req, res, next) => {
	
	 console.log("Student category" + req.body);
	
  let newStudentCategory = new StudentCategory({
  	StudentID: req.body.StudentID,
  	CategoryID: req.body.CategoryID,
	Active: req.body.Active,	
	Created_On: req.body.Created_On,
	Created_by: req.body.Created_by,
	Modified_On: req.body.Modified_On,
    Modified_by: req.body.Modified_by
  	});
	
  StudentCategory.addStudentCategory(newStudentCategory, (err, studentCategory)=> {
	  console.log(newStudentCategory);
  		if(err){
      res.json({success: false, msg:'Failed to Add Creation.'});
    } else {
      res.json({success: true, msg:'Created.'});
    }
  });
});

module.exports = router;
