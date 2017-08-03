const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const EventEmployee = require('../models/EventEmployee');
const Student = require('../models/student');

router.post('/EventEmployee', (req, res, next) => {
	
	 console.log(req.body);
	
  let newEventEmployee = new EventEmployee({
  	
  	EventID: req.body.EventID,
	Employee_ID: req.body.EmployeeID,
	Created_On: req.body.Created_On,
	Created_by: req.body.Created_by,
	Modified_On: req.body.Modified_On,
    Modified_by: req.body.Modified_by
  	});
	
  EventEmployee.AddEventEmployee(newEventEmployee, (err, EventEmployee)=> {
	  console.log(newEventEmployee);
  		if(err){
      res.json({success: false, msg:'Failed to event student Creation.'});
    } else {
      res.json({success: true, msg:'Event student Created.'});
    }
  });
});

router.get('/GetEventEmployeeByID', (req, res) => {
  var EventEmployeeID = req.headers["EventEmployeeID"];  
  EventEmployee.getEventEmployeeById(EventEmployeeID, (err,EventEmployee)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(EventEmployee);
	  }
  });  
});

router.get('/getEventEmployeeApproved', (req, res) => {
  //var EventID = req.headers["eventid"];  
  
  EventEmployee.getEventEmployeeApproved((err,EventEmployee)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(EventEmployee);
	  }
  });  
});



router.get('/GetEventEmployeeByEventID', (req, res) => {
  var EventID = req.headers["eventid"];  
  
  EventEmployee.getEventEmployeeByEventID(EventID, (err,EventEmployee)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(EventEmployee);
	  }
  });  
});

router.get('/GetApprovedEventEmployeeByEventID', (req, res) => {
  var EventID = req.headers["eventid"];  
  
  EventEmployee.GetApprovedEventEmployeeByEventID(EventID, (err,EventEmployee)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(EventEmployee);
	  }
  });  
});

router.get('/GetEventEmployeeByEventIDAndEmployeeID', (req, res) => {
  var EventID = req.headers["eventid"];  
  var EmployeeID = req.headers["employeeid"];
  EventEmployee.getEventEmployeeByEventIDAndEmployeeID(EventID, EmployeeID, (err,EventEmployee)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(EventEmployee);
	  }
  });  
});


router.get('/getEventEmployeeByEventIDAndEmployeeIDWithEmployee', (req, res) => {
  //var EventID = req.headers["eventid"];  
  var EmployeeID = req.headers["employeeid"];
  booksReloaded=[];
  EventEmployee.getEventEmployeeByEventIDAndEmployeeIDWithEmployee(EmployeeID, (err,EventEmployee1)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
         // EventEmployee.forEach(
    // function (stu) {
        // stu.Student = Student.getStudentByEmployeeID(stu.Employee_ID);
        
        // booksReloaded.push(stu);
		// res.json(EventEmployee);
    // }
// );

		  res.json(EventEmployee1);
	  }
  });  
});

router.get('/getAllEventEmployee', (req, res) => {

console.log("Test");	
  EventEmployee.getAllEventEmployee((err,EventEmployee)=>{
    if(err) {	
		throw err;
	}
     else
	  {		 
		  res.json(EventEmployee);
	  }
  });  
});

router.post('/RemoveEventEmployeeByID', (req, res) => {
  var EventEmployeeID = req.headers["EventEmployeeID"]; 
console.log(EventEmployeeID);  
  EventEmployee.DeleteEventEmployeeById(EventEmployeeID, (err,EventEmployee)=>{
    if(err) {
		throw err;		
	}
     else
	  {	console.log(EventEmployee);	 
		  res.json(EventEmployee);
	  }
  });  
});


router.post('/DeleteEventEmployeeByEventID', (req, res) => {
  var EventID = req.headers["EventID"]; 
console.log(EventID);  
  EventEmployee.DeleteEventEmployeeById(EventID, (err,EventEmployee)=>{
    if(err) {
		throw err;		
	}
     else
	  {	console.log(EventEmployee);	 
		  res.json(EventEmployee);
	  }
  });  
});

router.get('/GetEventEmployeeByEventID', (req, res) => {
  var EventID = req.headers["eventid"];  
  console.log(EventID);
  EventEmployee.getEventEmployeeByEventID(EventID, (err,EventEmployee)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(EventEmployee);
	  }
  });  
}); 

router.get('/getEventEmployeeByUnivID', (req, res) => {
  var EmployeeID = req.headers["id"];  
  console.log(EmployeeID);
  EventEmployee.getEventEmployeeByUnivID(EmployeeID, (err,EventEmployee)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(EventEmployee);
	  }
  });  
}); 

module.exports = router;
