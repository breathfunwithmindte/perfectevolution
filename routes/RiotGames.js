const express = require('express');
const RiotGamesRouter = express.Router();
const FindPremade = require('../models/FindPremade');
const Notification = require('../models/Notification');


                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~//||   "Αγάπα με όταν δεν το αξίζω, σκουπίδι"   ||//~~~~~~~~~~~~~~//
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//


//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~Find Premade~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

RiotGamesRouter.post('/join', (req,res) => {
   let newPlayer = new FindPremade({Auth: req.body.authId, NeedPremade: req.body.NeedPremade, PrefPlaystyle: req.body.PrefPlaystyle})
   newPlayer.save().then(player => {
      res.status(201).json({message : {msgBody : "player is online, Cool", msgError: false, player}})
   }).catch(err=>res.status(400).json({message : {msgBody : "smth went wrong", msgError: true, err}}))
})
//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~//

//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~current user online~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

RiotGamesRouter.get('/:authId', (req,res) => {

   FindPremade.findOne({"Auth": req.params.authId}).then(player => {
      res.status(201).json({message : {msgBody : "player is online, Cool", msgError: false, player}})
   }).catch(err=>res.status(400).json({message : {msgBody : "smth went wrong", msgError: true, err}}))
})
//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~//

//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~send notf to premade~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

RiotGamesRouter.post('/sendNotification/:authId', async (req,res) => {
   try{
      let EventAuth = req.body.EventAuth;
      let authId = req.params.authId;
      let newNotification = new Notification({gaming: true, eventAuth: EventAuth, description: 
         "want play with you :D :D", auth: authId})
      let check = await Notification.findOne({"gaming": true, "auth": authId, "eventAuth": EventAuth })
       if(check === null){
          newNotification.save()
         res.status(201).json({message: {msgBody: "notf sended", msgError: false}}) 
       } else {
          res.status(200).json({message: {msgBody: "already send", msgError: false}})
       }
   }catch(err){
      console.log(err)
   }

})
//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~//

//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~all players~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

RiotGamesRouter.post('/Players', (req,res) => {
   FindPremade.find().populate("Auth", ["gaming", "profileImage", "username"]).then(players => {
      res.status(200).json({message : {msgBody : "player is online, Cool", msgError: false, players}})
   }).catch(err=>res.status(400).json({message : {msgBody : "smth went wrong", msgError: true, err}}))
})
//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~//


//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~Get All players online~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

RiotGamesRouter.get('/get_posts', (req,res) => {
   FindPremade.find().sort({"_id": -1})
   .populate("auth", ["profileImage", "username"])
   .populate("like", ["profileImage", "username"])
   .populate("dislike", ["profileImage", "username"])
   .limit(100).then(posts=>{
      res.status(201).json({message : {msgBody : "all posts, have fun", msgError: false, posts}})
   }).catch(err=>res.status(400).json({message : {msgBody : "smth went wrong", msgError: true, err}}))
})
//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~//

//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~Comment Posts~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

// PostRouter.post('/comments/:postId', (req, res)=>{
   // let postId = req.params.postId;
   // CommentPost.find({"postId": postId}).populate('auth', ["profileImage", "username"]).sort({'_id': -1}).then(comments=>{
      //  return res.status(201).json({message: {msgBody: 'here we go your comments', msgError: false, comments}})
   // }).catch(err=>console.log(err))
// })
// 
//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~get profile Post~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

// PostRouter.post('/Profile_Post/:profileId', (req, res)=>{
   // let profileId = req.params.profileId;
   // Post.find({"auth": profileId}).sort({_id: -1})
   // .populate('auth', ['username', 'profileImage', 'coverImage', 'PerfecTInfo', 'Followers'])
   // .populate("like", ["profileImage", "username"])
   // .populate("dislike", ["profileImage", "username"])
   // .then(posts=>{
      //  res.status(201).json({message : {msgBody : "all userPosts, Cool", msgError: false, posts}})
   // }).catch(err=>res.status(400).json({message : {msgBody : "smth went wrong", msgError: true, err}}))
// })
// 



module.exports = RiotGamesRouter;