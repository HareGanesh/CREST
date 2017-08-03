const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const OrgnTranscationEventApprovalHistory = require('../models/OrgnTranscationEventApprovalHistory');
const OrgnTranscationEventApprovalDetail = require('../models/OrgnTranscationEventApprovalDetail');
const EventStudent = require('../models/EventStudent');

router.post('/AddOrgnTranscationEventApprovalHistory', (req, res, next) => {
	
	
	TransApprovalMappingInfo = req.body.TransEventApprovalMapping;
	TransApprovalMappingHistoryInfo = req.body.OrganizationApprovalHistory;
	if(TransApprovalMappingHistoryInfo.length>0)
        {
            for(var i=0;i < TransApprovalMappingHistoryInfo.length; i++)
                {
					var newOrgnTranscationEventApprovalHistory = new OrgnTranscationEventApprovalHistory();
	newOrgnTranscationEventApprovalHistory.Tran_Approval_History_ID=TransApprovalMappingHistoryInfo[i].TranApprovalHistoryID;
  	newOrgnTranscationEventApprovalHistory.Tran_Approval_ID= TransApprovalMappingHistoryInfo[i].TransApprovalID;
	newOrgnTranscationEventApprovalHistory.Approved_By=TransApprovalMappingHistoryInfo[i].ApprovedBy;
	newOrgnTranscationEventApprovalHistory.Approved_On=TransApprovalMappingHistoryInfo[i].ApprovedOn;
	newOrgnTranscationEventApprovalHistory.Mask_ID=TransApprovalMappingHistoryInfo[i].MaskID;
  	newOrgnTranscationEventApprovalHistory.Status= TransApprovalMappingHistoryInfo[i].Status;  
	newOrgnTranscationEventApprovalHistory.Comments=TransApprovalMappingHistoryInfo[i].Comments;  	
	OrgnTranscationEventApprovalHistory.AddOrgnTranscationEventApprovalHistory(newOrgnTranscationEventApprovalHistory, (err, OrgnTranscationEventApprovalHistory)=> {
  
     });
				}
		}
					
  
	if(TransApprovalMappingInfo !='')
        {
									//console.log(OrgnTranscationEventApprovalDetail);
			if(TransApprovalMappingInfo.length>0)
                    {
                     for(var n=0;n < TransApprovalMappingInfo.length; n++)
                        {
                             OrgnTranscationEventApprovalDetail.DeleteOrgnTranscationEventApprovalDetailByApprovalId(TransApprovalMappingInfo[n].TransApprovalID, (err, TransApprovalMapping1)=> {
                                                                                
                                });
																
		
        var  orgnTranscationEventApprovalDetail= new OrgnTranscationEventApprovalDetail();
        orgnTranscationEventApprovalDetail.Tran_Approval_ID= TransApprovalMappingInfo[n].TransApprovalID;
		orgnTranscationEventApprovalDetail.Tran_Approval_IDNumber= TransApprovalMappingInfo[n].TranApprovalIDNumber;
		orgnTranscationEventApprovalDetail.Orgn_ID=TransApprovalMappingInfo[n].OrganizationID;
        orgnTranscationEventApprovalDetail.Employee_ID=TransApprovalMappingInfo[n].EmployeeID;     
		orgnTranscationEventApprovalDetail.Tran_Map_ID= TransApprovalMappingInfo[n].TransMapID;
		orgnTranscationEventApprovalDetail.Prev_Approver_RID=TransApprovalMappingInfo[n].PrevApproverRoleID;
        orgnTranscationEventApprovalDetail.Next_Approver_RID=TransApprovalMappingInfo[n].NextApproverRoleID; 
		orgnTranscationEventApprovalDetail.Status=TransApprovalMappingInfo[n].Status; 
		orgnTranscationEventApprovalDetail.TranscationStatus=TransApprovalMappingInfo[n].TranscationStatus; 
		orgnTranscationEventApprovalDetail.Mask_ID=TransApprovalMappingInfo[n].MaskID; 
		orgnTranscationEventApprovalDetail.EventID=TransApprovalMappingInfo[n].EventID;
        orgnTranscationEventApprovalDetail.Tran_Dt=""; 								  
        OrgnTranscationEventApprovalDetail.AddOrgnTranscationEventApprovalDetail(orgnTranscationEventApprovalDetail, (err, orgnTranscationApproval)=> {
                                             
                                            }); 
											
		if(TransApprovalMappingInfo[n].Status == 1)
				{
			EventEmployee.setIsApproved(TransApprovalMappingInfo[n].EmployeeID, TransApprovalMappingInfo[n].EventID, (err, orgnTranscationApproval)=> {
                                             
                                            }); 
				}
                        }
                                                
					}
		 
        }
      res.json({success: true, msg:'OrgnTranscationEventApprovalHistory Created.'});
    
});


router.post('/AddOrgnTranscationEventRejectionHistory', (req, res, next) => {
	
	
	TransApprovalMappingInfo = req.body.TransEventApprovalMapping;
	TransApprovalMappingHistoryInfo = req.body.organizationApprovalHistory;
	if(TransApprovalMappingHistoryInfo.length>0)
        {
            for(var i=0;i < TransApprovalMappingHistoryInfo.length; i++)
                {
					var newOrgnTranscationEventApprovalHistory = new OrgnTranscationEventApprovalHistory();
	newOrgnTranscationEventApprovalHistory.Tran_Approval_History_ID=TransApprovalMappingHistoryInfo[i].TranApprovalHistoryID;
  	newOrgnTranscationEventApprovalHistory.Tran_Approval_ID= TransApprovalMappingHistoryInfo[i].TransApprovalID;
	newOrgnTranscationEventApprovalHistory.Approved_By=TransApprovalMappingHistoryInfo[i].ApprovedBy;
	newOrgnTranscationEventApprovalHistory.Approved_On=TransApprovalMappingHistoryInfo[i].ApprovedOn;
	newOrgnTranscationEventApprovalHistory.Mask_ID=TransApprovalMappingHistoryInfo[i].MaskID;
  	newOrgnTranscationEventApprovalHistory.Status= TransApprovalMappingHistoryInfo[i].Status;  
	
	newOrgnTranscationEventApprovalHistory.Comments=TransApprovalMappingHistoryInfo[i].Comments;  	
	OrgnTranscationEventApprovalHistory.AddOrgnTranscationEventApprovalHistory(newOrgnTranscationEventApprovalHistory, (err, OrgnTranscationEventApprovalHistory)=> {
  
     });
				}
		}
					
  
	if(TransApprovalMappingInfo !='')
        {
									//console.log(OrgnTranscationEventApprovalDetail);
			if(TransApprovalMappingInfo.length>0)
                    {
                     for(var n=0;n < TransApprovalMappingInfo.length; n++)
                        {
                             OrgnTranscationEventApprovalDetail.UpdateOrgnEventTranscationStatusByTranApprovalID(TransApprovalMappingInfo[n], (err, TransApprovalMapping1)=> {
                                                                                
                                });
																
		
        // var  orgnTranscationEventApprovalDetail= new OrgnTranscationEventApprovalDetail();
        // orgnTranscationEventApprovalDetail.Tran_Approval_ID= TransApprovalMappingInfo[n].TransApprovalID;
		// orgnTranscationEventApprovalDetail.Tran_Approval_IDNumber= TransApprovalMappingInfo[n].TranApprovalIDNumber;
		// orgnTranscationEventApprovalDetail.Orgn_ID=TransApprovalMappingInfo[n].OrgnersityID;
        // orgnTranscationEventApprovalDetail.Employee_ID=TransApprovalMappingInfo[n].EmployeeID;     
		// orgnTranscationEventApprovalDetail.Tran_Map_ID= TransApprovalMappingInfo[n].TransMapID;
		// orgnTranscationEventApprovalDetail.Prev_Approver_RID=TransApprovalMappingInfo[n].PrevApproverRoleID;
        // orgnTranscationEventApprovalDetail.Next_Approver_RID=TransApprovalMappingInfo[n].NextApproverRoleID; 
		// orgnTranscationEventApprovalDetail.Status=TransApprovalMappingInfo[n].Status; 
		// orgnTranscationEventApprovalDetail.Mask_ID=TransApprovalMappingInfo[n].MaskID; 
		// orgnTranscationEventApprovalDetail.EventID=TransApprovalMappingInfo[n].EventID;
        // orgnTranscationEventApprovalDetail.Tran_Dt=""; 								  
        // OrgnTranscationEventApprovalDetail.AddOrgnTranscationEventApprovalDetail(orgnTranscationEventApprovalDetail, (err, orgnTranscationApproval)=> {
                                             
                                            // }); 
											
		// if(TransApprovalMappingInfo[n].Status == 1)
				// {
			// EventEmployee.setIsApproved(TransApprovalMappingInfo[n].EmployeeID, TransApprovalMappingInfo[n].EventID, (err, orgnTranscationApproval)=> {
                                             
                                            // }); 
				// }
                        }
                                                
					}
		 
        }
      res.json({success: true, msg:'OrgnTranscationEventApprovalHistory Created.'});
    
});

// router.post('/UpdateOrgnTranscationTypeDetailByTranMapID', (req, res, next) => {
	
	 
	
  // let newOrgnTranscationEventApprovalDetail = new OrgnTranscationEventApprovalDetail({
  	// Tran_Approval_ID: req.body.TransApprovalID,
	// Orgn_ID:req.body.OrgnersityID,
	// Employee_ID:req.body.Student_ID,
  	// Tran_Map_ID: req.body.TransMapID,
	// Prev_Approver_RID:req.body.PrevApproverRoleID,	
	// Next_Approver_RID:req.body.NextApproverRoleID,
	// Mask_ID:req.body.MaskID,
  	// Status: req.body.Status,  
	// Tran_Dt:req.body.TranDt,
	// Created_On: req.body.Created_On,
	// Created_by: req.body.Created_by,
	// Modified_On: req.body.Modified_On,
    // Modified_by: req.body.Modified_by
  	// });
  // OrgnTranscationEventApprovalDetail.UpdateOrgnTranscationTypeDetailByTranMapID(newOrgnTranscationEventApprovalDetail, (err, OrgnTranscationEventApprovalDetailx)=> {
	  
  		// if(err){
      // res.json({success: false, msg:'Failed to OrgnTranscationEventApprovalDetail updated.'});
    // } else {
      // res.json({success: true, msg:'OrgnTranscationEventApprovalDetail updated.'});
    // }
  // });
// });

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



router.get('/getAllOrgnTranscationEventApprovalHistory', (req, res) => {

console.log("Test");	
  OrgnTranscationEventApprovalHistory.getAllOrgnTranscationEventApprovalHistory((err,OrgnTranscationEventApprovalHistory)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(OrgnTranscationEventApprovalHistory); 
		  res.json(OrgnTranscationEventApprovalHistory);
	  }
  });  
});

router.get('/getMaxTransEventApprovalHistoryID', (req, res) => {

console.log("Test Max");	
  OrgnTranscationEventApprovalHistory.getMaxTransEventApprovalHistoryID((err,OrgnTranscationEventApprovalHistory)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(OrgnTranscationEventApprovalHistory); 
		  res.json(OrgnTranscationEventApprovalHistory);
	  }
  });  
});

// router.post('/RemoveOrgnTranscationMapDetailByID', (req, res) => {
  // var OrgnTranscationMapDetailID = req.headers["OrgnTranscationMapDetailID"]; 
// console.log(CategoryID);  
  // OrgnTranscationMapDetail.DeleteOrgnTranscationMapDetailById(OrgnTranscationMapDetailID, (err,OrgnTranscationMapDetail)=>{
    // if(err) {
		// throw err;		
	// }
     // else
	  // {	console.log(OrgnTranscationMapDetail);	 
		  // res.json(OrgnTranscationMapDetail);
	  // }
  // });  
// });


module.exports = router;
