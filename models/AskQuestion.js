const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const AskQuestionSchema = new mongoose.Schema({
   content: {type: String, required: true, maxlength: 69690},
   auth: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
}, {timestamps: true})

module.exports = mongoose.model('AskQuestions', AskQuestionSchema);