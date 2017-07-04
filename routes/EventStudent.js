const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const EventStudent = require('../models/EventStudent');
const Student = require('../models/student');

router.post('/EventStudent', (req, res, next) => {
	
	 console.log(req.body);
	
  let newEventStudent = new EventStudent({
  	
  	EventID: req.body.EventID,
	Student_ID: req.body.StudentID,
	Created_On: req.body.Created_On,
	Created_by: req.body.Created_by,
	Modified_On: req.body.Modified_On,
    Modified_by: req.body.Modified_by
  	});
	
  EventStudent.AddEventStudent(newEventStudent, (err, EventStudent)=> {
	  console.log(newEventStudent);
  		if(err){
      res.json({success: false, msg:'Failed to event student Creation.'});
    } else {
      res.json({success: true, msg:'Event student Created.'});
    }
  });
});

router.get('/GetEventStudentByID', (req, res) => {
  var EventStudentID = req.headers["EventStudentID"];  
  EventStudent.getEventStudentById(EventStudentID, (err,EventStudent)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(EventStudent);
	  }
  });  
});

router.get('/getEventStudentApproved', (req, res) => {
  //var EventID = req.headers["eventid"];  
  
  EventStudent.getEventStudentApproved((err,EventStudent)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(EventStudent);
	  }
  });  
});



router.get('/GetEventStudentByEventID', (req, res) => {
  var EventID = req.headers["eventid"];  
  
  EventStudent.getEventStudentByEventID(EventID, (err,EventStudent)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(EventStudent);
	  }
  });  
});

router.get('/GetApprovedEventStudentByEventID', (req, res) => {
  var EventID = req.headers["eventid"];  
  
  EventStudent.GetApprovedEventStudentByEventID(EventID, (err,EventStudent)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(EventStudent);
	  }
  });  
});

router.get('/GetEventStudentByEventIDAndStudentID', (req, res) => {
  var EventID = req.headers["eventid"];  
  var StudentID = req.headers["studentid"];
  EventStudent.getEventStudentByEventIDAndStudentID(EventID, StudentID, (err,EventStudent)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(EventStudent);
	  }
  });  
});


router.get('/getEventStudentByEventIDAndStudentIDWithStudent', (req, res) => {
  //var EventID = req.headers["eventid"];  
  var StudentID = req.headers["studentid"];
  booksReloaded=[];
  EventStudent.getEventStudentByEventIDAndStudentIDWithStudent(StudentID, (err,EventStudent)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
         EventStudent.forEach(
    function (stu) {
        stu.Student = Student.getStudentByStudentID(stu.Student_ID);
        
        booksReloaded.push(stu);
		res.json(stu);
    }
);

		 // res.json(booksReloaded);
	  }
  });  
});

router.get('/getAllEventStudent', (req, res) => {

console.log("Test");	
  EventStudent.getAllEventStudent((err,EventStudent)=>{
    if(err) {	
		throw err;
	}
     else
	  {		 
		  res.json(EventStudent);
	  }
  });  
});

router.post('/RemoveEventStudentByID', (req, res) => {
  var EventStudentID = req.headers["EventStudentID"]; 
console.log(EventStudentID);  
  EventStudent.DeleteEventStudentById(EventStudentID, (err,EventStudent)=>{
    if(err) {
		throw err;		
	}
     else
	  {	console.log(EventStudent);	 
		  res.json(EventStudent);
	  }
  });  
});


router.post('/DeleteEventStudentByEventID', (req, res) => {
  var EventID = req.headers["EventID"]; 
console.log(EventID);  
  EventStudent.DeleteEventStudentById(EventID, (err,EventStudent)=>{
    if(err) {
		throw err;		
	}
     else
	  {	console.log(EventStudent);	 
		  res.json(EventStudent);
	  }
  });  
});

router.get('/GetEventStudentByEventID', (req, res) => {
  var EventID = req.headers["eventid"];  
  console.log(EventID);
  EventStudent.getEventStudentByEventID(EventID, (err,EventStudent)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(EventStudent);
	  }
  });  
}); 

router.get('/getEventStudentByUnivID', (req, res) => {
  var StudentID = req.headers["id"];  
  console.log(StudentID);
  EventStudent.getEventStudentByUnivID(StudentID, (err,EventStudent)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(EventStudent);
	  }
  });  
}); 

module.exports = router;
