const mongoose = require('mongoose');

const ReactG = new mongoose.Schema({
   auth: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
   commentId: {type: mongoose.Schema.Types.ObjectId, ref: 'commentsGirl', required: true},
   type: {type: String, required: true}
    }, {timestamps: true});

module.exports = mongoose.model('ReactG', ReactG);