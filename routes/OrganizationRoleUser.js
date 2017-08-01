const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const OrganizationRoleUser = require('../models/OrganizationRoleUser');
const userLogin = require('../models/UserLogin'); 

//var bcrypt = require('bcrypt');

/// Register
/// Register
router.post('/register', (req, res, next) => {
	
	
  let newOrganizationRoleUser = new OrganizationRoleUser({

  	//Student_Name: req.body.Student_Name,
  	Email_ID: req.body.Email_ID,
  	username: req.body.username,
	Department:req.body.Department,
  	Pwd: req.body.Password,
    //Student_ID: req.body.Student_ID,
    //DOB: req.body.DOB,
    //Address: req.body.Address,
    Mobile_No: req.body.Mobile_No,
    Orgn_ID: req.body.Orgn_ID,
    Role_ID: req.body.Role_ID,
	Created_by: req.body.Created_By
  	});
	
	let userDetail = new userLogin(
		{
                                
        PWD: req.body.Password,    
		UserName:req.body.username, 
		//EmailID:req.body.Email_ID, 
		Active:1,
		TagID:'OR'
		});
		
		

  OrganizationRoleUser.addOrganizationRoleUser(newOrganizationRoleUser, (err, OrganizationRoleUser)=> {
  		if(err){
			
      res.json({success: false, msg:'Failed to register '});
	 	
    } else {
		userLogin.addUser(userDetail,(err,user)=>{
                    if(err){res.json({success: false, msg:'Failed to register in userLogin'});}
                                   });
      res.json({success: true, msg:'OrganizationRoleUser registered'});
    }
  });
});

router.post('/updateOrganizationUser', (req, res, next) => {
	
		console.log("routes" + req.body);
  let newOrganizationRoleUser = new OrganizationRoleUser({
	id :req.body._id,
  	//Student_Name: req.body.Student_Name,
  	Email_ID: req.body.Email_ID,
  	username: req.body.username,
	Department:req.body.Department,
  	
    //Student_ID: req.body.Student_ID,
    //DOB: req.body.DOB,
    //Address: req.body.Address,
    Mobile_No: req.body.Mobile_No,
    Orgn_ID: req.body.Orgn_ID,
    Role_ID: req.body.Role_ID
  	});
  OrganizationRoleUser.updateOrganizationRoleUser(newOrganizationRoleUser, (err, orgnRoleUser)=> {
                  
                                if(err){
                                                
      res.json({success: false, msg:'Failed to update '});
                  console.log(err);            
    } else {
      res.json({success: true, msg:'Organization updated'});
    }
  });
});

router.post('/deleteOrganizationUserRole', (req, res, next) => {
	
  OrganizationRoleUser.deleteOrganizationUserRole(req.body._id, (err, orgn)=> {
                  
                                if(err){
                                                
      res.json({success: false, msg:'Failed to delete '});
                  console.log(err);            
    } else {
      res.json({success: true, msg:'deleted '});
    }
  });
});


router.get('/getOrganizationRoleUserByOrgnID', (req, res) => {
  var orgnID = req.headers["orgnid"];  
  OrganizationRoleUser.getOrganizationRoleUserByOrgnID(orgnID, (err,OrganizationRoleUser)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
		  res.json(OrganizationRoleUser);
	  }
  });  
});

// Authenticate
router.post('/authenticateOrganizationRole', (req, res, next) => {
	
  const username = req.body.username;
  const Pwd = req.body.Pwd;
  
  OrganizationRoleUser.getOrganizationRoleUserByUserName(req.body.username, (err,OrganizationRoleUser)=>{
    if(err) throw err;
		if(!OrganizationRoleUser){
		  return res.json({success: false, msg: 'User not found!'})
		}
		else
		{
			
			// To compare the hash value with the password entered in the form - hareganx - 06/06/17
			if(true==true)
                {
                    const token = jwt.sign(OrganizationRoleUser, config.secret,{
                     expiresIn: 604800 //1 week
                     });
                     //this way is safer coz doesn't inc pass
                     res.json({
                         success: true,
                         token: 'JWT '+token,
                         organizationRoleUser: {
                             id: OrganizationRoleUser._id,
                             username: OrganizationRoleUser.username,
                             Email_ID: OrganizationRoleUser.Email_ID,                             
                             Mobile_No: OrganizationRoleUser.Mobile_No,                                                                                            
                             Role_ID:OrganizationRoleUser.Role_ID,
                             Orgn_ID:OrganizationRoleUser.Orgn_ID,
							 isPasswordChanged: OrganizationRoleUser.isPasswordChanged
                              }
                           }); 
                    }
             else
					{
                        return res.json({success: false, msg: 'Wrong password'});
                    }
		}
    });
  });



// // Profile
// router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
	
  // res.json({students: req.students});
// });


// //  update Profile
// router.post('/update', (req, res, next) => {
                // //console.log(req.body);
                // //console.log("update");
  // let newStudent2 = new OrganizationRoleUser({

    // Student_Heading:req.body.Student_Heading,
                // Student_Bio:req.body.Student_Bio,
                // Student_Name: req.body.Student_Name,
                // Email_ID: req.body.Email_ID,
                // username: req.body.username,
                // Pwd: req.body.Pwd,
    // Student_ID: req.body.Student_ID,
    // DOB: req.body.DOB,
    // Address: req.body.Address,
    // Mobile_No: req.body.Mobile_No,
    // Orgn_ID: req.body.Orgn_ID,
    // Dept_ID: req.body.Dept_ID
   


                // });

  // OrganizationRoleUser.udpateProfile(newStudent2, (err, student2)=> {
                  
                                // if(err){
                                                
      // res.json({success: false, msg:'Failed to update '});
                  // console.log(err);            
    // } else {
      // res.json({success: true, msg:'OrganizationRoleUser updated'});
    // }
  // });
// });

// // getStudentByID
// router.get('/getStudentByID', (req, res, next) => {
	
  // var studentID = req.headers["id"];  
  // console.log(studentID);
  // OrganizationRoleUser.getStudentById(studentID, (err,studentDetail)=>{
    // if(err) {
                                // throw err;                            
                // }
     // else
                  // {                            
                                  // res.json(studentDetail);
                  // }
  // });  
// }); 

// // Get OrganizationRoleUser by user name
// router.get('/getStudentByUserName', (req, res, next) => {
	
  // var username = req.headers["username"];  
  
  // OrganizationRoleUser.getStudentByUserName(username, (err,studentDetail)=>{
    // if(err) {
                                // throw err;                            
                // }
     // else
                  // {                            
                                  // res.json(studentDetail);
                  // }
  // });  
// }); 

// // router.get('/getAllStudent', (req, res, next) => {
	
  // // //var username = req.headers["username"];  
  
  // // OrganizationRoleUser.getAllStudent(err,studentDetail)=>{
    // // if(err) {
                                // // throw err;                            
                // // }
     // // else
                  // // {                            
                                  // // res.json(studentDetail);
                  // // }
  // // });  
// // }); 

// router.get('/getAllStudent', (req, res) => {  
  // OrganizationRoleUser.getAllStudent((err,OrganizationRoleUser)=>{
    // if(err) {             
                                // throw err;
                // }
     // else
                  // {                            
                                  // res.json(OrgnersityRoleUser);
                  // }
  // });  
// });

// // Get OrgnersityRoleUser by StudentID
// router.get('/getStudentByStudentID', (req, res, next) => {
	
  // var studentID = req.headers["studentid"];  
  
  // OrgnersityRoleUser.getStudentByStudentID(studentID, (err,studentDetail)=>{
    // if(err) {
                                // throw err;                            
                // }
     // else
                  // {                            
                                  // res.json(studentDetail);
                  // }
  // });  
// }); 

// // Get OrgnersityRoleUser by Email
// router.get('/getStudentByEmail', (req, res, next) => {
	
  // var Email = req.headers["emailid"];  
  // console.log(Email);
  // OrgnersityRoleUser.getStudentByEmail(Email, (err,studentDetail)=>{
    // if(err) {
                                // throw err;                            
                // }
     // else
                  // {                            
                                  // res.json(studentDetail);
                  // }
  // });  
// }); 

module.exports = router;
