const mongoose = require('mongoose');

const CommentToCommentPost = new mongoose.Schema({
    comment: { type: String, required: true },
    image: {type: String},
    authId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
 }, {timestamps: true});

const CommentPostSchema = new mongoose.Schema({
   comment: { type: String, required: true },
   image: {type: String},
   postId: { type: mongoose.Schema.Types.ObjectId, ref: 'posts', required: true},
   auth: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
   CommentToComment: [CommentToCommentPost]
    }, {timestamps: true});

module.exports = mongoose.model('commentsPost', CommentPostSchema);