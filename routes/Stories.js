const express = require('express');
const StoriesRouter = express.Router();
const Stories = require('../models/Stories');
const multer = require('multer');

//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~Storage Story~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Stories/')
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

var upload = multer({ storage: storage }).single("story")

//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~Api for storage~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//


StoriesRouter.post('/video', (req,res) => {
   upload(req, res, err => {
      console.log(req.file)
      if (err) { return res.json({message:{ msgBody : "smth went wrong", msgError: true }}) } 
     return res.json({message:{ msgBody : "Story uploaded, Cool", msgError: false, story: res.req.file.path, storyFileName: res.
req.file.filename }})
  })
})

                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~//||   "Αγάπα με όταν δεν το αξίζω, σκουπίδι"   ||//~~~~~~~~~~~~~~//
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//


//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~Create Story~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

StoriesRouter.post('/NeW', (req,res) => {
   let newStory = new Stories({story: req.body.story, auth: req.body.authId})
   newStory.save().then(newStory => {
      res.status(201).json({message : {msgBody : "Story uploaded, Cool", msgError: false, newStory}})
   }).catch(err=>res.status(400).json({message : {msgBody : "smth went wrong", msgError: true, err}}))
})
//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~//


//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~Get Stories~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

StoriesRouter.get('/get_stories', (req,res) => {
   Stories.find({})
   .populate('auth', ["coverImage", "profileImage", "username"])
   .populate("viewers", ["profileImage", "username"]).then(stories=>{
      res.status(201).json({message : {msgBody : "all stories, Cool", msgError: false, stories}})
   }).catch(err=>res.status(400).json({message : {msgBody : "smth went wrong", msgError: true, err}}))
})
//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~//

module.exports = StoriesRouter;