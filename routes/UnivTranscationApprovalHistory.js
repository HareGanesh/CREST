const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const UnivTranscationApprovalHistory = require('../models/UnivTranscationApprovalHistory');
const UnivTranscationApprovalDetail = require('../models/UnivTranscationApprovalDetail');
const Student = require('../models/student');

router.post('/AddUnivTranscationApprovalHistory', (req, res, next) => {
	
	
	TransApprovalMappingInfo = req.body.TransApprovalMapping;
  let newUnivTranscationApprovalHistory = new UnivTranscationApprovalHistory({
	  Tran_Approval_History_ID:req.body.universityApprovalHistory.TranApprovalHistoryID,
  	Tran_Approval_ID: req.body.universityApprovalHistory.TransApprovalID,
	Approved_By:req.body.universityApprovalHistory.ApprovedBy,
	Approved_On:req.body.universityApprovalHistory.ApprovedOn,  	
	Mask_ID:req.body.universityApprovalHistory.MaskID,
  	Status: req.body.universityApprovalHistory.Status,  
	Comments:req.body.universityApprovalHistory.Comments
  	});
  UnivTranscationApprovalHistory.AddUnivTranscationApprovalHistory(newUnivTranscationApprovalHistory, (err, UnivTranscationApprovalHistory)=> {
	  
  		if(err){
      res.json({success: false, msg:'Failed to UnivTranscationapprovalHistory Creation.'});
    } else {
		if(TransApprovalMappingInfo !='')
                                {
		UnivTranscationApprovalDetail.DeleteUnivTranscationApprovalDetailByApprovalId(TransApprovalMappingInfo.TransApprovalID, (err, TransApprovalMapping1)=> {
                                                                                
                                                                });
																
		
        var  univTranscationApprovalDetail= new UnivTranscationApprovalDetail();
        univTranscationApprovalDetail.Tran_Approval_ID= TransApprovalMappingInfo.TransApprovalID;
		univTranscationApprovalDetail.Tran_Approval_IDNumber= TransApprovalMappingInfo.TranApprovalIDNumber;
		univTranscationApprovalDetail.Univ_ID=TransApprovalMappingInfo.UniversityID;
        univTranscationApprovalDetail.Student_ID=TransApprovalMappingInfo.StudentID;     
		univTranscationApprovalDetail.Tran_Map_ID= TransApprovalMappingInfo.TransMapID;
		univTranscationApprovalDetail.Prev_Approver_RID=TransApprovalMappingInfo.PrevApproverRoleID;
        univTranscationApprovalDetail.Next_Approver_RID=TransApprovalMappingInfo.NextApproverRoleID; 
		univTranscationApprovalDetail.Status=TransApprovalMappingInfo.Status; 
		univTranscationApprovalDetail.TransactionStatus = TransApprovalMappingInfo.TransactionStatus;
		
	
		univTranscationApprovalDetail.Mask_ID=TransApprovalMappingInfo.MaskID; 
        univTranscationApprovalDetail.Tran_Dt=""; 								  
        UnivTranscationApprovalDetail.AddUnivTranscationApprovalDetail(univTranscationApprovalDetail, (err, univTranscationApproval)=> {
                                             
                                            }); 
											
		if(TransApprovalMappingInfo.Status == 1)
		{
			Student.setIsApproved(TransApprovalMappingInfo.StudentID, (err, univTranscationApproval)=> {
                                             
                                            }); 
		}
                                }
      res.json({success: true, msg:'UnivTranscationapprovalHistory Created.'});
    }
  });
});

router.post('/AddUnivAllTranscationApprovalHistory', (req, res, next) => {
	
	
	TransApprovalMappingInfo = req.body.TransApprovalMapping;
	TransApprovalMappingHistoryInfo = req.body.universityApprovalHistory;
	if(TransApprovalMappingHistoryInfo.length>0)
        {
            for(var i=0;i < TransApprovalMappingHistoryInfo.length; i++)
                {
					var newUnivTranscationApprovalHistory = new UnivTranscationApprovalHistory();
	newUnivTranscationApprovalHistory.Tran_Approval_History_ID=TransApprovalMappingHistoryInfo[i].TranApprovalHistoryID;
  	newUnivTranscationApprovalHistory.Tran_Approval_ID= TransApprovalMappingHistoryInfo[i].TransApprovalID;
	newUnivTranscationApprovalHistory.Approved_By=TransApprovalMappingHistoryInfo[i].ApprovedBy;
	newUnivTranscationApprovalHistory.Approved_On=TransApprovalMappingHistoryInfo[i].ApprovedOn;
	newUnivTranscationApprovalHistory.Mask_ID=TransApprovalMappingHistoryInfo[i].MaskID;
  	newUnivTranscationApprovalHistory.Status= TransApprovalMappingHistoryInfo[i].Status;  
	newUnivTranscationApprovalHistory.Comments=TransApprovalMappingHistoryInfo[i].Comments;  	
	UnivTranscationApprovalHistory.AddUnivTranscationApprovalHistory(newUnivTranscationApprovalHistory, (err, UnivTranscationApprovalHistory)=> {
  
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
                             UnivTranscationApprovalDetail.DeleteUnivTranscationApprovalDetailByApprovalId(TransApprovalMappingInfo[n].TransApprovalID, (err, TransApprovalMapping1)=> {
                                                                                
                                });
																
		
        var  univTranscationApprovalDetail= new UnivTranscationApprovalDetail();
        univTranscationApprovalDetail.Tran_Approval_ID= TransApprovalMappingInfo[n].TransApprovalID;
		univTranscationApprovalDetail.Tran_Approval_IDNumber= TransApprovalMappingInfo[n].TranApprovalIDNumber;
		univTranscationApprovalDetail.Univ_ID=TransApprovalMappingInfo[n].UniversityID;
        univTranscationApprovalDetail.Student_ID=TransApprovalMappingInfo[n].StudentID;     
		univTranscationApprovalDetail.Tran_Map_ID= TransApprovalMappingInfo[n].TransMapID;
		univTranscationApprovalDetail.Prev_Approver_RID=TransApprovalMappingInfo[n].PrevApproverRoleID;
        univTranscationApprovalDetail.Next_Approver_RID=TransApprovalMappingInfo[n].NextApproverRoleID; 
		univTranscationApprovalDetail.Status=TransApprovalMappingInfo[n].Status; 
		univTranscationApprovalDetail.Mask_ID=TransApprovalMappingInfo[n].MaskID; 
		//univTranscationEventApprovalDetail.EventID=TransApprovalMappingInfo[n].EventID;
        univTranscationApprovalDetail.Tran_Dt=""; 						
        univTranscationApprovalDetail.TransactionStatus = TransApprovalMappingInfo[n].TransactionStatus;		
        UnivTranscationApprovalDetail.AddUnivTranscationApprovalDetail(univTranscationApprovalDetail, (err, univTranscationApproval)=> {
                                             
                                            }); 
											
		if(TransApprovalMappingInfo[n].Status == 1)
		{
			Student.setIsApproved(TransApprovalMappingInfo[n].StudentID, (err, univTranscationApproval)=> {
                                             
                                            }); 
		}
                        }
                                                
					}
		 
        }
      res.json({success: true, msg:'UnivTranscationEventApprovalHistory Created.'});
    
});

// Rejection part

router.post('/AddUnivTranscationRejectionHistory', (req, res, next) => {
	
	
	TransApprovalMappingInfo = req.body.TransApprovalMapping;
  let newUnivTranscationApprovalHistory = new UnivTranscationApprovalHistory({
	  Tran_Approval_History_ID:req.body.universityApprovalHistory.TranApprovalHistoryID,
  	Tran_Approval_ID: req.body.universityApprovalHistory.TransApprovalID,
	Approved_By:req.body.universityApprovalHistory.ApprovedBy,
	Approved_On:req.body.universityApprovalHistory.ApprovedOn,  	
	Mask_ID:req.body.universityApprovalHistory.MaskID,
  	Status: req.body.universityApprovalHistory.Status,  
	Comments:req.body.universityApprovalHistory.Comments
  	});
  UnivTranscationApprovalHistory.AddUnivTranscationApprovalHistory(newUnivTranscationApprovalHistory, (err, UnivTranscationApprovalHistory)=> {
	  
  		if(err){
      res.json({success: false, msg:'Failed to UnivTranscationapprovalHistory Creation.'});
    } else {
		if(TransApprovalMappingInfo !='')
                                {
		UnivTranscationApprovalDetail.UpdateUnivTranscationStatusByTranApprovalID(TransApprovalMappingInfo, (err, TransApprovalMapping1)=> {
                                                                                
                                                                });
																
		
        // var  univTranscationApprovalDetail= new UnivTranscationApprovalDetail();
        // univTranscationApprovalDetail.Tran_Approval_ID= TransApprovalMappingInfo.TransApprovalID;
		// univTranscationApprovalDetail.Tran_Approval_IDNumber= TransApprovalMappingInfo.TranApprovalIDNumber;
		// univTranscationApprovalDetail.Univ_ID=TransApprovalMappingInfo.UniversityID;
        // univTranscationApprovalDetail.Student_ID=TransApprovalMappingInfo.StudentID;     
		// univTranscationApprovalDetail.Tran_Map_ID= TransApprovalMappingInfo.TransMapID;
		// univTranscationApprovalDetail.Prev_Approver_RID=TransApprovalMappingInfo.PrevApproverRoleID;
        // univTranscationApprovalDetail.Next_Approver_RID=TransApprovalMappingInfo.NextApproverRoleID; 
		// univTranscationApprovalDetail.Status=TransApprovalMappingInfo.Status; 
		// univTranscationApprovalDetail.TransactionStatus = TransApprovalMappingInfo.TransactionStatus;
		
	
		// univTranscationApprovalDetail.Mask_ID=TransApprovalMappingInfo.MaskID; 
        // univTranscationApprovalDetail.Tran_Dt=""; 								  
        // UnivTranscationApprovalDetail.AddUnivTranscationApprovalDetail(univTranscationApprovalDetail, (err, univTranscationApproval)=> {
                                             
                                            // }); 
											
		// if(TransApprovalMappingInfo.Status == 1)
		// {
			// Student.setIsApproved(TransApprovalMappingInfo.StudentID, (err, univTranscationApproval)=> {
                                             
                                            // }); 
		// }
                                }
      res.json({success: true, msg:'UnivTranscationapprovalHistory Updated.'});
    }
  });
});

router.post('/AddUnivAllTranscationRejectionHistory', (req, res, next) => {
	
	
	TransApprovalMappingInfo = req.body.TransApprovalMapping;
	TransApprovalMappingHistoryInfo = req.body.universityApprovalHistory;
	if(TransApprovalMappingHistoryInfo.length>0)
        {
            for(var i=0;i < TransApprovalMappingHistoryInfo.length; i++)
                {
					var newUnivTranscationApprovalHistory = new UnivTranscationApprovalHistory();
	newUnivTranscationApprovalHistory.Tran_Approval_History_ID=TransApprovalMappingHistoryInfo[i].TranApprovalHistoryID;
  	newUnivTranscationApprovalHistory.Tran_Approval_ID= TransApprovalMappingHistoryInfo[i].TransApprovalID;
	newUnivTranscationApprovalHistory.Approved_By=TransApprovalMappingHistoryInfo[i].ApprovedBy;
	newUnivTranscationApprovalHistory.Approved_On=TransApprovalMappingHistoryInfo[i].ApprovedOn;
	newUnivTranscationApprovalHistory.Mask_ID=TransApprovalMappingHistoryInfo[i].MaskID;
  	newUnivTranscationApprovalHistory.Status= TransApprovalMappingHistoryInfo[i].Status;  
	newUnivTranscationApprovalHistory.Comments=TransApprovalMappingHistoryInfo[i].Comments;  	
	UnivTranscationApprovalHistory.AddUnivTranscationApprovalHistory(newUnivTranscationApprovalHistory, (err, UnivTranscationApprovalHistory)=> {
  
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
                             UnivTranscationApprovalDetail.UpdateUnivTranscationStatusByTranApprovalID(TransApprovalMappingInfo[n], (err, TransApprovalMapping1)=> {
                                                                                
                                });
																
		
        // var  univTranscationApprovalDetail= new UnivTranscationApprovalDetail();
        // univTranscationApprovalDetail.Tran_Approval_ID= TransApprovalMappingInfo[n].TransApprovalID;
		// univTranscationApprovalDetail.Tran_Approval_IDNumber= TransApprovalMappingInfo[n].TranApprovalIDNumber;
		// univTranscationApprovalDetail.Univ_ID=TransApprovalMappingInfo[n].UniversityID;
        // univTranscationApprovalDetail.Student_ID=TransApprovalMappingInfo[n].StudentID;     
		// univTranscationApprovalDetail.Tran_Map_ID= TransApprovalMappingInfo[n].TransMapID;
		// univTranscationApprovalDetail.Prev_Approver_RID=TransApprovalMappingInfo[n].PrevApproverRoleID;
        // univTranscationApprovalDetail.Next_Approver_RID=TransApprovalMappingInfo[n].NextApproverRoleID; 
		// univTranscationApprovalDetail.Status=TransApprovalMappingInfo[n].Status; 
		// univTranscationApprovalDetail.Mask_ID=TransApprovalMappingInfo[n].MaskID; 
		// //univTranscationEventApprovalDetail.EventID=TransApprovalMappingInfo[n].EventID;
        // univTranscationApprovalDetail.Tran_Dt=""; 						
        // univTranscationApprovalDetail.TransactionStatus = TransApprovalMappingInfo[n].TransactionStatus;		
        // UnivTranscationApprovalDetail.AddUnivTranscationApprovalDetail(univTranscationApprovalDetail, (err, univTranscationApproval)=> {
                                             
                                            // }); 
											
		// if(TransApprovalMappingInfo[n].Status == 1)
		// {
			// Student.setIsApproved(TransApprovalMappingInfo[n].StudentID, (err, univTranscationApproval)=> {
                                             
                                            // }); 
		// }
                        }
                                                
					}
		 
        }
      res.json({success: true, msg:'UnivTranscationEventApprovalHistory updated.'});
    
});


// End here


// router.post('/UpdateUnivTranscationTypeDetailByTranMapID', (req, res, next) => {
	
	 
	
  // let newUnivTranscationApprovalDetail = new UnivTranscationApprovalDetail({
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
  // UnivTranscationApprovalDetail.UpdateUnivTranscationTypeDetailByTranMapID(newUnivTranscationApprovalDetail, (err, UnivTranscationApprovalDetailx)=> {
	  
  		// if(err){
      // res.json({success: false, msg:'Failed to UnivTranscationapprovalDetail updated.'});
    // } else {
      // res.json({success: true, msg:'UnivTranscationApprovalDetail updated.'});
    // }
  // });
// });

// router.get('/getUnivTranscationApprovalDetailByID', (req, res) => {
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



router.get('/getAllUnivTranscationApprovalHistory', (req, res) => {

console.log("Test");	
  UnivTranscationApprovalHistory.getAllUnivTranscationApprovalHistory((err,UnivTranscationApprovalHistory)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(UnivTranscationApprovalHistory); 
		  res.json(UnivTranscationApprovalHistory);
	  }
  });  
});

router.get('/getMaxTransApprovalHistoryID', (req, res) => {

console.log("Test Max");	
  UnivTranscationApprovalHistory.getMaxTransApprovalHistoryID((err,UnivTranscationApprovalHistory)=>{
    if(err) {	
		throw err;
	}
     else
	  {		console.log(UnivTranscationApprovalHistory); 
		  res.json(UnivTranscationApprovalHistory);
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
