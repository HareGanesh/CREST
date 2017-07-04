const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const UniversityRoleUser = require('../models/UniversityRoleUser');
const userLogin = require('../models/UserLogin'); 

//var bcrypt = require('bcrypt');

/// Register
router.post('/register', (req, res, next) => {
	
	
  let newUniversityRoleUser = new UniversityRoleUser({

  	//Student_Name: req.body.Student_Name,
  	Email_ID: req.body.Email_ID,
  	username: req.body.username,
  	Pwd: req.body.Password,
    //Student_ID: req.body.Student_ID,
    //DOB: req.body.DOB,
    //Address: req.body.Address,
    Mobile_No: req.body.Mobile_No,
    Univ_ID: req.body.Univ_ID,
    Role_ID: req.body.RoleID
  	});
	
	let userDetail = new userLogin(
		{
                                
        PWD: req.body.Password,    
		UserName:req.body.username, 
		//EmailID:req.body.Email_ID, 
		Active:1,
		TagID:'UR'
		});
		
		

  UniversityRoleUser.addUniversityRoleUser(newUniversityRoleUser, (err, UniversityRoleUser)=> {
  		if(err){
			
      res.json({success: false, msg:'Failed to register '});
	 	
    } else {
		userLogin.addUser(userDetail,(err,user)=>{
                    if(err){res.json({success: false, msg:'Failed to register in userLogin'});}
                                   });
      res.json({success: true, msg:'UniversityRoleUser registered'});
    }
  });
});


// Authenticate
router.post('/authenticateUniversityRole', (req, res, next) => {
	
  const username = req.body.username;
  const Pwd = req.body.Pwd;
  UniversityRoleUser.getUniversityRoleUserByUserName(username, (err,UniversityRoleUser)=>{
    if(err) throw err;
		if(!UniversityRoleUser){
		  return res.json({success: false, msg: 'User not found!'})
		}
		else
		{
			// To compare the hash value with the password entered in the form - hareganx - 06/06/17
			if(true==true)
                {
                    const token = jwt.sign(UniversityRoleUser, config.secret,{
                     expiresIn: 604800 //1 week
                     });
                     //this way is safer coz doesn't inc pass
                     res.json({
                         success: true,
                         token: 'JWT '+token,
                         universityRoleUser: {
                             id: UniversityRoleUser._id,
                             username: UniversityRoleUser.username,
                             Email_ID: UniversityRoleUser.Email_ID,                             
                             Mobile_No: UniversityRoleUser.Mobile_No,                                                                                            
                             Role_ID:UniversityRoleUser.Role_ID,
                             Univ_ID:UniversityRoleUser.Univ_ID 
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
  // let newStudent2 = new UniversityRoleUser({

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

  // UniversityRoleUser.udpateProfile(newStudent2, (err, student2)=> {
                  
                                // if(err){
                                                
      // res.json({success: false, msg:'Failed to update '});
                  // console.log(err);            
    // } else {
      // res.json({success: true, msg:'UniversityRoleUser updated'});
    // }
  // });
// });

// // getStudentByID
// router.get('/getStudentByID', (req, res, next) => {
	
  // var studentID = req.headers["id"];  
  // console.log(studentID);
  // UniversityRoleUser.getStudentById(studentID, (err,studentDetail)=>{
    // if(err) {
                                // throw err;                            
                // }
     // else
                  // {                            
                                  // res.json(studentDetail);
                  // }
  // });  
// }); 

// // Get UniversityRoleUser by user name
// router.get('/getStudentByUserName', (req, res, next) => {
	
  // var username = req.headers["username"];  
  
  // UniversityRoleUser.getStudentByUserName(username, (err,studentDetail)=>{
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
  
  // // UniversityRoleUser.getAllStudent(err,studentDetail)=>{
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
  // UniversityRoleUser.getAllStudent((err,UniversityRoleUser)=>{
    // if(err) {             
                                // throw err;
                // }
     // else
                  // {                            
                                  // res.json(UniversityRoleUser);
                  // }
  // });  
// });

// // Get UniversityRoleUser by StudentID
// router.get('/getStudentByStudentID', (req, res, next) => {
	
  // var studentID = req.headers["studentid"];  
  
  // UniversityRoleUser.getStudentByStudentID(studentID, (err,studentDetail)=>{
    // if(err) {
                                // throw err;                            
                // }
     // else
                  // {                            
                                  // res.json(studentDetail);
                  // }
  // });  
// }); 

// // Get UniversityRoleUser by Email
// router.get('/getStudentByEmail', (req, res, next) => {
	
  // var Email = req.headers["emailid"];  
  // console.log(Email);
  // UniversityRoleUser.getStudentByEmail(Email, (err,studentDetail)=>{
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
