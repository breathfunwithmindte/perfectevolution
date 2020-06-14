const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 16
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 23
    },
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 16
    },
    email: {type: String, required: true},
    
    firebase_uid: {type: String, required: true},

    firstTime: {type: Boolean, required: true, default: true},

    LoveCoins: {type: Number, required: true, default: 1},

    Online: {type: Boolean, default: false},

    BackgroundColor: {type: String, required: true, default: '#141414'},
    ThemeMode: {type: String, required: true, enum: ["dark", "light"], default: "dark"},

    PerfecTInfo: {
        firstname: {type: String, required: true, default: "BEST NAME"},
        age: {type: Number, required: true, default: 18},
        lastname: {type: String, required: true, default: "BEST LASTNAME"},
        status: {type: String, required: true, default: "status none"},
        relationshipStatus: {type: String, required: true, enum: ["single", "in relationship", "married", "who Knows"], default: "who Knows"}
    },
    GameInfo: {
        Gamer: {type: Boolean, required: true, default: false},
        LeagueOfLegendsPlayer: {type: Boolean, required: true, default: false},
        Division: {type: String, required: true, default: "No division"},
        MainChampion: {type: String, required: true, default: "No information"}
    },
    role: {type: String,enum: ['user', 'admin'], default: 'user'},
    profileImage: {
        type: String,
        required: true,
        default: 'https://res.cloudinary.com/perfectevolution/image/upload/v1591579026/Default%20photoes/mpwnp3dco9kswjxfzaxp.jpg'
    },
    OldProfileImages: [{type: String}],
    coverImage: {
        coverPhoto: {type: String, required: true, default: "https://res.cloudinary.com/perfectevolution/image/upload/v1591579054/Default%20photoes/pq4xppdcrsjggq3eztj3.jpg"},
        coverBaseColor: {type: Array, required: true, default: ["none"]}
    },
    SocialMedia: {
        facebook: {type: String, required: false},
        twitch: {type: String, required: false},
        GitHub: {type: String, required: false},
        Youtube: {type: String, required: false},
        Instagram: {type: String, required: false}
    },
    Followers: [
        {
         type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true
        }
    ],
    Photoes: [
        {
            type: String
        }
    ]
})

UserSchema.pre('save', function(next){
    if(!this.isModified('password')) return next();
    bcrypt.hash(this.password,10, (err, passwordHash)=>{
        if(err)return next(err);
        this.password = passwordHash;
        next();
    })
})

UserSchema.methods.comparePassword = function(password, cd){
    bcrypt.compare(password, this.password,(err, isMatch) => {
        if(err) return cd(err);
        else{
            if(!isMatch) return cd(null, isMatch);
            return cd(null, this);
        }
    })
}

module.exports = mongoose.model('users', UserSchema);