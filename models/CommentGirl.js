const mongoose = require('mongoose');

const CommentToCommentGirls = new mongoose.Schema({
    comment: { type: String, required: true },
    image: {type: String},
    authId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
 }, {timestamps: true});


const CommentGirlSchema = new mongoose.Schema({
   comment: { type: String, required: true },
   image: {type: String},
   girlID: { type: mongoose.Schema.Types.ObjectId, ref: 'Girls', required: true},
   auth: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
   CommentToComment: [CommentToCommentGirls]
    }, {timestamps: true});

module.exports = mongoose.model('commentsGirl',CommentGirlSchema);