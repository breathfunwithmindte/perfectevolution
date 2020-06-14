const express = require('express');
const girlRouter = express.Router();
const Girls = require('../models/Girls');
const User = require('../models/User');
const CommentGirl = require('../models/CommentGirl');
const Notification = require('../models/Notification');



//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~Api for storage~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//


                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~//||   "Αγάπα με όταν δεν το αξίζω, σκουπίδι"   ||//~~~~~~~~~~~~~~//
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//


//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~New sexy Girl~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

girlRouter.post('/NeW', (req,res) => {
    let Girl = req.body.Girl;
    let auth = req.body.authId;
    let title = req.body.title;
    if(Girl === undefined || Girl == null || auth === undefined || auth == null || title === undefined){
        return res.status(400).json({message: {msgBody: 'fill all dependecies', msgError: true}})
    } else{
        let newGirl = new Girls({Girl, auth, title})
        newGirl.save().then(newGirl => {
           res.status(201).json({message : {msgBody : "newGirl uploaded, Cool", msgError: false}})
        }).catch(err=>{
         res.status(400).json({message : {msgBody : "smth went wrong", msgError: true}})
         console.log(err);
        })       
    }
})
  
  
//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~//


//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~Get Girls~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

girlRouter.get('/', (req,res) => {
   Girls.find({}).sort({"createdAt": -1})
   .populate('lovers', ['username', 'profileImage'])
   .populate('Winners', ['username', 'profileImage']).then(girls=>{
      res.status(201).json({message : {msgBody : "all girls, Cool", msgError: false, girls}})
   }).catch(err=>res.status(400).json({message : {msgBody : "smth went wrong", msgError: true, err}}))
})
//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~//

//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~Love Selfies~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

girlRouter.post('/_love', async (req,res) => {
   try{
      let authId = req.body.authId;
      let girlID = req.body.girlID;
      let bitch = req.body.bitch;
      let EventAuth = req.body.EventAuth;
      let newNotification = new Notification({Girls: true, girlID: girlID, eventAuth: EventAuth, description:  "loved your anonymous post <3 <3", auth: authId})
      let checkUser = await User.findOne({"_id": authId});
      if(!authId || authId === undefined || authId == null || authId === ''){
         return res.status(400).json({message: {msgBody: "not autheticated", msgError: true}})
     }
      else if(!girlID || girlID === undefined || !girlID || girlID === null || !girlID || girlID === ''){
         return res.status(400).json({message: {msgBody: 'there is not girlID', msgError: true}})
     }
      else if(bitch !== 'Debbie'){
         return res.status(400).json({message: {msgBody: 'wrong password', msgError: true}})
     } 
     else if(checkUser.LoveCoins < 1) {
            res.status(200).json({message: {msgBody: 'u have 0 love coins', msgError: false}});
     }
    else if(checkUser.LoveCoins === 1 || checkUser.LoveCoins > 1){
         let updateUser = await User.updateOne({$and: [{"_id": authId}, {LoveCoins: {$gte: 1}}]},{$inc: {LoveCoins: -1}})
         let girlUpadate = await Girls.updateOne({"_id": girlID}, {$addToSet: {"lovers": authId}});
         let saveNotf = newNotification.save();
         let updateNotf = await Notification.updateOne({"_id": saveNotf._id}, {$addToSet: {"eventAuth": EventAuth}});
         Girls.find({}).populate('lovers', ['username', 'profileImage'])
         .populate('Winners', ['username', 'profileImage'])
         .sort({"createdAt": -1})
         .then(girls => {
            res.status(200).json({message: {msgBody: 'u have 34 love coins', msgError: false, girls}})
         })
         
    } else {
      res.status(400).json({message: {msgBody: 'smth went wrong', msgError: true}})
    }
   }catch(err){
      console.log(err);
      res.status(400).json({message: {msgBody: 'smth went wrong', msgError: true}});
   } 
 })

 //~~~~~~~~~~~~~~//~~~~~~~~~~~~~~find comments for Selfies~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

 girlRouter.post('/comments/:girlID', (req, res)=>{
    let girlID = req.params.girlID;
    CommentGirl.find({"girlID": girlID})
    .populate('CommentToComment.authId', ["profileImage", "username"])
    .populate('auth', ["profileImage", "username"])
    .sort({'_id': 1})
    .then(comments=>{
        return res.status(201).json({message: {msgBody: 'here we go your comments', msgError: false, comments}})
    }).catch(err=>console.log(err))
 })

 //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~//



module.exports = girlRouter;