const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const univesityMaster = require('../models/UniversityMstr');
const userLogin = require('../models/UserLogin'); 

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

// Authenticate
router.post('/authenticateUniversity', (req, res, next) => {
                
  const username = req.body.username;
  const Pwd = req.body.Pwd;
  univesityMaster.getUniversityByUserName(username, (err,University)=>{
    if(err) throw err;
                                if(!University){
                                  return res.json({success: false, msg: 'User not found!'})
                                }
                                else
                                {
                                                // To compare the hash value with the password entered in the form - hareganx - 06/06/17
                                                //bcrypt.compare(req.body.Pwd, student.Pwd, function(err, result) {
                                                                
                                                                if(true==true)
                                                                {
                                                                                const token = jwt.sign(University, config.secret,{
                                                                                  expiresIn: 604800 //1 week
                                                                                });
                                                                                //this way is safer coz doesn't inc pass
                                                                                res.json({
                                                                                  success: true,
                                                                                  token: 'JWT '+token,
                                                                                  university: {
                                                                                                id: University._id,
                                                                                                Univ_Name: University.Univ_Name,
                                                                                                EmailID: University.EmailID,
                                                                                                UserName: University.UserName,
                                                                                                ContactNo: University.ContactNo,                                                                                            
                                                                                                Address:University.Address,
                                                                                                Univ_ID:University.Univ_ID,
																								isPasswordChanged: University.isPasswordChanged
                                                                                  }
                                                                                }); 
                                                                }
                                                                else
                                                                {
                                                                                return res.json({success: false, msg: 'Wrong password'});
                                                                }
                                                                
                                                //});
                                }
    });
  });


/// Register
router.post('/register', (req, res, next) => {
                
//sendMail(req);
                
  let userDetail = new userLogin(
  {
                                
    PWD: req.body.Pwd,    
    UserName:req.body.EmailID, 
	EmailID:req.body.EmailID, 
    Active:1,
    TagID:'U'
  });
  let university = new univesityMaster({

                Univ_Name: req.body.Univ_Name,
                EmailID: req.body.EmailID,
                Address: req.body.Address,
                Pwd: req.body.Pwd,
				ContactNo: req.body.ContactNo,
				UserName:req.body.EmailID,
                Pwd:req.body.Pwd,        
				Active:1,
				Univ_ID:0

                });
  univesityMaster.getUniversityByName(req.body.Univ_Name, (err,Getuni)=>{
                  console.log(Getuni);
                if(Getuni ==undefined)
                {
                                univesityMaster.maxuniversityId((err,res2)=>{
									console.log(res2);
									if(res2.length > 0)
									{
                                        university.Univ_ID=res2[0].Univ_ID+1;
									}
                                                //console.log("coun" + cnt);

                                
                                   univesityMaster.addUnivesity(university, (err, univ)=> {
									userLogin.addUser(userDetail,(err,user)=>{
                                                   if(err){res.json({success: false, msg:'Failed to register in userLogin'});}
                                   });
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

  	Univ_Name: req.body.Univ_Name,
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
