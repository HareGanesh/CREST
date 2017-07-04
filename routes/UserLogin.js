const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const UserLogin = require('../models/UserLogin');
const univesityMaster = require('../models/UniversityMstr');
const Student = require('../models/student');
const UniversityRoleUser = require('../models/UniversityRoleUser');
 const mailSender = require('../models/mailSender');
 
 
// router.post('/AddUser', (req, res, next) => {
	
	 // console.log(req.body);
	
  // let newUniversityRole = new UniversityRole({
  	// UserName: req.body.UserName,
  	// TagID: req.body.TagID,
	// PWD:req.body.PWD,
  	// Active: 1,  
	// Created_On: req.body.Created_On,
	// Created_by: req.body.Created_by,
	// Modified_On: req.body.Modified_On,
    // Modified_by: req.body.Modified_by
  	// });
	
	  // UniversityRole.getAllUniversityRole((err, roleCount)=> {
		  // newUniversityRole.Univ_RoleID=roleCount.length+1;
		  
	   // UniversityRole.AddUniversityRoleMstr(newUniversityRole, (err, UniversityRole)=> {
	  // console.log(newUniversityRole);
  	
  // });
  	
  // });

  
  // res.json({success: true, msg:'UniversityRole Created.'});
// });



// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const Pwd = req.body.Pwd;
  console.log(req.body);
  UserLogin.getUserLogin(username, (err,user)=>{
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found!'})
    }	
	console.log(user);
    if(Pwd == user.PWD)
	{   
		const token = jwt.sign(user, config.secret,{
                      expiresIn: 604800 //1 week
                      });
        //this way is safer coz doesn't inc pass
        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            TagID: user.TagID,
            UserName: user.UserName
					
          }
        });     

      }
	  else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
  
  router.post('/authenticateEmailAndPwd', (req, res, next) => {
  const emailid = req.body.Email_ID;
  const Pwd = req.body.OldPwd;
  console.log(req.body);
  UserLogin.getUserByUserName(emailid, (err,user)=>{
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found!'})
    }	
	console.log(user);
    if(Pwd == user.PWD)
	{   
		return res.json({success: true, msg: 'Valid user'});    

      }
	  else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
  
  router.post('/updatePassword', (req, res, next) => {
	
	
	
		let userDetail = new Object(
		{
                                
        PWD: req.body.Pwd,
		EmailID:req.body.Email_ID	
		});
		
		UserLogin.updatePassword(userDetail,(err,user)=>
		{
          if(err)
		  {
			  res.json({success: false, msg:'Failed to register in userLogin'});
		  }else 
		  {
			  if(req.body.TagID == 'C')
			  {
				  return res.json({success: true, msg: 'Password changed.'});
			  }
			  if(req.body.TagID == 'U')
			  {
			  univesityMaster.updatePassword(userDetail,(err,user)=>
				{
				if(err)
				{
			  res.json({success: false, msg:'Failed to register in userLogin'});
				}else 
				{
					//sendMail();
			  return res.json({success: true, msg: 'Password changed.'});   
				}
				});
			  }else if(req.body.TagID == 'S')
			  {
			  Student.updatePassword(userDetail,(err,user)=>
				{
				if(err)
				{
			  res.json({success: false, msg:'Failed to register in userLogin'});
				}else 
				{
					//sendMail();
			  return res.json({success: true, msg: 'Password changed.'});   
				}
				});
			  }else if(req.body.TagID == 'UR')
			  {
			  UniversityRoleUser.updatePassword(userDetail,(err,user)=>
				{
				if(err)
				{
			  res.json({success: false, msg:'Failed to register in userLogin'});
				}else 
				{
					//sendMail();
			  return res.json({success: true, msg: 'Password changed.'});   
				}
        });
			  }
		  }
        });
      
    
});


router.get('/getUserByUserName', (req, res, next) => {
	
  var username = req.headers["username"];  
  
  UserLogin.getUserByUserName(username, (err,studentDetail)=>{
    if(err) {
                                throw err;                            
                }
     else
                  {                            
                                  res.json(studentDetail);
                  }
  });  
}); 

router.get('/getUserByEmail', (req, res, next) => {
	
  var Email = req.headers["emailid"];  
  console.log(Email);
  UserLogin.getUserByEmail(Email, (err,studentDetail)=>{
    if(err) {
                                throw err;                            
                }
     else
                  {                            
                                  res.json(studentDetail);
                  }
  });  
}); 


var sendMail= function(msgBody)
{
	//console.log("Mail body" + msgBody);
		// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
   service: "Gmail",  // sets automatically host, port and connection security settings
   auth: {
       user: "amitkhandelwal.eca@gmail.com",
       pass: "patodia@25"// to passowrd access
   }
});
// setup email data with unicode symbols
let mailOptions = {
    from: 'anay9213@gmail.com', // sender address
    to: 'amitkhandelwal.eca@gmail.com', // list of receivers
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

module.exports = router;
