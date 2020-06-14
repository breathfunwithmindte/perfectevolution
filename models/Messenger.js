const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({
   message: { type: String, maxlength: 369},
   auth: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
   urlImage: { type: String, maxlength: 3240 },
   diabastike: {type: Boolean, enum: ["false", "true"], default: "false"}

}, {timestamps: true})

const MessengerSchema = new mongoose.Schema({

   auth: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},

   lover: { type: mongoose.Schema.Types.ObjectId, ref: 'users'},

   Group: {type: Boolean, enum: [false, true], default: false},

   creator: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},

   users: [
      {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true}
   ],

   messanges: [MessagesSchema]
   });

module.exports = mongoose.model('Messenger', MessengerSchema);