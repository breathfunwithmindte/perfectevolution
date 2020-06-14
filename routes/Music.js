const express = require('express');
const MusicRouter = express.Router();
const Music = require('../models/Music');
const User = require('../models/User');
const Notification = require('../models/Notification');
const CommentSong = require('../models/CommentSong');
const multer = require('multer');

//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~Storage Song~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Music/')
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

var upload = multer({ storage: storage }).single("song")

//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~Api for storage~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//


MusicRouter.post('/song', (req,res) => {
   upload(req, res, err => {
      console.log(req.file)
      if (err) { return res.json({message:{ msgBody : "smth went wrong", msgError: true }}) } 
     return res.json({message:{ msgBody : "Selfie uploaded, Cool", msgError: false, song: res.req.file.path, songFileName: 
res.req.file.filename }})
  })
})

                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~//||   "Αγάπα με όταν δεν το αξίζω, σκουπίδι"   ||//~~~~~~~~~~~~~~//
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//


//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~New Music "remindings"~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

MusicRouter.post('/NeW', (req,res) => {
   let newSong = new Music({song: req.body.song, auth: req.body.authId, description: req.body.description, mood: req.body.mood})
   newSong.save().then(Song => {
      res.status(201).json({message : {msgBody : "Song uploaded, Cool", msgError: false, Song}})
   }).catch(err=>res.status(400).json({message : {msgBody : "smth went wrong", msgError: true, err}}))
})
//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~//


//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~Get Music~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

MusicRouter.get('/', (req,res) => {
   Music.find().sort({_id: -1}).populate('auth', ['username', 'profileImage', 'coverImage', 'PerfecTInfo', 'Followers']).populate('love', ['username', 'profileImage']).then(songs=>{
      res.status(201).json({message : {msgBody : "all songs, Cool", msgError: false, songs}})
   }).catch(err=>res.status(400).json({message : {msgBody : "smth went wrong", msgError: true, err}}))
})
//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~//

//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~Love Song~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

MusicRouter.post('/_love', (req,res) => {
    let authId = req.body.authId;
    let songId = req.body.songId;
    let eirini = req.body.eirini;
    let EventAuth = req.body.EventAuth
    let newNotification = new Notification({music: songId, description:  "loved your song <3 <3", auth: authId})
if(!authId || authId === undefined || authId == null || authId === ''){
    return res.status(400).json({message: {msgBody: "not autheticated", msgError: true}})
} else if(!songId || songId === undefined || !songId || songId === null || !songId || songId === ''){
    return res.status(400).json({message: {msgBody: 'there is not song', msgError: true}})
} else if(eirini !== 'love'){
    return res.status(400).json({message: {msgBody: 'smth went wrong', msgError: true}})
}else {
    User.updateOne({$and: [{"_id": authId}, {LoveCoins: {$gte: 1}}]},{
        $inc: {LoveCoins: -1},
    }).then(user=>{
        if(user.nModified === 0) return res.status(201).json({message: {msgBody: 'u have 0 love coins', msgError: false}})
       else if(user.nModified !== 0){
           Music.updateOne({"_id": songId}, {$addToSet: {love: authId}}).then(u=>{
               newNotification.save().then(newNotf => Notification.updateOne({"_id": newNotf._id}, {
                   $addToSet: {"eventAuth": EventAuth}
               }))
               return res.status(201).json({message: {msgBody: 'success', msgError: false}})
           }).catch(err=>console.log(err))
       }
    }).catch(error=>console.log(error))
}
   
 })

 //~~~~~~~~~~~~~~//~~~~~~~~~~~~~~Comment Song~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

 MusicRouter.post('/comments/:songId', (req, res)=>{
    let songId = req.params.songId;
    CommentSong.find({"songId": songId})
    .populate('CommentToComment.authId', ["profileImage", "username"])
    .populate('auth', ["profileImage", "username"])
    .sort({'_id': 1})
    .then(comments=>{
        return res.status(201).json({message: {msgBody: 'here we go your comments', msgError: false, comments}})
    }).catch(err=>console.log(err))
 })
 

 //~~~~~~~~~~~~~~//~~~~~~~~~~~~~~get profile Selfies~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//
 MusicRouter.post('/user_Songs/:profileId', (req, res)=>{
    let profileId = req.params.profileId;
    Music.find({"auth": profileId}).sort({_id: -1}).populate('auth', ['username', 'profileImage', 'coverImage', 'PerfecTInfo',
 'Followers']).populate('love', ['username', 'profileImage']).then(songs=>{
        res.status(201).json({message : {msgBody : "all user songs, Cool", msgError: false, songs}})
    }).catch(err=>res.status(400).json({message : {msgBody : "smth went wrong", msgError: true, err}}))
 })
 //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~//

module.exports = MusicRouter;