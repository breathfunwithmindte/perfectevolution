const mongoose = require('mongoose');

const CommentToCommentSong = new mongoose.Schema({
    comment: { type: String, required: true },
    image: {type: String},
    authId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
 }, {timestamps: true});


const CommentSongSchema = new mongoose.Schema({
   comment: { type: String, required: true },
   image: {type: String},
   songId: { type: String, required: true},
   auth: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
   CommentToComment: [CommentToCommentSong]
    }, {timestamps: true});

module.exports = mongoose.model('commentSong',CommentSongSchema);