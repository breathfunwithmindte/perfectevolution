const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const comments = new mongoose.Schema({
   comment: {type: String, maxlength: 3994},
   auth: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
}, {timestamps: true})

const CommentsPShchema = new mongoose.Schema({
   post: {type: mongoose.Schema.Types.ObjectId, ref: "Posts", required: true},
   writter: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true},
   content: {type: String, required: true, maxlength: 69690},
   auth: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
   authProfile: {type: mongoose.Schema.Types.ObjectId, ref: "Profiles", required: true},
   comments: [comments]
}, {timestamps: true})

module.exports = mongoose.model('CommentsP', CommentsPShchema);