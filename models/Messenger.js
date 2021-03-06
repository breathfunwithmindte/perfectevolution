const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const MessegesSchema = new mongoose.Schema({
    type: {type: String, enum: ["justmsg", "postCard", "gift", "surprise"], required: true, default: "justmsg"},
    message: {type: String, required: true, maxlength: 192},
    image: {type: String, required: false},
    auth: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true}
}, {timestamps: true})

const MessengerSchema = new mongoose.Schema({
    type: {type: String, enum: ["youmi", "group"], required: true, default: "youmi"},
    users: [
       {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true}
    ],
    adminUser: [
        {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true}
    ],
    messagesColor: {type: String, required: false},
    messages: [MessegesSchema]
    
})

module.exports = mongoose.model('messengers', MessengerSchema);