const mongoose = require('mongoose');
const Selfie = require('../models/Selfie');


const SelfieSchema = new mongoose.Schema({

   selfie: {type: String, required: true},
   auth: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
   description: {type: String, maxlength: 192},
   love: [
      {
         type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true
      }
   ],
    },{ timestamps: true });

module.exports = mongoose.model('Selfie',SelfieSchema);