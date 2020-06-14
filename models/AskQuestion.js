const mongoose = require('mongoose');


const AskQuestionSchema = new mongoose.Schema({
   auth: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
   question: {type: String, required: true},
   Answers: [
       {type: String}
   ]
    }, {timestamps: true});

module.exports = mongoose.model('AskQuestion', AskQuestionSchema);