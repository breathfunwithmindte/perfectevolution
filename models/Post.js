const mongoose = require('mongoose');
const Post = require('./Post');

const PostSchema = new mongoose.Schema({
   Title: {type: String, required: true, maxlength: 192, minlength: 3},
   Post: {type: String, required: true},
   Image: {type: String},
   auth: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
   like: [ 
         {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true}
   ],
   dislike: [
         {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true} 
   ]
    }, {timestamps: true});

module.exports = mongoose.model('Post', PostSchema);