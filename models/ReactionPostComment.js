const mongoose = require('mongoose');

const ReactionCPSchema = new mongoose.Schema({
   auth: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
   comment: {type: mongoose.Schema.Types.ObjectId, ref: "CommentsP", required: true},
   authProfile: {type: mongoose.Schema.Types.ObjectId, ref: "Profiles", required: true},
   type: {type: String, enum: ["agree", "disagree", "funny", "LoL", "fuuu"], required: true},
}, {timestamps: true})

module.exports = mongoose.model('ReactionCP', ReactionCPSchema);