const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
   user: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},

   writter: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true},
   auth: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: false},
   type: {type: String, enum: [
       "Reaction_Comment_Post", 
       "Comment_Comment_Post", 
       "Comment_Post",
       "LikeDislike_Post",
       "Love_Post", 

       "Reaction_Comment_AskQuestion", 
       "Comment_Comment_AskQuestion", 
       "Comment_AskQuestion",
       "LikeDislike_AskQuestion",
       "Love_AskQuestion", 

       "Reaction_Profile_Photo", 
       "Comment_Profile_Photo", 
       "Comment_Comment_Profile_Photo",
       "Love_Profile_Photo",

       "Comment_Selfie", 
       "Comment_Comment_Selfie",
       "Love_Selfie",

       "Comment_Song", 
       "Comment_Comment_Song",
       "Love_Song",

       "AskTojoin_Group",
       "JoinGroup",

       "Watched_Story",

       "Follow_You",
       "Unfollow_You"
    ], required: true},
    post: {type: String}
}, {timestamps: true})

module.exports = mongoose.model('Notifications', NotificationSchema);