const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
   content: {type: String, required: true, maxlength: 69690},
   auth: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
   authProfile: {type: mongoose.Schema.Types.ObjectId, ref: "Profiles", required: true},
   Love: [
      {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true}
   ]
}, {timestamps: true})

module.exports = mongoose.model('Posts', PostSchema);