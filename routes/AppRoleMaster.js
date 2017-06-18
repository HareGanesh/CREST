const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const AppRoleMaster = require('../models/AppRoleMaster');





// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const Pwd = req.body.Pwd;
  console.log(req.body);
  AppRoleMaster.getAppRoleMaster(username, (err,AppRoleMaster)=>{
    if(err) throw err;
    if(!AppRoleMaster){
      return res.json({success: false, msg: 'User not found!'})
    }	
	console.log(AppRoleMaster);
    if(Pwd == AppRoleMaster.PWD)
	{   
		// const token = jwt.sign(authenticateStudent, config.secret,{
          // expiresIn: 604800 //1 week
        // });
        //this way is safer coz doesn't inc pass
        res.json({
          success: true,
          token: 'JWT '+'879jhkjh',
          AppRoleMaster: {
            id: AppRoleMaster._id,
            TagID: AppRoleMaster.TagID,
            UserName: AppRoleMaster.UserName
					
          }
        });     

      }
	  else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });




module.exports = router;
