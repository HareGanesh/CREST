const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const OrgnTranscationTypeDetail = require('../models/OrgnTranscationTypeDetail');
const OrgnTranscationMaskDetail = require('../models/OrgnTranscationMaskDetail');
const OrgnTranscationMapDetail = require('../models/OrgnTranscationMapDetail');
const OrganizationRole = require('../models/OrganizationRoleMstr');

router.post('/AddOrgnTranscationTypeDetail', (req, res, next) => {
	
	 console.log(req.body);
	TransMask=req.body.TransMask;            
    TransMap=req.body.TransMap;
  let newOrgnTranscationTypeDetail = new OrgnTranscationTypeDetail({
  	Tran_Type_ID: req.body.TransTypeID,
  	Tran_Map_ID: req.body.TransMapID,
	Tran_Flow_Start_DT: req.body.TransFlowStartDate,
	Tran_Flow_End_DT: req.body.TransFlowEndDate,
	Orgn_ID:req.body.OrganizationID,
	No_of_Levels:req.body.NoOfLevel,
	
  	Active: req.body.Active,  
	Created_On: req.body.Created_On,
	Created_by: req.body.Created_by,
	Modified_On: req.body.Modified_On,
    Modified_by: req.body.Modified_by
  	});
	
	
	
	// --- Update logic
	
	OrgnTranscationTypeDetail.getOrgnTranscationTypeDetailByOrgnIDAndTransTypeAndEffDateBetweenStartAndEnd(req.body.OrganizationID,req.body.TransTypeID, req.body.TransFlowStartDate, (err,OrgnTranscationTypeDetail1)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
  console.log(OrgnTranscationTypeDetail1);
		  
		  if(OrgnTranscationTypeDetail1.length > 0)
		  {
		  OrgnTranscationTypeDetail.UpdateOrgnTranscationTypeDetailByTranMapID(newOrgnTranscationTypeDetail, (err, TransMapArray)=> 
		  {
             console.log(TransMapArray);
			 
          });
		  // Delete all corresponding mapping and masking data
		  
		  OrgnTranscationMaskDetail.DeleteOrgnTranscationMaskDetailById(OrgnTranscationTypeDetail1[0].Tran_Map_ID, (err, TransMap)=> {
                                                                                console.log(TransMap);
                                                                });
																
		  OrgnTranscationMapDetail.DeleteOrgnTranscationMapDetailById(OrgnTranscationTypeDetail1[0].Tran_Map_ID, (err, TransMap)=> {
                                                                                console.log(TransMap);
                                                                });
																
		// Add Masking data
						if(TransMask.length>0)
                                {
                                                for(var n=0;n < TransMask.length; n++)
                                                {
                                                    var  orgnTranscationMaskDetail= new OrgnTranscationMaskDetail();
                                                                orgnTranscationMaskDetail.Tran_Map_ID= TransMask[n].TransMapID;
																orgnTranscationMaskDetail.Mask_ID=TransMask[n].MaskID;
																orgnTranscationMaskDetail.Priority=TransMask[n].Priority;                                                 
                                                                
                                                                OrgnTranscationMaskDetail.AddOrgnTranscationMaskDetail(orgnTranscationMaskDetail, (err, TransMask)=> {
                                                                                console.log(TransMask);
                                                                });
                                                }
                                                
                                }
					// add Mapping data				
						if(TransMap.length>0)
                                {
									console.log("amit");
                                                for(var n=0;n < TransMap.length; n++)
                                                {
                                                    var  orgnTranscationMapDetail= new OrgnTranscationMapDetail();
                                                                orgnTranscationMapDetail.Tran_Map_ID= TransMap[n].TransMapID;
																orgnTranscationMapDetail.Role_ID=TransMap[n].RoleID;
																orgnTranscationMapDetail.Priority=TransMap[n].Priority;                                                 
                                                                
                                                                OrgnTranscationMapDetail.AddOrgnTranscationMapDetail(orgnTranscationMapDetail, (err, TransMap)=> {
                                                                                console.log(TransMap);
                                                                });
                                                }
                                                
                                }
			res.json({success: true, msg:'Updated'});												
		  }
		  else 
		  {
			  
			  // Add here
			  OrgnTranscationTypeDetail.AddOrgnTranscationTypeDetail(newOrgnTranscationTypeDetail, (err, OrgnTranscationTypeDetail)=> {
				console.log(newOrgnTranscationTypeDetail);
				if(err){
					res.json({success: false, msg:'Failed to OrgnTranscationTypeDetail Creation.'});
						} else {
					// Add Masking data
						if(TransMask.length>0)
                                {
                                                for(var n=0;n < TransMask.length; n++)
                                                {
                                                    var  orgnTranscationMaskDetail= new OrgnTranscationMaskDetail();
                                                                orgnTranscationMaskDetail.Tran_Map_ID= TransMask[n].TransMapID;
																orgnTranscationMaskDetail.Mask_ID=TransMask[n].MaskID;
																orgnTranscationMaskDetail.Priority=TransMask[n].Priority;                                                 
                                                                
                                                                OrgnTranscationMaskDetail.AddOrgnTranscationMaskDetail(orgnTranscationMaskDetail, (err, TransMask)=> {
                                                                                console.log(TransMask);
                                                                });
                                                }
                                                
                                }
					// add Mapping data				
						if(TransMap.length>0)
                                {
									console.log("amit");
                                                for(var n=0;n < TransMap.length; n++)
                                                {
                                                    var  orgnTranscationMapDetail= new OrgnTranscationMapDetail();
                                                                orgnTranscationMapDetail.Tran_Map_ID= TransMap[n].TransMapID;
																orgnTranscationMapDetail.Role_ID=TransMap[n].RoleID;
																orgnTranscationMapDetail.Priority=TransMap[n].Priority;                                                 
                                                                
                                                                OrgnTranscationMapDetail.AddOrgnTranscationMapDetail(orgnTranscationMapDetail, (err, TransMap)=> {
                                                                                console.log(TransMap);
                                                                });
                                                }
                                                
                                }
					res.json({success: true, msg:'OrgnTranscationTypeDetail Created.'});
						}
				});			
		  }															
		
	  }
  });  
	
	
	
	// ---  End Here
	
  
});


router.get('/getOrgnTranscationTypeDetailByOrgnIDAndTransTypeAndCurrentDate', (req, res) => {
  var orgnid = req.headers["orgnid"]; 
  var transcationType = req.headers["transcationtypeid"]; 

  console.log(orgnid);
  console.log(transcationType);
  OrgnTranscationTypeDetail.getOrgnTranscationTypeDetailByOrgnIDAndTransTypeAndCurrentDate(orgnid,transcationType, (err,OrgnTranscationTypeDetail1)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
  console.log(OrgnTranscationTypeDetail1);
		  
		  if(OrgnTranscationTypeDetail1.length > 0)
		  {
		  OrgnTranscationMapDetail.getOrgnTranscationMapDetailByID(OrgnTranscationTypeDetail1[0].Tran_Map_ID, (err, TransMapArray)=> 
		  {
             console.log(TransMapArray);
			 res.json(TransMapArray);
          });
		  }else {
			res.json({success: true, msg:'No Record'});  
		  }
																
		
	  }
  });  
});

router.get('/GetOrgnTranscationTypeDetailByOrgnIDAndTransType', (req, res) => {
  var orgnid = req.headers["orgnid"]; 
  var transcationType = req.headers["transcationtypeid"]; 

  console.log(orgnid);
  console.log(transcationType);
  OrgnTranscationTypeDetail.getOrgnTranscationTypeDetailByOrgnIDAndTransType(orgnid,transcationType, (err,OrgnTranscationTypeDetail1)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
  console.log(OrgnTranscationTypeDetail1);
		  
		  if(OrgnTranscationTypeDetail1.length > 0)
		  {
		  OrgnTranscationMapDetail.getOrgnTranscationMapDetailByID(OrgnTranscationTypeDetail1[0].Tran_Map_ID, (err, TransMapArray)=> 
		  {
             console.log(TransMapArray);
			 res.json(TransMapArray);
          });
		  }else {
			res.json({success: true, msg:'No Record'});  
		  }
																
		
	  }
  });  
});

router.get('/GetOrgnTranscationTypeDetailInfoByOrgnIDAndTransType', (req, res) => {
  var orgnid = req.headers["orgnid"]; 
  var transcationType = req.headers["transcationtypeid"]; 

  console.log(orgnid);
  console.log(transcationType);
  OrgnTranscationTypeDetail.getOrgnTranscationTypeDetailByOrgnIDAndTransTypeAndEffDate(orgnid,transcationType, (err,OrgnTranscationTypeDetail1)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
  console.log(OrgnTranscationTypeDetail1);
		  OrganizationRole.getOrganizationRoleMstrByOrgnID(orgnid, (err,orgnRoles)=>{
    if(err) {
		throw err;		
	}
     else
	  {	
		  if(OrgnTranscationTypeDetail1.length > 0)
		  {
		  OrgnTranscationMapDetail.getOrgnTranscationMapDetailByID(OrgnTranscationTypeDetail1[0].Tran_Map_ID, (err, TransMapArray)=> 
		  {
             console.log(TransMapArray);
			 res.json({TransMapArray:TransMapArray, OrgnTranscationTypeDetail: OrgnTranscationTypeDetail1, orgnRoles: orgnRoles, msg:'Record'});
          });
		  }else {
			res.json({success: true, TransMapArray:[], orgnRoles: orgnRoles});  
		  }  
		}
		  });
		  }  
	  
  });  
});


router.get('/getOrgnTranscationTypeDetailByOrgnID', (req, res) => {
  var orgnid = req.headers["orgnid"];  
  OrgnTranscationTypeDetail.getOrgnTranscationTypeDetailByOrgnID(orgnid, (err,OrgnTranscationTypeDetail1)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
  	res.json(OrgnTranscationTypeDetail1);
	  }
  });  
});

router.get('/getAllOrgnTranscationTypeListByOrgnIDAndTranType', (req, res) => {
  var orgnid = req.headers["orgnid"]; 
  var transcationType = req.headers["transcationtypeid"]; 

  console.log(orgnid);
  console.log(transcationType);
  OrgnTranscationTypeDetail.getAllOrgnTranscationTypeListByOrgnIDAndTranType(orgnid,transcationType, (err,OrgnTranscationTypeDetail1)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
  	res.json(OrgnTranscationTypeDetail1);
	  }
  });  
});

router.get('/getAllOrgnTranscationTypeDetail', (req, res) => {

console.log("Test");	
  OrgnTranscationTypeDetail.getAllOrgnTranscationTypeDetail((err,OrgnTranscationTypeDetail)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(OrgnTranscationTypeDetail); 
		  res.json(OrgnTranscationTypeDetail);
	  }
  });  
});



router.get('/getMaxOrgnTransMapID', (req, res) => {

console.log("Test Max");	
  OrgnTranscationTypeDetail.getMaxTransMapID((err,OrgnTranscationTypeDetail)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(OrgnTranscationTypeDetail); 
		  res.json(OrgnTranscationTypeDetail);
	  }
  });  
});


// router.get('/getMaxTransMapID', (req, res) => {

// console.log("Test Max");	
  // OrgnTranscationTypeDetail.getMaxTransMapID((err,OrgnTranscationTypeDetail)=>{
    // if(err) {	
		// throw err;
	// }
     // else
	  // {		console.log(OrgnTranscationTypeDetail); 
		  // res.json(OrgnTranscationTypeDetail);
	  // }
  // });  
// });

router.post('/RemoveOrgnTranscationTypeDetailByID', (req, res) => {
  var OrgnTranscationTypeDetailID = req.headers["OrgnTranscationTypeDetailID"]; 
console.log(CategoryID);  
  OrgnTranscationTypeDetail.DeleteOrgnTranscationTypeDetailById(OrgnTranscationTypeDetailID, (err,OrgnTranscationTypeDetail)=>{
    if(err) {
		throw err;		
	}
     else
	  {	console.log(OrgnTranscationTypeDetail);	 
		  res.json(OrgnTranscationTypeDetail);
	  }
  });  
});


module.exports = router;
