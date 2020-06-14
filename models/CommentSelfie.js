const mongoose = require('mongoose');

const CommentToCommentSelfie = new mongoose.Schema({
    comment: { type: String, required: true },
    image: {type: String},
    authId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
 }, {timestamps: true});


const CommentSelfieSchema = new mongoose.Schema({
   comment: { type: String, required: true },
   image: {type: String},
   selfieId: { type: mongoose.Schema.Types.ObjectId, ref: 'selfies', required: true},
   auth: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
   CommentToComment: [CommentToCommentSelfie]
    }, {timestamps: true});

module.exports = mongoose.model('commentsSelfie',CommentSelfieSchema);