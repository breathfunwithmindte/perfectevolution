const express = require('express');
const SelfieRouter = express.Router();
const Selfie = require('../models/Selfie');
const User = require('../models/User');
const CommentSelfie = require('../models/CommentSelfie');
const Notification = require('../models/Notification');
const multer = require('multer');

//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~Storage Story~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Selfie/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png' || ext !== '.mp4'|| ext !== '.webm') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("Selfie")

//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~Api for storage~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//


SelfieRouter.post('/photo', (req,res) => {
   upload(req, res, err => {
      console.log(req.file)
      if (err) { return res.json({message:{ msgBody : "smth went wrong", msgError: true }}) } 
     return res.json({message:{ msgBody : "Selfie uploaded, Cool", msgError: false, selfie: res.req.file.path, selfieFileName: res.
req.file.filename }})
  })
})
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~//||   "Αγάπα με όταν δεν το αξίζω, σκουπίδι"   ||//~~~~~~~~~~~~~~//
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//


//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~New sexy Selfie~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

SelfieRouter.post('/NeW', (req,res) => {
    let selfie = req.body.selfie;
    let auth = req.body.authId;
    let description = req.body.description;
    if(selfie === undefined || selfie == null || auth === undefined || auth == null || description === undefined){
        return res.status(400).json({message: {msgBody: 'fill all dependecies', msgError: true}})
    } else{
        let newSelfie = new Selfie({selfie: req.body.selfie, auth: req.body.authId, description: req.body.description})
        newSelfie.save().then(newSelfie => {
           res.status(201).json({message : {msgBody : "Selfie uploaded, Cool", msgError: false, newSelfie}})
        }).catch(err=>res.status(400).json({message : {msgBody : "smth went wrong", msgError: true, err}}))       
    }
})
  
  
//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~//


//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~Get Selfies~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

SelfieRouter.get('/', (req,res) => {
   Selfie.find().sort({_id: -1}).populate('auth', ['username', 'profileImage', 'coverImage', 'PerfecTInfo', 'Followers']).populate('love', ['username', 'profileImage']).then(selfies=>{
      res.status(201).json({message : {msgBody : "all selfies, Cool", msgError: false, selfies}})
   }).catch(err=>res.status(400).json({message : {msgBody : "smth went wrong", msgError: true, err}}))
})
//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~//

//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~Love Selfies~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

SelfieRouter.post('/_love', (req,res) => {
    let authId = req.body.authId;
    let selfieId = req.body.selfieId;
    let eirini = req.body.eirini;
    let EventAuth = req.body.EventAuth;
    let newNotification = new Notification({selfie: selfieId, eventAuth: EventAuth, description:  "loved your Selfie <3 <3", auth: authId})
if(!authId || authId === undefined || authId == null || authId === ''){
    return res.status(400).json({message: {msgBody: "not autheticated", msgError: true}})
} else if(!selfieId || selfieId === undefined || !selfieId || selfieId === null || !selfieId || selfieId === ''){
    return res.status(400).json({message: {msgBody: 'there is not selfie', msgError: true}})
} else if(eirini !== 'love'){
    return res.status(400).json({message: {msgBody: 'smth went wrong', msgError: true}})
}else {
    User.updateOne({$and: [{"_id": authId}, {LoveCoins: {$gte: 1}}]},{
        $inc: {LoveCoins: -1},
    }).then(user=>{
        if(user.nModified === 0) return res.status(200).json({message: {msgBody: 'u have 0 love coins', msgError: false}})
       else if(user.nModified !== 0){
           Selfie.updateOne({"_id": selfieId}, {$addToSet: {love: authId}}).then(u=>{
               return res.status(201).json({message: {msgBody: 'success', msgError: false}})
           }).then(notf => {
            newNotification.save().then(newNotf => Notification.updateOne({"_id": newNotf._id}, {
                $addToSet: {"eventAuth": EventAuth}
            }))
           }).catch(err=>console.log(err))
       }
    }).catch(error=>console.log(error))
}
   
 })

 //~~~~~~~~~~~~~~//~~~~~~~~~~~~~~find comments for Selfies~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

 SelfieRouter.post('/comments/:selfieId', (req, res)=>{
    let selfieId = req.params.selfieId;
    CommentSelfie.find({"selfieId": selfieId})
    .populate('CommentToComment.authId', ["profileImage", "username"])
    .populate('auth', ["profileImage", "username"])
    .sort({'_id': 1})
    .then(comments=>{
        return res.status(201).json({message: {msgBody: 'here we go your comments', msgError: false, comments}})
    }).catch(err=>console.log(err))
 })

 //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~//

 //~~~~~~~~~~~~~~//~~~~~~~~~~~~~~get profile Selfies~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

 SelfieRouter.post('/getProfile_selfies/:profileId', (req, res)=>{
    let profileId = req.params.profileId;
    Selfie.find({"auth": profileId}).sort({_id: -1}).populate('auth', ['username', 'profileImage', 'coverImage', 'PerfecTInfo', 'Followers']).populate('love', ['username', 'profileImage']).then(selfies=>{
        res.status(201).json({message : {msgBody : "all selfies, Cool", msgError: false, selfies}})
    }).catch(err=>res.status(400).json({message : {msgBody : "smth went wrong", msgError: true, err}}))
 })

 //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~//

module.exports = SelfieRouter;