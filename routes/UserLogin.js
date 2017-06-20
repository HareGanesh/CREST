const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const UserLogin = require('../models/UserLogin');


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

module.exports = router;
