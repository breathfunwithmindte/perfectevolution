const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({

   eventAuth: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
   ],
   auth: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: false},
   description: {type: String, required: true},
   comment: {type: String, required: false},
   post: { type:mongoose.Schema.Types.ObjectId, ref: 'Post', required: false},
   selfie: { type:mongoose.Schema.Types.ObjectId, ref: 'Selfie', required: false},
   music: { type:mongoose.Schema.Types.ObjectId, ref: 'Music', required: false},
   commentPost: { type:mongoose.Schema.Types.ObjectId, ref: 'commentsPost', required: false},
   commentSelfie: { type:mongoose.Schema.Types.ObjectId, ref: 'commentsSelfie', required: false},
   commentSong: { type:mongoose.Schema.Types.ObjectId, ref: 'commentSong', required: false},
   commentGirl: { type:mongoose.Schema.Types.ObjectId, ref: 'commentsGirl', required: false},
   profileComment: {type: Boolean, enum: [false,true], required: false},
   profilePhoto: {type: String, required: false},
   gaming: { type: Boolean, enum: [false,true], required: false},
   react: {type: Boolean, enum: [false,true], required: false},
   Girls: {type: Boolean, enum: [false, true], required: false},
   girlID: {type:mongoose.Schema.Types.ObjectId, ref: 'Girls', required: false},
   Welcome: {type: Boolean, enum: [false, true], required: false, default: false},
   seen: {type: Boolean, enum: [false, true], default: false},
   expire_at: {type: Date, default: Date.now, expires: 69000, required: true}
    },{timestamps: true});

module.exports = mongoose.model('Notifications', NotificationSchema);