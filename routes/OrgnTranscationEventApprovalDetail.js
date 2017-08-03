const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const OrgnTranscationEventApprovalDetail = require('../models/OrgnTranscationEventApprovalDetail');
const Event = require('../models/Event');
const EventOrganization = require('../models/EventOrganization');

router.post('/AddOrgnTranscationEventApprovalDetail', (req, res, next) => {
	
	 
	
  let newOrgnTranscationEventApprovalDetail = new OrgnTranscationEventApprovalDetail({
  	Tran_Approval_ID: req.body.TransApprovalID,
	Tran_Approval_IDNumber: req.body.TransApprovalIDNumber,	
	Orgn_ID:req.body.OrganizationID,
	Employee_ID:req.body.EmployeeID,
	EventID:req.body.EventID,
  	Tran_Map_ID: req.body.TransMapID,
	Prev_Approver_RID:req.body.PrevApproverRoleID,	
	Next_Approver_RID:req.body.NextApproverRoleID,
	Mask_ID:req.body.MaskID,
  	Status: req.body.Status,  
	Tran_Dt:"",
	Created_On: req.body.Created_On,
	Created_by: req.body.Created_by,
	Modified_On: req.body.Modified_On,
    Modified_by: req.body.Modified_by
  	});
  OrgnTranscationEventApprovalDetail.AddOrgnTranscationEventApprovalDetail(newOrgnTranscationEventApprovalDetail, (err, OrgnTranscationEventApprovalDetailx)=> {
	  
  		if(err){
      res.json({success: false, msg:'Failed to OrgnTranscationEventApprovalDetail Creation.'});
    } else {
		
      res.json({success: true, msg:'OrgnTranscationEventApprovalDetail Created.'});
    }
  });
});

router.post('/UpdateOrgnTranscationTypeDetailByTranMapID', (req, res, next) => {
	
	 
	
  let newOrgnTranscationEventApprovalDetail = new OrgnTranscationEventApprovalDetail({
  	Tran_Approval_ID: req.body.TransApprovalID,
	Tran_Approval_IDNumber: req.body.TransApprovalIDNumber,
	Orgn_ID:req.body.OrganizationID,
	Employee_ID:req.body.Employee_ID,
  	Tran_Map_ID: req.body.TransMapID,
	Prev_Approver_RID:req.body.PrevApproverRoleID,	
	Next_Approver_RID:req.body.NextApproverRoleID,
	Mask_ID:req.body.MaskID,
  	Status: req.body.Status,  
	Tran_Dt:req.body.TranDt,
	Created_On: req.body.Created_On,
	Created_by: req.body.Created_by,
	Modified_On: req.body.Modified_On,
    Modified_by: req.body.Modified_by
  	});
  OrgnTranscationEventApprovalDetail.UpdateOrgnTranscationTypeDetailByTranMapID(newOrgnTranscationEventApprovalDetail, (err, OrgnTranscationEventApprovalDetailx)=> {
	  
  		if(err){
      res.json({success: false, msg:'Failed to OrgnTranscationEventApprovalDetail updated.'});
    } else {
      res.json({success: true, msg:'OrgnTranscationEventApprovalDetail updated.'});
    }
  });
});

// router.get('/getOrgnTranscationEventApprovalDetailByID', (req, res) => {
  // var OrgnTranscationMapDetailID = req.headers["OrgnTranscationMapDetailID"];  
  // OrgnTranscationMapDetail.getOrgnTranscationMapDetailIDMstrById(OrgnTranscationMapDetailID, (err,OrgnTranscationMapDetail)=>{
    // if(err) {
		// throw err;		
	// }
     // else
	  // {		 
		  // res.json(OrgnTranscationMapDetail);
	  // }
  // });  
// });



router.get('/getAllOrgnTranscationEventApprovalDetail', (req, res) => {

console.log("Test");	
  OrgnTranscationEventApprovalDetail.getAllOrgnTranscationEventApprovalDetail((err,OrgnTranscationEventApprovalDetail)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(OrgnTranscationEventApprovalDetail); 
		  res.json(OrgnTranscationEventApprovalDetail);
	  }
  });  
});

router.get('/getAllOrgnTranscationEventApprovalDetailByOrgnID', (req, res) => {
var orgnid = req.headers["orgnid"]; 
var maskID = req.headers["maskid"]; 

console.log("Test");	
  OrgnTranscationEventApprovalDetail.getAllOrgnTranscationEventApprovalDetailByOrgnID(orgnid,maskID, (err,OrgnTranscationEventApprovalDetail)=>{
    if(err) {	
		throw err;
	}
     else
	  {		
          console.log(OrgnTranscationEventApprovalDetail); 
		  EventOrganization.getEventOrganizationByOrgnID(orgnid, (err,Event)=>{
			if(err) {
                                throw err;                            
                }
			else
                  {                     
				console.log("aaaa");			
				
                   res.json({OrgnTranscationEventApprovalDetail:OrgnTranscationEventApprovalDetail, evt:Event});
				  
                  }
			});  
          
		 
	  }
  });  
});

router.get('/getAllOrgnTranscationEventApprovalDetailInfoByOrgnID', (req, res) => {
var orgnid = req.headers["orgnid"]; 
var maskID = req.headers["maskid"]; 

console.log("Test");	
  OrgnTranscationEventApprovalDetail.getAllOrgnTranscationEventApprovalDetailInfoByOrgnID(orgnid,maskID, (err,OrgnTranscationEventApprovalDetail)=>{
    if(err) {	
		throw err;
	}
     else
	  {		
          console.log(OrgnTranscationEventApprovalDetail); 
		  EventOrganization.getEventOrganizationByOrgnID(orgnid, (err,Event)=>{
			if(err) {
                                throw err;                            
                }
			else
                  {                     
				console.log("aaaa");			
				
                   res.json({OrgnTranscationEventApprovalDetail:OrgnTranscationEventApprovalDetail, evt:Event});
				  
                  }
			});  
          
		 
	  }
  });  
});

router.get('/getAllOrgnTranscationEventApprovalDetailInfoByOrgnIDAndRoleID', (req, res) => {
var orgnid = req.headers["orgnid"]; 
var roleId = req.headers["roleid"]; 

console.log("Test");	
  OrgnTranscationEventApprovalDetail.getAllOrgnTranscationEventApprovalDetailInfoByOrgnIDAndRoleID(orgnid,roleId, (err,OrgnTranscationEventApprovalDetail)=>{
    if(err) {	
		throw err;
	}
     else
	  {		
          console.log(OrgnTranscationEventApprovalDetail); 
		  EventOrganization.getEventOrganizationByOrgnID(orgnid, (err,Event)=>{
			if(err) {
                                throw err;                            
                }
			else
                  {                     
				console.log("aaaa");			
				
                   res.json({OrgnTranscationEventApprovalDetail:OrgnTranscationEventApprovalDetail, evt:Event});
				  
                  }
			});  
          
		 
	  }
  });  
});


router.get('/getMaxTransApprovalID', (req, res) => {


  OrgnTranscationEventApprovalDetail.getMaxTransApprovalID((err,OrgnTranscationEventApprovalDetail)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(OrgnTranscationEventApprovalDetail); 
		  res.json(OrgnTranscationEventApprovalDetail);
	  }
  });  
});

router.get('/getMaxTransApprovalNumberID', (req, res) => {


  OrgnTranscationEventApprovalDetail.getMaxTransApprovalNumberID((err,OrgnTranscationEventApprovalDetail)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(OrgnTranscationEventApprovalDetail); 
		  res.json(OrgnTranscationEventApprovalDetail);
	  }
  });  
});

router.post('/DeleteOrgnTranscationEventApprovalDetailByApprovalId', (req, res) => {
  var OrgnTranscationEventApprovalDetailID = req.headers["OrgnTranscationEventApprovalDetailID"]; 
 
  OrgnTranscationEventApprovalDetail.DeleteOrgnTranscationEventApprovalDetailByApprovalId(OrgnTranscationEventApprovalDetailID, (err,OrgnTranscationEventApprovalDetail)=>{
    if(err) {
		throw err;		
	}
     else
	  {	 
		  res.json(OrgnTranscationEventApprovalDetail);
	  }
  });  
});


module.exports = router;
