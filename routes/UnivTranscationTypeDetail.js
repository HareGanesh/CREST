const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const UnivTranscationTypeDetail = require('../models/UnivTranscationTypeDetail');
const UnivTranscationMaskDetail = require('../models/UnivTranscationMaskDetail');
const UnivTranscationMapDetail = require('../models/UnivTranscationMapDetail');

router.post('/AddUnivTranscationTypeDetail', (req, res, next) => {
	
	 console.log(req.body);
	TransMask=req.body.TransMask;            
    TransMap=req.body.TransMap;
  let newUnivTranscationTypeDetail = new UnivTranscationTypeDetail({
  	Tran_Type_ID: req.body.TransTypeID,
  	Tran_Map_ID: req.body.TransMapID,
	Univ_ID:req.body.UniversityID,
	No_of_Levels:req.body.NoOfLevel,
  	Active: req.body.Active,  
	Created_On: req.body.Created_On,
	Created_by: req.body.Created_by,
	Modified_On: req.body.Modified_On,
    Modified_by: req.body.Modified_by
  	});
	
	
	
	// --- Update logic
	
	UnivTranscationTypeDetail.getUnivTranscationTypeDetailByUnivIDAndTransType(req.body.UniversityID,req.body.TransTypeID, (err,UnivTranscationTypeDetail1)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
  console.log(UnivTranscationTypeDetail1);
		  
		  if(UnivTranscationTypeDetail1.length > 0)
		  {
		  UnivTranscationTypeDetail.UpdateUnivTranscationTypeDetailByTranMapID(newUnivTranscationTypeDetail, (err, TransMapArray)=> 
		  {
             console.log(TransMapArray);
			 
          });
		  // Delete all corresponding mapping and masking data
		  
		  UnivTranscationMaskDetail.DeleteUnivTranscationMaskDetailById(UnivTranscationTypeDetail1[0].Tran_Map_ID, (err, TransMap)=> {
                                                                                console.log(TransMap);
                                                                });
																
		  UnivTranscationMapDetail.DeleteUnivTranscationMapDetailById(UnivTranscationTypeDetail1[0].Tran_Map_ID, (err, TransMap)=> {
                                                                                console.log(TransMap);
                                                                });
																
		// Add Masking data
						if(TransMask.length>0)
                                {
                                                for(var n=0;n < TransMask.length; n++)
                                                {
                                                    var  univTranscationMaskDetail= new UnivTranscationMaskDetail();
                                                                univTranscationMaskDetail.Tran_Map_ID= TransMask[n].TransMapID;
																univTranscationMaskDetail.Mask_ID=TransMask[n].MaskID;
																univTranscationMaskDetail.Priority=TransMask[n].Priority;                                                 
                                                                
                                                                UnivTranscationMaskDetail.AddUnivTranscationMaskDetail(univTranscationMaskDetail, (err, TransMask)=> {
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
                                                    var  univTranscationMapDetail= new UnivTranscationMapDetail();
                                                                univTranscationMapDetail.Tran_Map_ID= TransMap[n].TransMapID;
																univTranscationMapDetail.Role_ID=TransMap[n].RoleID;
																univTranscationMapDetail.Priority=TransMap[n].Priority;                                                 
                                                                
                                                                UnivTranscationMapDetail.AddUnivTranscationMapDetail(univTranscationMapDetail, (err, TransMap)=> {
                                                                                console.log(TransMap);
                                                                });
                                                }
                                                
                                }
			res.json({success: true, msg:'Updated'});												
		  }
		  else 
		  {
			  
			  // Add here
			  UnivTranscationTypeDetail.AddUnivTranscationTypeDetail(newUnivTranscationTypeDetail, (err, UnivTranscationTypeDetail)=> {
				console.log(newUnivTranscationTypeDetail);
				if(err){
					res.json({success: false, msg:'Failed to UnivTranscationTypeDetail Creation.'});
						} else {
					// Add Masking data
						if(TransMask.length>0)
                                {
                                                for(var n=0;n < TransMask.length; n++)
                                                {
                                                    var  univTranscationMaskDetail= new UnivTranscationMaskDetail();
                                                                univTranscationMaskDetail.Tran_Map_ID= TransMask[n].TransMapID;
																univTranscationMaskDetail.Mask_ID=TransMask[n].MaskID;
																univTranscationMaskDetail.Priority=TransMask[n].Priority;                                                 
                                                                
                                                                UnivTranscationMaskDetail.AddUnivTranscationMaskDetail(univTranscationMaskDetail, (err, TransMask)=> {
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
                                                    var  univTranscationMapDetail= new UnivTranscationMapDetail();
                                                                univTranscationMapDetail.Tran_Map_ID= TransMap[n].TransMapID;
																univTranscationMapDetail.Role_ID=TransMap[n].RoleID;
																univTranscationMapDetail.Priority=TransMap[n].Priority;                                                 
                                                                
                                                                UnivTranscationMapDetail.AddUnivTranscationMapDetail(univTranscationMapDetail, (err, TransMap)=> {
                                                                                console.log(TransMap);
                                                                });
                                                }
                                                
                                }
					res.json({success: true, msg:'UnivTranscationTypeDetail Created.'});
						}
				});			
		  }															
		
	  }
  });  
	
	
	
	// ---  End Here
	
  
});

router.get('/GetUnivTranscationTypeDetailByUnivIDAndTransType', (req, res) => {
  var univid = req.headers["univid"]; 
  var transcationType = req.headers["transcationtypeid"]; 

  console.log(univid);
  console.log(transcationType);
  UnivTranscationTypeDetail.getUnivTranscationTypeDetailByUnivIDAndTransType(univid,transcationType, (err,UnivTranscationTypeDetail1)=>{
    if(err) {
		throw err;		
	}
     else
	  {		 
  console.log(UnivTranscationTypeDetail1);
		  
		  if(UnivTranscationTypeDetail1.length > 0)
		  {
		  UnivTranscationMapDetail.getUnivTranscationMapDetailByID(UnivTranscationTypeDetail1[0].Tran_Map_ID, (err, TransMapArray)=> 
		  {
             console.log(TransMapArray);
			 res.json(TransMapArray);
          });
		  }else {
			res.json({success: true, msg:'No record.'});  
		  }
																
		
	  }
  });  
});



router.get('/getAllUnivTranscationTypeDetail', (req, res) => {

console.log("Test");	
  UnivTranscationTypeDetail.getAllUnivTranscationTypeDetail((err,UnivTranscationTypeDetail)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(UnivTranscationTypeDetail); 
		  res.json(UnivTranscationTypeDetail);
	  }
  });  
});

router.get('/getMaxTransMapID', (req, res) => {

console.log("Test Max");	
  UnivTranscationTypeDetail.getMaxTransMapID((err,UnivTranscationTypeDetail)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(UnivTranscationTypeDetail); 
		  res.json(UnivTranscationTypeDetail);
	  }
  });  
});


// router.get('/getMaxTransMapID', (req, res) => {

// console.log("Test Max");	
  // UnivTranscationTypeDetail.getMaxTransMapID((err,UnivTranscationTypeDetail)=>{
    // if(err) {	
		// throw err;
	// }
     // else
	  // {		console.log(UnivTranscationTypeDetail); 
		  // res.json(UnivTranscationTypeDetail);
	  // }
  // });  
// });

router.post('/RemoveUnivTranscationTypeDetailByID', (req, res) => {
  var UnivTranscationTypeDetailID = req.headers["UnivTranscationTypeDetailID"]; 
console.log(CategoryID);  
  UnivTranscationTypeDetail.DeleteUnivTranscationTypeDetailById(UnivTranscationTypeDetailID, (err,UnivTranscationTypeDetail)=>{
    if(err) {
		throw err;		
	}
     else
	  {	console.log(UnivTranscationTypeDetail);	 
		  res.json(UnivTranscationTypeDetail);
	  }
  });  
});


module.exports = router;
