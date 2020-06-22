const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const MessegesSchema = new mongoose.Schema({
    messageContent: {type: String, required: true, maxlength: 192},
    auth: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true}
}, {timestamps: true})

const MessengerSchema2_0 = new mongoose.Schema({
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

module.exports = mongoose.model('messengers2_0', MessengerSchema2_0);