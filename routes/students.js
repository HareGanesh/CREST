const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Student = require('../models/student');
const UnivTranscationApprovalDetail = require('../models/UnivTranscationApprovalDetail');
var bcrypt = require('bcrypt');
const userLogin = require('../models/UserLogin'); 

/// Register
router.post('/register', (req, res, next) => {
	
	TransApprovalMappingInfo = req.body.TransApprovalMapping;
  let newStudent = new Student({

  	Student_Name: req.body.Student_Name,
  	Email_ID: req.body.Email_ID,
  	username: req.body.username,
  	Pwd: req.body.Pwd,
    Student_ID: req.body.Student_ID,
    DOB: req.body.DOB,
    Address: req.body.Address,
    Mobile_No: req.body.Mobile_No,
    Univ_ID: req.body.Univ_ID,
    Is_Approved:0
  	});

  Student.addStudent(newStudent, (err, student)=> {
  		if(err){
			
      res.json({success: false, msg:'Failed to register '});
	 	
    } else {
			
		if(TransApprovalMappingInfo !='')
                                {
                                  var  univTranscationApprovalDetail= new UnivTranscationApprovalDetail();
                                  univTranscationApprovalDetail.Tran_Approval_ID= TransApprovalMappingInfo.TransApprovalID;
								  univTranscationApprovalDetail.Tran_Approval_IDNumber= TransApprovalMappingInfo.TransApprovalIDNumber;
								  univTranscationApprovalDetail.Univ_ID=TransApprovalMappingInfo.UniversityID;
                                  univTranscationApprovalDetail.Student_ID=req.body.Student_ID;     
								  univTranscationApprovalDetail.Tran_Map_ID= TransApprovalMappingInfo.TransMapID;
								  univTranscationApprovalDetail.Prev_Approver_RID=0;
                                  univTranscationApprovalDetail.Next_Approver_RID=TransApprovalMappingInfo.NextApproverRoleID; 
								  univTranscationApprovalDetail.Status=TransApprovalMappingInfo.Status; 
								  univTranscationApprovalDetail.Mask_ID=TransApprovalMappingInfo.MaskID; 
                                  univTranscationApprovalDetail.Tran_Dt=""; 								  
                                  UnivTranscationApprovalDetail.AddUnivTranscationApprovalDetail(univTranscationApprovalDetail, (err, univTranscationApproval)=> {
                                             
                                            }); 
                                }
	
		let userDetail = new userLogin(
		{
                                
        PWD: req.body.ConfirmPwd,    
		UserName:req.body.username, 
		//EmailID:req.body.Email_ID,
		Active:1,
		TagID:'S'
		});
		
		userLogin.addUser(userDetail,(err,user)=>{
                    if(err){res.json({success: false, msg:'Failed to register in userLogin'});}
                                   });
      res.json({success: true, msg:'Student registered'});
    }
  });
});


// Authenticate
router.post('/authenticate', (req, res, next) => {
	
  const username = req.body.username;
  const Pwd = req.body.Pwd;
  Student.getStudentByUserName(username, (err,student)=>{
    if(err) throw err;
		if(!student){
		  return res.json({success: false, msg: 'User not found!'})
		}
		else
		{
			if(student.Is_Approved == 0)
			{
				return res.json({success: false, msg: 'Approval Pending!'})
			}
			else if(student.Is_Approved == 1)
			{
			// To compare the hash value with the password entered in the form - hareganx - 06/06/17
			bcrypt.compare(req.body.Pwd, student.Pwd, function(err, result) {
				
				if(result==true)
				{
					const token = jwt.sign(student, config.secret,{
					  expiresIn: 604800 //1 week
					});
					//this way is safer coz doesn't inc pass
					res.json({
					  success: true,
					  token: 'JWT '+token,
					  student: {
						id: student._id,
						Student_Name: student.Student_Name,
						username:student.username,
						//Email_ID: student.Email_ID,
						Student_ID: student.Student_ID,
						Mobile_No: student.Mobile_No,
						DOB:student.DOB,
						Address:student.Address,
						Orgn_ID:student.Orgn_ID,
						Univ_ID:student.Univ_ID,
						isPasswordChanged: student.isPasswordChanged
					  }
					}); 
				}
				else
				{
					 return res.json({success: false, msg: 'Wrong password'});
				}		
				
			});
			}
		}
    });
  });



// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
	
  res.json({students: req.students});
});


//  update Profile
router.post('/update', (req, res, next) => {
                //console.log(req.body);
                //console.log("update");
  let newStudent2 = new Student({

    Student_Heading:req.body.Student_Heading,
                Student_Bio:req.body.Student_Bio,
                Student_Name: req.body.Student_Name,
                Email_ID: req.body.Email_ID,
                username: req.body.username,
                Pwd: req.body.Pwd,
    Student_ID: req.body.Student_ID,
    DOB: req.body.DOB,
    Address: req.body.Address,
    Mobile_No: req.body.Mobile_No,
    Orgn_ID: req.body.Orgn_ID,
    Dept_ID: req.body.Dept_ID
   


                });

  Student.udpateProfile(newStudent2, (err, student2)=> {
                  
                                if(err){
                                                
      res.json({success: false, msg:'Failed to update '});
                  console.log(err);            
    } else {
      res.json({success: true, msg:'Student updated'});
    }
  });
});

// getStudentByID
router.get('/getStudentByID', (req, res, next) => {
	
  var studentID = req.headers["id"];  
  console.log(studentID);
  Student.getStudentById(studentID, (err,studentDetail)=>{
    if(err) {
                                throw err;                            
                }
     else
                  {                            
                                  res.json(studentDetail);
                  }
  });  
}); 

// Get student by user name
router.get('/getStudentByUserName', (req, res, next) => {
	
  var username = req.headers["username"];  
  
  Student.getStudentByUserName(username, (err,studentDetail)=>{
    if(err) {
                                throw err;                            
                }
     else
                  {                            
                                  res.json(studentDetail);
                  }
  });  
}); 

// router.get('/getAllStudent', (req, res, next) => {
	
  // //var username = req.headers["username"];  
  
  // Student.getAllStudent(err,studentDetail)=>{
    // if(err) {
                                // throw err;                            
                // }
     // else
                  // {                            
                                  // res.json(studentDetail);
                  // }
  // });  
// }); 

router.get('/getAllStudent', (req, res) => {  
  Student.getAllStudent((err,student)=>{
    if(err) {             
                                throw err;
                }
     else
                  {                            
                                  res.json(student);
                  }
  });  
});

// Get student by StudentID
router.get('/getStudentByStudentID', (req, res, next) => {
	
  var studentID = req.headers["studentid"];  
  
  Student.getStudentByStudentID(studentID, (err,studentDetail)=>{
    if(err) {
                                throw err;                            
                }
     else
                  {                            
                                  res.json(studentDetail);
                  }
  });  
}); 

router.get('/getStudentByUnivID', (req, res, next) => {
	
  var univID = req.headers["univid"];  
  
  Student.getStudentByUnivID(univID, (err,studentDetail)=>{
    if(err) {
                                throw err;                            
                }
     else
                  {                            
                                  res.json(studentDetail);
                  }
  });  
}); 

router.get('/getPendingStudentByUnivID', (req, res, next) => {
	
  var univID = req.headers["univid"];  
  
  Student.getPendingStudentByUnivID(univID, (err,studentDetail)=>{
    if(err) {
                                throw err;                            
                }
     else
                  {                            
                                  res.json(studentDetail);
                  }
  });  
}); 

//setIsApproved
router.get('/setIsApproved', (req, res, next) => {
	
  var studentID = req.headers["studentid"];  
  
  Student.setIsApproved(studentID, (err,studentDetail)=>{
    if(err) {
                                throw err;                            
                }
     else
                  {                            
                                  res.json(studentDetail);
                  }
  });  
}); 

// Get student by Email
router.get('/getStudentByEmail', (req, res, next) => {
	
  var Email = req.headers["emailid"];  
  console.log(Email);
  Student.getStudentByEmail(Email, (err,studentDetail)=>{
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
