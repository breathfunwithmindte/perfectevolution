const mongoose = require('mongoose');

const MusicSchema = new mongoose.Schema({
   song: {type: String, required: true},
   auth: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
   description: {type: String, maxlength: 192},
   mood: {type: String, required: true},
   love: [
      {
         type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true
      }
   ]
    },{timestamps: true});

module.exports = mongoose.model('Music',MusicSchema);