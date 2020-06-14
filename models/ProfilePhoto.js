const mongoose = require('mongoose');


const ProfilePhotoSchema = new mongoose.Schema({

    profilePhoto: {type: String, required: true},
    profileId: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    Lovers: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true}
    ]  
   }, {timestamps: true});

module.exports = mongoose.model('ProfilePhoto', ProfilePhotoSchema);