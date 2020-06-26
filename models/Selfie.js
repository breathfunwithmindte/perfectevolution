const mongoose = require('mongoose');

const SelfieSchema = new mongoose.Schema({
   selfie: {type: String, required: true},
   auth: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
   authProfile: {type: mongoose.Schema.Types.ObjectId, ref: "Profiles", required: true},
   miniDescription: {type: String, required: false, maxlength: 92},
   Love: [
      {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true}
   ]
}, {timestamps: true})

module.exports = mongoose.model('Selfie', SelfieSchema);