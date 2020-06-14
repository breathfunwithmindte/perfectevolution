const mongoose = require('mongoose');


const ProfilePhotoCommentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    profilePhoto: { type: String, required: true},
    auth: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    Reaction: {type: String}
     }, {timestamps: true});

module.exports = mongoose.model('ProfilePhotoComment', ProfilePhotoCommentSchema);