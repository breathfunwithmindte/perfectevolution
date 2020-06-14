const express = require('express');
const ReactionRouter = express.Router();
const ReactionSelfie = require('../models/ReactionSelfie');
const ReactionSong = require('../models/ReactionSong');
const ReactionGirl = require('../models/ReactionGirl');
const LikePostComment = require('../models/LikePostComment');
const Notification = require('../models/Notification');

                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~//||   "Αγάπα με όταν δεν το αξίζω, σκουπίδι"   ||//~~~~~~~~~~~~~~//
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//


//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~AGREE DISAGREE~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

ReactionRouter.post('/:commentId', async (req, res) => {
    try{
        let commentId = req.params.commentId;
        let auth = req.body.auth;
        let comment = req.body.comment;
        let type = req.body.type

        let checkifExist = await LikePostComment.find({"auth": auth, "commentId": commentId});
        if(checkifExist.length === 0){
            let newReaction = new LikePostComment({commentId, auth, type})
            let saveReaction = await newReaction.save();
            return res.status(201).json({message: {msgBody: "you successfully reacted to comment", msgBody: false, saveReaction}})
        }else{
            let updateReaction = await LikePostComment.updateOne({"auth": auth, "commentId": commentId}, {$set: {type: type}})
            let updatedReaction = await LikePostComment.findOne({"auth": auth, "commentId": commentId})
            return res.status(201).json({message: {msgBody: "you successfully reacted to comment", msgBody: false, updatedReaction}})
        }

    }catch(err){
        res.status(400).json({message: {msgBody: "smth went wrong", msgError: true}})
        console.log(err)
    }
})


ReactionRouter.post("/myReactions/:userId", (req,res) => {
        LikePostComment.find({"auth": req.params.userId}).then(reactions => {
            res.status(200).json({message: {msgBody: "your all reactions", msgBody: false, reactions}})
        }).catch(err=>console.log(err))
 
})

ReactionRouter.post("/allReactions/:commentId", (req,res) => {
    LikePostComment.find({"commentId": req.params.commentId}).populate("auth", ["username", "profileImage"]).then(allreactions => {
        res.status(200).json({message: {msgBody: "all reactions", msgBody: false, allreactions}})
    }).catch(err=>console.log(err))
})

//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~SELFIE REACTIONS~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//


ReactionRouter.post('/selfie/:commentId', async (req, res) => {
    try{
        let commentId = req.params.commentId;
        let auth = req.body.auth;
        let comment = req.body.comment;
        let type = req.body.type

        let checkifExist = await ReactionSelfie.find({"auth": auth, "commentId": commentId});
        if(checkifExist.length === 0){
            let newReaction = new ReactionSelfie({commentId, auth, type})
            let saveReaction = await newReaction.save();
            return res.status(201).json({message: {msgBody: "you successfully reacted to comment", msgBody: false, saveReaction}})
        }else{
            let updateReaction = await ReactionSelfie.updateOne({"auth": auth, "commentId": commentId}, {$set: {type: type}})
            let updatedReaction = await ReactionSelfie.findOne({"auth": auth, "commentId": commentId})
            return res.status(201).json({message: {msgBody: "you successfully reacted to comment", msgBody: false, updatedReaction}})
        }

    }catch(err){
        res.status(400).json({message: {msgBody: "smth went wrong", msgError: true}})
        console.log(err)
    }
})

ReactionRouter.post("/my_selfie_Reactions/:userId", (req,res) => {
    ReactionSelfie.find({"auth": req.params.userId}).then(reactions => {
        res.status(200).json({message: {msgBody: "your all reactions", msgBody: false, reactions}})
    }).catch(err=>console.log(err))

})

ReactionRouter.post("/all_selfie_Reactions/:commentId", (req,res) => {
ReactionSelfie.find({"commentId": req.params.commentId}).populate("auth", ["username", "profileImage"]).then(allreactions => {
    res.status(200).json({message: {msgBody: "all reactions", msgError: false, allreactions}})
}).catch(err=>console.log(err))
})

ReactionRouter.get("/all_reactions_selfie", (req,res) => {
    ReactionSelfie.find({}, {commentId: 1}).then(allreactions_badge => {
        res.status(200).json({message: {msgBody: "badge reactions", msgError: false, allreactions_badge}})
    }).catch(err=>console.log(err))
})

//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~SONG REACTIONS~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//


ReactionRouter.post('/song/:commentId', async (req, res) => {
    try{
        let commentId = req.params.commentId;
        let auth = req.body.auth;
        let comment = req.body.comment;
        let type = req.body.type

        let checkifExist = await ReactionSong.find({"auth": auth, "commentId": commentId});
        if(checkifExist.length === 0){
            let newReaction = new ReactionSong({commentId, auth, type})
            let saveReaction = await newReaction.save();
            return res.status(201).json({message: {msgBody: "you successfully reacted to comment", msgBody: false, saveReaction}})
        }else{
            let updateReaction = await ReactionSong.updateOne({"auth": auth, "commentId": commentId}, {$set: {type: type}})
            let updatedReaction = await ReactionSong.findOne({"auth": auth, "commentId": commentId})
            return res.status(201).json({message: {msgBody: "you successfully reacted to comment", msgBody: false, updatedReaction}})
        }

    }catch(err){
        res.status(400).json({message: {msgBody: "smth went wrong", msgError: true}})
        console.log(err)
    }
})

ReactionRouter.post("/my_song_Reactions/:userId", (req,res) => {

    ReactionSong.find({"auth": req.params.userId}).then(reactions => {
        res.status(200).json({message: {msgBody: "your all reactions", msgBody: false, reactions}})
    }).catch(err=>console.log(err))

})

ReactionRouter.post("/all_song_Reactions/:commentId", (req,res) => {

    ReactionSong.find({"commentId": req.params.commentId}).populate("auth", ["username", "profileImage"]).then(allreactions => {
        res.status(200).json({message: {msgBody: "all reactions", msgBody: false, allreactions}})
    }).catch(err=>console.log(err))
})


ReactionRouter.get("/all_reactions_song", (req,res) => {
    ReactionSong.find({}, {commentId: 1}).then(allreactions_badge => {
        res.status(200).json({message: {msgBody: "badge reactions", msgError: false, allreactions_badge}})
    }).catch(err=>console.log(err))
})

//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~SELFIE REACTIONS~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//


ReactionRouter.post('/G/:commentId', async (req, res) => {
    try{
        let commentId = req.params.commentId;
        let auth = req.body.auth;
        let comment = req.body.comment;
        let type = req.body.type

        let checkifExist = await ReactionGirl.find({"auth": auth, "commentId": commentId});
        if(checkifExist.length === 0){
            let newReaction = new ReactionGirl({commentId, auth, type})
            let saveReaction = await newReaction.save();
            return res.status(201).json({message: {msgBody: "you successfully reacted to comment", msgBody: false, saveReaction}}
)
        }else{
            let updateReaction = await ReactionGirl.updateOne({"auth": auth, "commentId": commentId}, {$set: {type: type}})
            let updatedReaction = await ReactionGirl.findOne({"auth": auth, "commentId": commentId})
            return res.status(201).json({message: {msgBody: "you successfully reacted to comment", msgBody: false, 
updatedReaction}})
        }

    }catch(err){
        res.status(400).json({message: {msgBody: "smth went wrong", msgError: true}})
        console.log(err)
    }
})

ReactionRouter.post("/my_G_Reactions/:userId", (req,res) => {
    ReactionGirl.find({"auth": req.params.userId}).then(reactions => {
        res.status(200).json({message: {msgBody: "your all reactions", msgBody: false, reactions}})
    }).catch(err=>console.log(err))

})

ReactionRouter.post("/all_G_Reactions/:commentId", (req,res) => {
ReactionGirl.find({"commentId": req.params.commentId}).populate("auth", ["username", "profileImage"]).then(allreactions => {
    res.status(200).json({message: {msgBody: "all reactions", msgError: false, allreactions}})
}).catch(err=>console.log(err))
})

ReactionRouter.get("/all_reactions_G", (req,res) => {
    ReactionGirl.find({}, {commentId: 1}).then(allreactions_badge => {
        res.status(200).json({message: {msgBody: "badge reactions", msgError: false, allreactions_badge}})
    }).catch(err=>console.log(err))
})







module.exports = ReactionRouter;