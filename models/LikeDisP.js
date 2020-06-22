const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const LikeDisPSchema = new mongoose.Schema({
   auth: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
   post: {type: mongoose.Schema.Types.ObjectId, ref: "Posts", required: true},
   authProfile: {type: mongoose.Schema.Types.ObjectId, ref: "Profiles", required: true},
   type: {type: String, enum: ["like", "dislike"], required: true},
}, {timestamps: true})

module.exports = mongoose.model('LikesP', LikeDisPSchema);