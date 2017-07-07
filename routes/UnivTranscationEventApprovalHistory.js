const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const UnivTranscationEventApprovalHistory = require('../models/UnivTranscationEventApprovalHistory');
const UnivTranscationEventApprovalDetail = require('../models/UnivTranscationEventApprovalDetail');
const EventStudent = require('../models/EventStudent');

router.post('/AddUnivTranscationEventApprovalHistory', (req, res, next) => {
	
	
	TransApprovalMappingInfo = req.body.TransEventApprovalMapping;
	TransApprovalMappingHistoryInfo = req.body.universityApprovalHistory;
	if(TransApprovalMappingHistoryInfo.length>0)
        {
            for(var i=0;i < TransApprovalMappingHistoryInfo.length; i++)
                {
					var newUnivTranscationEventApprovalHistory = new UnivTranscationEventApprovalHistory();
	newUnivTranscationEventApprovalHistory.Tran_Approval_History_ID=TransApprovalMappingHistoryInfo[i].TranApprovalHistoryID;
  	newUnivTranscationEventApprovalHistory.Tran_Approval_ID= TransApprovalMappingHistoryInfo[i].TransApprovalID;
	newUnivTranscationEventApprovalHistory.Approved_By=TransApprovalMappingHistoryInfo[i].ApprovedBy;
	newUnivTranscationEventApprovalHistory.Approved_On=TransApprovalMappingHistoryInfo[i].ApprovedOn;
	newUnivTranscationEventApprovalHistory.Mask_ID=TransApprovalMappingHistoryInfo[i].MaskID;
  	newUnivTranscationEventApprovalHistory.Status= TransApprovalMappingHistoryInfo[i].Status;  
	newUnivTranscationEventApprovalHistory.Comments=TransApprovalMappingHistoryInfo[i].Comments;  	
	UnivTranscationEventApprovalHistory.AddUnivTranscationEventApprovalHistory(newUnivTranscationEventApprovalHistory, (err, UnivTranscationEventApprovalHistory)=> {
  
     });
				}
		}
					
  
	if(TransApprovalMappingInfo !='')
        {
									//console.log(UnivTranscationEventApprovalDetail);
			if(TransApprovalMappingInfo.length>0)
                    {
                     for(var n=0;n < TransApprovalMappingInfo.length; n++)
                        {
                             UnivTranscationEventApprovalDetail.DeleteUnivTranscationEventApprovalDetailByApprovalId(TransApprovalMappingInfo[n].TransApprovalID, (err, TransApprovalMapping1)=> {
                                                                                
                                });
																
		
        var  univTranscationEventApprovalDetail= new UnivTranscationEventApprovalDetail();
        univTranscationEventApprovalDetail.Tran_Approval_ID= TransApprovalMappingInfo[n].TransApprovalID;
		univTranscationEventApprovalDetail.Tran_Approval_IDNumber= TransApprovalMappingInfo[n].TranApprovalIDNumber;
		univTranscationEventApprovalDetail.Univ_ID=TransApprovalMappingInfo[n].UniversityID;
        univTranscationEventApprovalDetail.Student_ID=TransApprovalMappingInfo[n].StudentID;     
		univTranscationEventApprovalDetail.Tran_Map_ID= TransApprovalMappingInfo[n].TransMapID;
		univTranscationEventApprovalDetail.Prev_Approver_RID=TransApprovalMappingInfo[n].PrevApproverRoleID;
        univTranscationEventApprovalDetail.Next_Approver_RID=TransApprovalMappingInfo[n].NextApproverRoleID; 
		univTranscationEventApprovalDetail.Status=TransApprovalMappingInfo[n].Status; 
		univTranscationEventApprovalDetail.TranscationStatus=TransApprovalMappingInfo[n].TranscationStatus; 
		univTranscationEventApprovalDetail.Mask_ID=TransApprovalMappingInfo[n].MaskID; 
		univTranscationEventApprovalDetail.EventID=TransApprovalMappingInfo[n].EventID;
        univTranscationEventApprovalDetail.Tran_Dt=""; 								  
        UnivTranscationEventApprovalDetail.AddUnivTranscationEventApprovalDetail(univTranscationEventApprovalDetail, (err, univTranscationApproval)=> {
                                             
                                            }); 
											
		if(TransApprovalMappingInfo[n].Status == 1)
				{
			EventStudent.setIsApproved(TransApprovalMappingInfo[n].StudentID, TransApprovalMappingInfo[n].EventID, (err, univTranscationApproval)=> {
                                             
                                            }); 
				}
                        }
                                                
					}
		 
        }
      res.json({success: true, msg:'UnivTranscationEventApprovalHistory Created.'});
    
});


router.post('/AddUnivTranscationEventRejectionHistory', (req, res, next) => {
	
	
	TransApprovalMappingInfo = req.body.TransEventApprovalMapping;
	TransApprovalMappingHistoryInfo = req.body.universityApprovalHistory;
	if(TransApprovalMappingHistoryInfo.length>0)
        {
            for(var i=0;i < TransApprovalMappingHistoryInfo.length; i++)
                {
					var newUnivTranscationEventApprovalHistory = new UnivTranscationEventApprovalHistory();
	newUnivTranscationEventApprovalHistory.Tran_Approval_History_ID=TransApprovalMappingHistoryInfo[i].TranApprovalHistoryID;
  	newUnivTranscationEventApprovalHistory.Tran_Approval_ID= TransApprovalMappingHistoryInfo[i].TransApprovalID;
	newUnivTranscationEventApprovalHistory.Approved_By=TransApprovalMappingHistoryInfo[i].ApprovedBy;
	newUnivTranscationEventApprovalHistory.Approved_On=TransApprovalMappingHistoryInfo[i].ApprovedOn;
	newUnivTranscationEventApprovalHistory.Mask_ID=TransApprovalMappingHistoryInfo[i].MaskID;
  	newUnivTranscationEventApprovalHistory.Status= TransApprovalMappingHistoryInfo[i].Status;  
	
	newUnivTranscationEventApprovalHistory.Comments=TransApprovalMappingHistoryInfo[i].Comments;  	
	UnivTranscationEventApprovalHistory.AddUnivTranscationEventApprovalHistory(newUnivTranscationEventApprovalHistory, (err, UnivTranscationEventApprovalHistory)=> {
  
     });
				}
		}
					
  
	if(TransApprovalMappingInfo !='')
        {
									//console.log(UnivTranscationEventApprovalDetail);
			if(TransApprovalMappingInfo.length>0)
                    {
                     for(var n=0;n < TransApprovalMappingInfo.length; n++)
                        {
                             UnivTranscationEventApprovalDetail.UpdateUnivEventTranscationStatusByTranApprovalID(TransApprovalMappingInfo[n], (err, TransApprovalMapping1)=> {
                                                                                
                                });
																
		
        // var  univTranscationEventApprovalDetail= new UnivTranscationEventApprovalDetail();
        // univTranscationEventApprovalDetail.Tran_Approval_ID= TransApprovalMappingInfo[n].TransApprovalID;
		// univTranscationEventApprovalDetail.Tran_Approval_IDNumber= TransApprovalMappingInfo[n].TranApprovalIDNumber;
		// univTranscationEventApprovalDetail.Univ_ID=TransApprovalMappingInfo[n].UniversityID;
        // univTranscationEventApprovalDetail.Student_ID=TransApprovalMappingInfo[n].StudentID;     
		// univTranscationEventApprovalDetail.Tran_Map_ID= TransApprovalMappingInfo[n].TransMapID;
		// univTranscationEventApprovalDetail.Prev_Approver_RID=TransApprovalMappingInfo[n].PrevApproverRoleID;
        // univTranscationEventApprovalDetail.Next_Approver_RID=TransApprovalMappingInfo[n].NextApproverRoleID; 
		// univTranscationEventApprovalDetail.Status=TransApprovalMappingInfo[n].Status; 
		// univTranscationEventApprovalDetail.Mask_ID=TransApprovalMappingInfo[n].MaskID; 
		// univTranscationEventApprovalDetail.EventID=TransApprovalMappingInfo[n].EventID;
        // univTranscationEventApprovalDetail.Tran_Dt=""; 								  
        // UnivTranscationEventApprovalDetail.AddUnivTranscationEventApprovalDetail(univTranscationEventApprovalDetail, (err, univTranscationApproval)=> {
                                             
                                            // }); 
											
		// if(TransApprovalMappingInfo[n].Status == 1)
				// {
			// EventStudent.setIsApproved(TransApprovalMappingInfo[n].StudentID, TransApprovalMappingInfo[n].EventID, (err, univTranscationApproval)=> {
                                             
                                            // }); 
				// }
                        }
                                                
					}
		 
        }
      res.json({success: true, msg:'UnivTranscationEventApprovalHistory Created.'});
    
});

// router.post('/UpdateUnivTranscationTypeDetailByTranMapID', (req, res, next) => {
	
	 
	
  // let newUnivTranscationEventApprovalDetail = new UnivTranscationEventApprovalDetail({
  	// Tran_Approval_ID: req.body.TransApprovalID,
	// Univ_ID:req.body.UniversityID,
	// Student_ID:req.body.Student_ID,
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
  // UnivTranscationEventApprovalDetail.UpdateUnivTranscationTypeDetailByTranMapID(newUnivTranscationEventApprovalDetail, (err, UnivTranscationEventApprovalDetailx)=> {
	  
  		// if(err){
      // res.json({success: false, msg:'Failed to UnivTranscationEventApprovalDetail updated.'});
    // } else {
      // res.json({success: true, msg:'UnivTranscationEventApprovalDetail updated.'});
    // }
  // });
// });

// router.get('/getUnivTranscationEventApprovalDetailByID', (req, res) => {
  // var UnivTranscationMapDetailID = req.headers["UnivTranscationMapDetailID"];  
  // UnivTranscationMapDetail.getUnivTranscationMapDetailIDMstrById(UnivTranscationMapDetailID, (err,UnivTranscationMapDetail)=>{
    // if(err) {
		// throw err;		
	// }
     // else
	  // {		 
		  // res.json(UnivTranscationMapDetail);
	  // }
  // });  
// });



router.get('/getAllUnivTranscationEventApprovalHistory', (req, res) => {

console.log("Test");	
  UnivTranscationEventApprovalHistory.getAllUnivTranscationEventApprovalHistory((err,UnivTranscationEventApprovalHistory)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(UnivTranscationEventApprovalHistory); 
		  res.json(UnivTranscationEventApprovalHistory);
	  }
  });  
});

router.get('/getMaxTransEventApprovalHistoryID', (req, res) => {

console.log("Test Max");	
  UnivTranscationEventApprovalHistory.getMaxTransEventApprovalHistoryID((err,UnivTranscationEventApprovalHistory)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(UnivTranscationEventApprovalHistory); 
		  res.json(UnivTranscationEventApprovalHistory);
	  }
  });  
});

// router.post('/RemoveUnivTranscationMapDetailByID', (req, res) => {
  // var UnivTranscationMapDetailID = req.headers["UnivTranscationMapDetailID"]; 
// console.log(CategoryID);  
  // UnivTranscationMapDetail.DeleteUnivTranscationMapDetailById(UnivTranscationMapDetailID, (err,UnivTranscationMapDetail)=>{
    // if(err) {
		// throw err;		
	// }
     // else
	  // {	console.log(UnivTranscationMapDetail);	 
		  // res.json(UnivTranscationMapDetail);
	  // }
  // });  
// });


module.exports = router;
