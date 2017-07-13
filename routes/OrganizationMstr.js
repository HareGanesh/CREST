const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const organizationMaster = require('../models/OrganizationMstr');
const userLogin = require('../models/UserLogin'); 

// const nodemailer =require('nodemailer');
// const smtpTransport  =require('nodemailer-smtp-transport');
// const SendMail = require('../models/SendMail');
router.get('/getAllOrganization', (req, res) => {  
  organizationMaster.getAllOrganization((err,organization)=>{
    if(err) {             
                                throw err;
                }
     else
                  {                            
                                  res.json(organization);
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
router.post('/authenticateOrganization', (req, res, next) => {
                
  const username = req.body.username;
  const Pwd = req.body.Pwd;
  organizationMaster.getOrganizationByUserName(username, (err,Organization)=>{
    if(err) throw err;
                                if(!Organization){
                                  return res.json({success: false, msg: 'User not found!'})
                                }
                                else
                                {
                                                // To compare the hash value with the password entered in the form - hareganx - 06/06/17
                                                //bcrypt.compare(req.body.Pwd, student.Pwd, function(err, result) {
                                                                
                                                                if(true==true)
                                                                {
                                                                                const token = jwt.sign(Organization, config.secret,{
                                                                                  expiresIn: 604800 //1 week
                                                                                });
                                                                                //this way is safer coz doesn't inc pass
                                                                                res.json({
                                                                                  success: true,
                                                                                  token: 'JWT '+token,
                                                                                  organization: {
                                                                                                id: Organization._id,
                                                                                                OrgnName: Organization.OrgnName,
                                                                                                EmailID: Organization.EmailID,
                                                                                                username: Organization.username,
                                                                                                ContactNo: Organization.ContactNo,                                                                                            
                                                                                                Address:Organization.Address,
                                                                                                Orgn_ID:Organization.Orgn_ID,
																								isPasswordChanged: Organization.isPasswordChanged
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
    TagID:'O'
  });
  let organization = new organizationMaster({

                OrgnName: req.body.OrgnName,
				Title: req.body.Title,
				Overview: req.body.Overview,
                EmailID: req.body.EmailID,
                Address: req.body.Address,
                Pwd: req.body.Pwd,
				ContactNo: req.body.ContactNo,
				username:req.body.EmailID,
                Pwd:req.body.Pwd,        
				Active:1,
				Orgn_ID:0

                });
  organizationMaster.getOrganizationByName(req.body.OrgnName, (err,Getuni)=>{
                  console.log(Getuni);
                if(Getuni ==undefined)
                {
                                organizationMaster.maxorganizationId((err,res2)=>{
									console.log(res2 + " 000000");
									if(res2.length > 0)
									{
										console.log("org " + res2[0].Orgn_ID);
                                        organization.Orgn_ID=res2[0].Orgn_ID+1;
									}
                                                //console.log("coun" + cnt);

                                
                                   organizationMaster.addOrganization(organization, (err, univ)=> {
									userLogin.addUser(userDetail,(err,user)=>{
                                                   if(err){res.json({success: false, msg:'Failed to register in userLogin'});}
                                   });
                                if(err){
                                                
      res.json({success: false, msg:'Failed to register '});
                 console.log(err);            
    } else {
      res.json({success: true, msg:'Organization registered'});
    }
  });
                                });
                }
                else
                {
                                  res.json({success: false, msg:'Organization already exists!'});
                }
  });

});


router.get('/GetOrganizationByID', (req, res) => {
	console.log(req.headers);
  var id = req.headers["id"];  
 
  organizationMaster.getOrganizationById(id, (err,uni)=>{
    if(err) {
                                throw err;                            
                }
     else
                  {                     
			  
                                  res.json(uni);
                  }
  });  
});

router.get('/GetOrganizationsWithRoles', (req, res) => {
	
 
  organizationMaster.getOrganizationsWithRoles((err,orgn)=>{
    if(err) {
                                throw err;                            
                }
     else
                  {                     
			  
                                  res.json(orgn);
                  }
  });  
});

router.post('/updateOrganization', (req, res, next) => {
	
		console.log("routes" + req.body);
  let organization = new organizationMaster({

  	OrgnName: req.body.OrgnName,
	Title: req.body.Title,
	Overview: req.body.Overview,
  	EmailID: req.body.EmailID,
  	Address: req.body.Address,
  	Pwd: req.body.Pwd,
    ContactNo: req.body.ContactNo,
    UserName:req.body.EmailID,
	Pwd:req.body.Pwd,
    id:req.body._id


  	});
  organizationMaster.updateOrganization(organization, (err, univ)=> {
                  
                                if(err){
                                                
      res.json({success: false, msg:'Failed to update '});
                  console.log(err);            
    } else {
      res.json({success: true, msg:'Organization updated'});
    }
  });
});

router.post('/deleteOrganization', (req, res, next) => {
	
  organizationMaster.deleteOrganization(req.body._id, (err, univ)=> {
                  
                                if(err){
                                                
      res.json({success: false, msg:'Failed to update '});
                  console.log(err);            
    } else {
      res.json({success: true, msg:'Organization updated'});
    }
  });
});


module.exports = router;
