const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Event = require('../models/Event');
const EventRule = require('../models/EventRule');
const EventPrize = require('../models/EventPrize'); 
const EventOrganizer = require('../models/EventOrganizer'); 

var fs = require('fs');
router.post('/AddEvent', (req, res, next) => {
                debugger;
                var dt=new Date();//current date and time of server
     var text = "";//random text
     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
     for( var i=0; i < 5; i++ )
         text += possible.charAt(Math.floor(Math.random() * possible.length));
         var pos=req.body.Event_Logo.indexOf(",");
     var base64d=req.body.Event_Logo.substring(pos+1);
     var path="./public/images/"+text+dt.getDate()+dt.getMonth()+dt.getMilliseconds()+".png";
     var path1="/images/"+text+dt.getDate()+dt.getMonth()+dt.getMilliseconds()+".png";
                
                fs.writeFile(path,base64d,'base64',function(err){
        if(err) {
        return console.log(err);
        }
        console.log("The file was saved!");
    });

                
                rulesInfo=req.body.Rules;            
                prizeInfo=req.body.Prizes;
                organizerInfo=req.body.Organizers;
                
                
  let newEvent = new Event({
                EventID: req.body.EventID,
                EventTitle: req.body.EventTitle,
                Description: req.body.Description,
                CategoriesMstr: req.body.CategoriesMstr,
				CategoriesSubMstr: req.body.CategoriesSubMstr,
    StartDt: req.body.StartDt,
    EndDt: req.body.EndDt,
    EventRegisterEndDt: req.body.EventRegisterEndDt,
    EventType: req.body.EventType,
    POCRequired: req.body.POCRequired,
    Location: req.body.Location,
                Status: req.body.Status,
                Rules: req.body.Rules,
                Event_Logo: path1,
                Published_Tag: req.body.Published_Tag,
                Prizes: req.body.Prizes,
                Created_On: req.body.Created_On,
                Created_by: req.body.Created_by,
                Modified_On: req.body.Modified_On,
    Modified_by: req.body.Modified_by
                });
  Event.addEvent(newEvent, (err, Event)=> {
                  console.log(Event);
                                if(err){
                                                console.log(err);
      res.json({success: false, msg:'Failed to Event Creation.'});
    } else {
                                if(rulesInfo.length>0)
                                {
                                                for(var n=0;n < rulesInfo.length; n++)
                                                {
                                                    var  eventRuleDetail= new EventRule();
                                                                eventRuleDetail.eventid= Event._id;
                eventRuleDetail.RuleNo=rulesInfo[n].RuleNo;
                eventRuleDetail.RuleDescription=rulesInfo[n].RuleDescription;                                                 
                                                                
                                                                EventRule.AddEventRule(eventRuleDetail, (err, EventRule)=> {
                                                                                console.log(EventRule);
                                                                });
                                                }
                                                
                                }
                                if(prizeInfo.length>0)
                                {
                                                for(var n=0;n < prizeInfo.length; n++)
                                                {
                                                    var  prizeDetail= new EventPrize();
                                                                prizeDetail.eventid= Event._id;
                prizeDetail.PrizeNo=prizeInfo[n].PrizeNo;
                prizeDetail.PrizeDescription=prizeInfo[n].PrizeDescription;                                                         
                                                                
                                                                EventRule.AddEventRule(prizeDetail, (err, PrizeRule)=> {
                                                                                console.log(PrizeRule);
                                                                });
                                                }
                                                
                                }
                    if(organizerInfo.length>0)
                                {
                                                for(var n=0;n < organizerInfo.length; n++)
                                                {
                                                    var  orgDetail= new EventOrganizer();
                                                                orgDetail.eventid= Event._id;
                orgDetail.OrganizerNo=organizerInfo[n].OrganizerNo;
                orgDetail.OrganizerName=organizerInfo[n].OrganizerName;  
orgDetail.OrganizerContact = organizerInfo[n].OrganizerContact;				
                                                                orgDetail.OrganizerEmail=organizerInfo[n].OrganizerEmail;                                                          
                                                                
                                                                EventRule.AddEventRule(orgDetail, (err, orginfo)=> {
                                                                                console.log(orginfo);
                                                                });
                                                }
                                                
                                }
      res.json({success: true, msg:'Event Created.'});
    }
  });
});

router.get('/GetEventByID', (req, res) => {
  var EventID = req.headers["eventid"];  
  Event.getEventById(EventID, (err,Event)=>{
    if(err) {
                                throw err;                            
                }
     else
                  {                            
                                  res.json(Event);
                  }
  });  
});

router.get('/getAllEvent', (req, res) => {  
  Event.getAllEvent((err,Event)=>{
    if(err) {             
                                throw err;
                }
     else
                  {                            
                                  res.json(Event);
                  }
  });  
});

module.exports = router;
