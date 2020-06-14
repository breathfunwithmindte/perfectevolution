const express = require('express');
const NotificationRouter = express.Router();
const Notification = require('../models/Notification');

NotificationRouter.post('/:userId', (req,res) => {
   Notification.find({$and: [{"eventAuth": req.params.userId}, {"seen": false}, {"auth": {$ne: userId}}]})
   .populate("auth", ["profileImage", "username"])
   .populate("smartWords")
   .populate("selfie")
   .populate("music")
   .then(notf => { res.status(201).json({message: {msgBody: 'notf here', msgError: false, notf}})
   }).catch(err=>console.log(err))
})


module.exports = NotificationRouter;