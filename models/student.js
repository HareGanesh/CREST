const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const config = require('../config/database');
var bcrypt = require('bcrypt');
//Schema
const StudentSchema = mongoose.Schema({

	Student_Auto_ID:{
  type: Number
  },

  Student_ID:{
    type: String
  },

	Student_Name:{
		type: String
	},

	Email_ID:{
		type: String
		
	},

	username:{
		type: String,
		required: true
	},

	 Pwd:{
		type: String,
		required: true

	},

	Enroll_No:{
    type: String
  },

   DOB:{
    type: Date
  },
  
  GenderID:{
    type: String
  },
  
  isPasswordChanged:{
	  type: Boolean,
	  default:false
  },

   Address:{
    type: String
  },

  Mobile_No:{
    type: String
  },

  Univ_ID:{
    type: Number
  },
Orgn_ID:{
    type: Number
  },
   Dept_ID:{
    type: Number
  },

  DOJ_Fin_YR_ID:{
    type: Number
  },

   Active:{
    type: Boolean
  },

   Created_On:{
    type: Date
  },

   Created_by:{
    type: String
  },

   Modified_On:{
    type: Date
  },

   Modified_by:{
    type: String
  },
  Student_Heading:{type: String,default :''	},
  Student_Bio:{	type: String,default :''},

   Is_Approved:{type: Number, default:0}
});

const Student = module.exports = mongoose.model('Student', StudentSchema,'Student');
const saltRounds = 10;
module.exports.getStudentById = function(id, callback){
	console.log(id);
	Student.findById(id, callback);
}

module.exports.profile = function(id, callback){
	console.log(id);
	Student.findById(id, callback);
}

module.exports.getStudentByUserName = function(username,callback){
	const query = {username: username}
	Student.findOne(query,callback);
}

module.exports.getStudentByEmail = function(emailID,callback){
	const query = {Email_ID: emailID}
	Student.findOne(query,callback);
}

module.exports.getStudentByStudentID = function(studentID,callback){
	const query = {Student_ID: studentID}
	Student.findOne(query,callback);
}

module.exports.getStudentProfileByStudentID= function(StudentID,callback){
	//const query = {Student_ID:StudentID};
	Student.aggregate([
	{ $match: {
            Student_ID: StudentID
        }},
    {
      
		$lookup:
        {
          from: "StudentEducationDetail",
          localField: "Student_ID",
          foreignField: "StudentID",
          as: "StudentEducational_Info"
        }
   },
   {
      $lookup:
        {
          from: "StudentProfessionalDetail",
          localField: "Student_ID",
          foreignField: "StudentID",
          as: "StudentProfessional_Info"
        }
   },
   {
      $lookup:
        {
          from: "UniversityMaster",
          localField: "Univ_ID",
          foreignField: "Univ_ID",
          as: "StudentUniv_Info"
        }
   }
], callback);}

module.exports.getStudentByUnivID = function(univID,callback){
	const query = {Univ_ID: univID, Is_Approved:1}
	Student.find(query,callback);
}

module.exports.getPendingStudentByUnivID = function(univID,callback){
	const query = {Univ_ID: univID, Is_Approved:0}
	Student.find(query,callback);
}


module.exports.addStudent = function(newStudent, callback){
// To Create a hash value with the password entered in the form to store in DB - hareganx - 06/06/17	
	bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(newStudent.Pwd, salt, function(err, hash) {
		newStudent.Pwd=hash;
		newStudent.save(callback);
    });
});
  //if(err) throw err;
}

module.exports.getAllStudent = function(callback){	
	Student.find("",callback);
}

module.exports.comparePwd = function(candidatePwd, hash, callback){
	console.log(candidatePwd);
	console.log(hash);
  bcrypt.compare(candidatePwd, hash, (err, isMatch) => {
     if(err) throw err;
    callback(null, isMatch);
  });
}

module.exports.udpateProfile = function(newStudent, callback){ 
var query = { Student_ID: newStudent.Student_ID };
Student.update(query, {Student_Heading: newStudent.Student_Heading,Student_Bio:newStudent.Student_Bio,Student_Name:newStudent.Student_Name, Address:newStudent.Address, Mobile_No:newStudent.Mobile_No, Email_ID:newStudent.Email_ID}, callback);
}

module.exports.setIsApproved = function(Student_ID, callback){ 
var query = { Student_ID: Student_ID };
Student.update(query, {Is_Approved: 1}, callback);
}

module.exports.updatePassword = function(user, callback){ 
var query = { username	: user.EmailID };

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(user.PWD, salt, function(err, hash) {
		user.PWD=hash;
		Student.update(query, {Pwd: user.PWD, isPasswordChanged: user.isPasswordChanged}, callback);
	});
});
}
