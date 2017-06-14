const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const univesityMaster = require('../models/UniversityMstr');
// const nodemailer =require('nodemailer');
// const smtpTransport  =require('nodemailer-smtp-transport');
// const SendMail = require('../models/SendMail');
router.get('/getAllUniversity', (req, res) => {  
  univesityMaster.getAllUniversity((err,university)=>{
    if(err) {             
                                throw err;
                }
     else
                  {                            
                                  res.json(university);
                  }
  });  
});

var sendMail= function(msgBody)
{
	console.log("Mail body" + msgBody);
		// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
   service: "Gmail",  // sets automatically host, port and connection security settings
   auth: {
       user: "anay9213@gmail.com",
       pass: ""// to passowrd access
   }
});
// setup email data with unicode symbols
let mailOptions = {
    from: 'anay9213@gmail.com', // sender address
    to: 'anaykumar.rai@ust-global.com', // list of receivers
    subject: 'CREST TEST MAIL ', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message  sent: %s', info.messageId, info.response);
});
};
/// Register
router.post('/register', (req, res, next) => {
	
//sendMail(req);
	
	
  let university = new univesityMaster({

  	Univ_Name: req.body.UniversityName,
  	EmailID: req.body.EmailID,
  	Address: req.body.Address,
  	Pwd: req.body.Pwd,
    ContactNo: req.body.ContactNo,
    UserName:req.body.EmailID,
	Pwd:req.body.Pwd,	
    Active:1,
    Univ_ID:0

  	});
  univesityMaster.getUniversityByName(req.body.UniversityName, (err,Getuni)=>{
	  console.log(Getuni);
	 if(Getuni ==undefined)
	 {
		 univesityMaster.universityId((err,res2)=>{
			university.Univ_ID=res2.length+1;
			//console.log("coun" + cnt);

		
		   univesityMaster.addUnivesity(university, (err, univ)=> {
	  
  		if(err){
			
      res.json({success: false, msg:'Failed to register '});
	  console.log(err);	
    } else {
      res.json({success: true, msg:'University registered'});
    }
  });
  		});
	 }
	 else
	 {
		  res.json({success: false, msg:'University already exists!'});
	 }
  });

});

router.get('/GetUniversityByID', (req, res) => {
	console.log(req.headers);
  var id = req.headers["id"];  
 
  univesityMaster.getUniversityById(id, (err,uni)=>{
    if(err) {
                                throw err;                            
                }
     else
                  {                     
			  
                                  res.json(uni);
                  }
  });  
});

router.post('/updateUniversity', (req, res, next) => {
	
		console.log("routes" + req.body);
  let university = new univesityMaster({

  	Univ_Name: req.body.UniversityName,
  	EmailID: req.body.EmailID,
  	Address: req.body.Address,
  	Pwd: req.body.Pwd,
    ContactNo: req.body.ContactNo,
    UserName:req.body.EmailID,
	Pwd:req.body.Pwd,
    id:req.body._id


  	});
  univesityMaster.updateUniversity(university, (err, univ)=> {
                  
                                if(err){
                                                
      res.json({success: false, msg:'Failed to update '});
                  console.log(err);            
    } else {
      res.json({success: true, msg:'University updated'});
    }
  });
});

router.post('/deleteUniversity', (req, res, next) => {
	
  univesityMaster.deleteUniversity(req.body._id, (err, univ)=> {
                  
                                if(err){
                                                
      res.json({success: false, msg:'Failed to update '});
                  console.log(err);            
    } else {
      res.json({success: true, msg:'University updated'});
    }
  });
});


module.exports = router;
