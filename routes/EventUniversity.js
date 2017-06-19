const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const EventUniversity = require('../models/EventUniversity');

router.post('/EventUniversity', (req, res, next) => {
	
	 console.log(req.body);
	
  let newEventUniversity = new EventUniversity({
  	EventUniversityID: req.body.EventUniversityID,
  	EventID: req.body.EventID,
	Univ_ID: req.body.Univ_ID,
	
  	Active: req.body.Active,  
	Created_On: req.body.Created_On,
	Created_by: req.body.Created_by,
	Modified_On: req.body.Modified_On,
    Modified_by: req.body.Modified_by
  	});
	
  EventUniversity.AddEventUniversity(newEventUniversity, (err, EventUniversity)=> {
	  console.log(newEventUniversity);
  		if(err){
      res.json({success: false, msg:'Failed to event univ Creation.'});
    } else {
      res.json({success: true, msg:'Event univ Created.'});
    }
  });
});

router.get('/GetEventUniversityByID', (req, res) => {
  var EventUniversityID = req.headers["EventUniversityID"];  
  EventUniversity.getEventUniversityById(EventUniversityID, (err,EventUniversity)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(EventUniversity);
	  }
  });  
});

router.get('/GetEventUniversityByEventID', (req, res) => {
  var EventID = req.headers["eventid"];  
  
  EventUniversity.getEventUniversityByEventID(EventID, (err,EventUniversity)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(EventUniversity);
	  }
  });  
});


router.get('/getAllEventUniversity', (req, res) => {

console.log("Test");	
  EventUniversity.getAllEventUniversity((err,EventUniversity)=>{
    if(err) {	
		throw err;
	}
     else
	  {		 
		  res.json(EventUniversity);
	  }
  });  
});

router.post('/RemoveEventUniversityByID', (req, res) => {
  var EventUniversityID = req.headers["EventUniversityID"]; 
console.log(EventUniversityID);  
  EventUniversity.DeleteEventUniversityById(EventUniversityID, (err,EventUniversity)=>{
    if(err) {
		throw err;		
	}
     else
	  {	console.log(EventUniversity);	 
		  res.json(EventUniversity);
	  }
  });  
});


router.post('/DeleteEventUniversityByEventID', (req, res) => {
  var EventID = req.headers["EventID"]; 
console.log(EventID);  
  EventUniversity.DeleteEventUniversityById(EventID, (err,EventUniversity)=>{
    if(err) {
		throw err;		
	}
     else
	  {	console.log(EventUniversity);	 
		  res.json(EventUniversity);
	  }
  });  
});

router.get('/GetEventUniversityByEventID', (req, res) => {
  var EventID = req.headers["eventid"];  
  console.log(EventID);
  EventUniversity.getEventUniversityByEventID(EventID, (err,EventUniversity)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(EventUniversity);
	  }
  });  
}); 

router.get('/getEventUniversityByUnivID', (req, res) => {
  var UniversityID = req.headers["id"];  
  console.log(UniversityID);
  EventUniversity.getEventUniversityByUnivID(UniversityID, (err,EventUniversity)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(EventUniversity);
	  }
  });  
}); 

module.exports = router;
