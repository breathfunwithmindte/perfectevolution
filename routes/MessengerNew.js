const express = require('express');
const MessengerNewRouter = express.Router();
const Messenger = require('../models/Messenger');

                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~//||   "Αγάπα με όταν δεν το αξίζω, σκουπίδι"   ||//~~~~~~~~~~~~~~//
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//

//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~Messenger master route~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

MessengerNewRouter.post('/chatroom_new', async (req,res) => {
   try{
      let auth = req.body.authId;
      let lover = req.body.lover;
      let newMessenger = new Messenger({auth: auth, lover: lover})
      let checkIfexist = await Messenger.findOne({$or: [{auth: auth, lover: lover}, {auth: lover, lover: auth}]});
      if(auth === undefined || auth == null) {
         res.status(400).json({message: {msgBody: 'bad request', msgError: true}})
      } else if(checkIfexist === null){
         newMessenger.save().then(newMessenger => {
            res.status(201).json({message: {msgBody: "new messenger", msgError: false, responseID: newMessenger._id}})
         })
      } else if(checkIfexist !== null) {
         res.status(200).json({message: {msgBody: "messenger", msgError: false, responseID: checkIfexist._id}})
      } else {
         res.status(400).json({message: {msgBody: "smth went wrong", msgError: true}})
      }

   }catch(err) {
      console.log(err)
   }
})

                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~//||"Πέρασε καιρός, you gonna never walk alone" ||//~~~~~~~~~~~~~~//
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//

MessengerNewRouter.post('/messenger/:chatroomID', (req,res) => {
   Messenger.findById({"_id": req.params.chatroomID})
   .populate("auth", ["username", "profileImage", "Online"])
   .populate("lover", ["username", "profileImage", "Online"])
   .populate("messanges.auth", ["username", "profileImage"])
   .then(messenger => {
      res.status(200).json({message: {msgBody: "your chatroom", msgError: false, messenger}})
   }).catch(err=> console.log(err))
})

                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~//||"Πέρασε καιρός, you gonna never walk alone" ||//~~~~~~~~~~~~~~//
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//


MessengerNewRouter.get('/my_chatrooms/:userId', (req,res) => {
   Messenger
   .find({$or: [{"auth": req.params.userId},{"lover": req.params.userId}]}, {"_id": 1, "auth": 1, "lover": 1})
   .sort({"messanges.createdAt": 1})
   .populate("auth", ["username", "profileImage", "Online"])
   .populate("lover", ["username", "profileImage", "Online"])
   .then(chatrooms => {
      res.status(200).json({message: {msgBody: 'your chatrooms', msgError: false, chatrooms}})
   }).catch(err=>{
      console.log(err);
      res.status(400).json({message: {msgBody: "smth went wrong", msgError: true, err}})
   })
})

MessengerNewRouter.get('/myglobal_chatrooms/:userId', (req,res) => {
   Messenger
   .find({$or: [{"auth": req.params.userId},{"lover": req.params.userId}]})
   .sort({"messanges.createdAt": 1})
   .populate("auth", ["username", "profileImage", "Online"])
   .populate("lover", ["username", "profileImage", "Online"])
   .populate('messanges.auth', ["profileImage"])
   .limit(8)
   .then(chatrooms => {
      res.status(200).json({message: {msgBody: 'your chatrooms', msgError: false, chatrooms}})
   }).catch(err=>{
      console.log(err);
      res.status(400).json({message: {msgBody: "smth went wrong", msgError: true, err}})
   })
})


module.exports = MessengerNewRouter;