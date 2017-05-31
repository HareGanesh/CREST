const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const EventOrganizer = require('../models/EventOrganizer');



router.get('/GetEventOrganizerByID', (req, res) => {
  var EventOrganizerID = req.headers["EventOrganizerID"];  
  EventOrganizer.getEventOrganizerById(EventOrganizerID, (err,EventOrganizer)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(EventOrganizer);
	  }
  });  
});

router.get('/GetEventOrganizerByEventID', (req, res) => {
  var EventID = req.headers["eventid"];  
  
  EventOrganizer.getEventOrganizerByEventID(EventID, (err,EventOrganizer)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(EventOrganizer);
	  }
  });  
});


router.get('/getAllEventOrganizer', (req, res) => {

console.log("Test");	
  EventOrganizer.getAllEventOrganizer((err,EventOrganizer)=>{
    if(err) {	
		throw err;
	}
     else
	  {		 
		  res.json(EventOrganizer);
	  }
  });  
});

router.post('/RemoveEventOrganizerByID', (req, res) => {
  var EventOrganizerID = req.headers["EventOrganizerID"]; 
console.log(EventOrganizerID);  
  EventOrganizer.DeleteEventOrganizerById(EventOrganizerID, (err,EventOrganizer)=>{
    if(err) {
		throw err;		
	}
     else
	  {	console.log(EventOrganizer);	 
		  res.json(EventOrganizer);
	  }
  });  
});


router.post('/DeleteEventOrganizerByEventID', (req, res) => {
  var EventID = req.headers["EventID"]; 
console.log(EventID);  
  EventOrganizer.DeleteEventOrganizerById(EventID, (err,EventOrganizer)=>{
    if(err) {
		throw err;		
	}
     else
	  {	console.log(EventOrganizer);	 
		  res.json(EventOrganizer);
	  }
  });  
});

router.get('/GetEventOrganizerByEventID', (req, res) => {
  var EventID = req.headers["eventid"];  
  console.log(EventID);
  
  EventOrganizer.getEventOrganizerByEventID(EventID, (err,EventOrganizer)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(EventOrganizer);
	  }
  });  
}); 


module.exports = router;
