const mongoose = require('mongoose');
const Stories = require('../models/Stories');

const StoriesSchema = new mongoose.Schema({
   story: {type: String, required: true},
   auth: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
   viewers: [
      {
         type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true
      }
   ],
   expire_at: {type: Date, default: Date.now, expires: 14000, required: true}
    });

module.exports = mongoose.model('Stories', StoriesSchema);