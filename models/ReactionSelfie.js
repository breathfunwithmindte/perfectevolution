const mongoose = require('mongoose');

const ReactS = new mongoose.Schema({
   auth: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
   commentId: {type: mongoose.Schema.Types.ObjectId, ref: 'commentsSelfie', required: true},
   type: {type: String, required: true}
    }, {timestamps: true});

module.exports = mongoose.model('ReactS', ReactS);