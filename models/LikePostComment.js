const mongoose = require('mongoose');

const LikeCommentSchema = new mongoose.Schema({
   auth: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
   commentId: {type: mongoose.Schema.Types.ObjectId, ref: 'commentsPost', required: true},
   type: {type: String, required: true}
    }, {timestamps: true});

module.exports = mongoose.model('LikeComment', LikeCommentSchema);