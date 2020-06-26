const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const MessegesSchema = new mongoose.Schema({
    type: {type: String, enum: ["justmsg", "postCard", "notificationMsg"], required: true, default: "justmsg"},
    message: {type: String, required: true, maxlength: 392},
    auth: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    backgroundColor: {type: String, required: true, default: ""},
    seen: {type: Boolean, required: true, default: false},
    // !~~~ => postCard details <= ~~~! //
    image: {type: String, required: false},
    title: {type: String, maxlength: 92, minlength: 3, required: false},
    postCardBackGroundColor: {type: String, required:false},
    // !``notifications``! //
    notification: {type: String, required: false},
    whenIThappened: {type: Date, required: false}
}, {timestamps: true})

const MessengerSchema = new mongoose.Schema({
    type: {type: String, enum: ["youmi", "group", "trio", "mySelf"], required: true, default: "youmi"},
    users: [
       {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true}
    ],
    messengerKEY: {type: String, required: true},
    adminUser: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: false} ,
    title: {type: String, required: false},
    messages: [MessegesSchema]
    
})

module.exports = mongoose.model('messengers', MessengerSchema);