const express = require('express');
const PostRouter = express.Router();
const Post = require('../models/Post');
const CommentPost = require('../models/CommentPost');
const Notification = require('../models/Notification');


                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~//||   "Αγάπα με όταν δεν το αξίζω, σκουπίδι"   ||//~~~~~~~~~~~~~~//
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//


//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~New Post~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

PostRouter.post('/NeW', (req,res) => {
   let newPost = new Post({Post: req.body.post, auth: req.body.authId, Title: req.body.title, Image: req.body.image})
   newPost.save().then(post => {
      res.status(201).json({message : {msgBody : "Post uploaded, Cool", msgError: false, post}})
   }).catch(err=>res.status(400).json({message : {msgBody : "smth went wrong", msgError: true, err}}))
})
//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~//


//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~Get Posts~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

PostRouter.get('/get_posts', (req,res) => {
   Post.find().sort({"_id": -1})
   .populate("auth", ["profileImage", "username"])
   .populate("like", ["profileImage", "username"])
   .populate("dislike", ["profileImage", "username"])
   .limit(100).then(posts=>{
      res.status(201).json({message : {msgBody : "all posts, have fun", msgError: false, posts}})
   }).catch(err=>res.status(400).json({message : {msgBody : "smth went wrong", msgError: true, err}}))
})
//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~//

//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~Comment Posts~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

PostRouter.post('/comments/:postId', (req, res)=>{
   let postId = req.params.postId;
   CommentPost.find({"postId": postId})
   .populate('auth', ["profileImage", "username"])
   .populate('CommentToComment.authId', ["profileImage", "username"])
   .sort({'_id': 1}).then(comments=>{
       return res.status(201).json({message: {msgBody: 'here we go your comments', msgError: false, comments}})
   }).catch(err=>console.log(err))
})

//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~get profile Post~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

PostRouter.post('/Profile_Post/:profileId', (req, res)=>{
   let profileId = req.params.profileId;
   Post.find({"auth": profileId}).sort({_id: -1})
   .populate('auth', ['username', 'profileImage', 'coverImage', 'PerfecTInfo', 'Followers'])
   .populate("like", ["profileImage", "username"])
   .populate("dislike", ["profileImage", "username"])
   .then(posts=>{
       res.status(201).json({message : {msgBody : "all userPosts, Cool", msgError: false, posts}})
   }).catch(err=>res.status(400).json({message : {msgBody : "smth went wrong", msgError: true, err}}))
})



PostRouter.post('/lala', (req,res) => {
   Post.updateOne({'_id': req.body.id}, {
      $pull: { like: req.body.iid},
      $addToSet: {
         dislike:{
          $each: [req.body.iid]
         } 
       }
     
   }).then(lala=> res.json({lala}))
})

module.exports = PostRouter;