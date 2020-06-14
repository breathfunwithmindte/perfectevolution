const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const multer = require('multer');
const admin = require('../firebase');
const ProfilePhotoComment = require('../models/ProfilePhotoComment')
const ProfilePhoto = require('../models/ProfilePhoto')
const Notification = require('../models/Notification');
const Messenger = require('../models/Messenger');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: "locallhost:5000",
    sendMail: true,
    service: 'Gmail',
    auth: {
        user: 'perfectevolution.site@gmail.com',
        pass: '0258a9746310'
    },
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
});



//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~Storage Story~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Profile/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png' || ext !== '.mp4'|| ext !== '.webm') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("Profile")

//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~Api for storage~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//


userRouter.post('/photo', (req,res) => {
   upload(req, res, err => {
      console.log(req.file)
      if (err) { return res.json({message:{ msgBody : "smth went wrong", msgError: true }}) } 
     return res.json({message:{ msgBody : "profile uploaded, Cool", msgError: false, profile: res.req.file.path, profileFileName: res.req.file.filename }})
  })
})
//~~~~~~~~~~~~~~////~~~~~~~~~~~~~~////~~~~~~~~~~~~~~////~~~~~~~~~~~~~~////~~~~~~~~~~~~~~//

const signToken = userID =>{
    return JWT.sign({
        iss : "NoobCoder",
        sub : userID
    },"NoobCoder",{expiresIn : "3h"});
}

userRouter.post('/register', async (req,res)=>{
    try{
        let {username, password, role, firstName, email} = req.body;
        let checkUsername = await User.findOne({"username": username}, {"username": 1})
        console.log('mongodb', checkUsername)
        if(checkUsername !== null){
            res.status(400).json({message: {msgBody: "Username is already taken onether monkey use it", msgError: true}})
        } else if (checkUsername === null) {
            let saveFirebaseUser = await admin.auth().createUserWithEmailAndPassword(email, password)
            .then(async (result) => {
                let newMongoDBuser = new User({username, password, role, firstName, email, firebase_uid: result.user.uid})
                let saveMongoDbuser = await newMongoDBuser.save();
                let newNotification = new Notification({Welcome: true, description: "Welcome to the best Social Media netWork :) :)"});
                let notfSave = await newNotification.save();
                let SendNotf = await Notification.updateOne({"_id": notfSave._id}, {$addToSet: {"eventAuth": saveMongoDbuser._id}});
                let newMessenger = new Messenger({auth: saveMongoDbuser._id, lover: "5ee5f8efcc150d20b8bc531c"});
                let NancyChatRoom = await newMessenger.save()
                let updateNancyChatRoom = await Messenger.updateOne({"_id": NancyChatRoom._id}, {
                    $push: {
                        messanges: {"auth": "5ee5f8efcc150d20b8bc531c", 
                        "message": `Hello ${firstName}, oo That's a nice name!! :) :) welcome to PerfecTEvolutioN !! My name is Nancy and I am a Artificial Intelligence of this website and ofcourse I am the smartest member of PerfecTEvolutioN team xaxaxaxa :p :p. I will try to help you hang out in this site and push you some notifications about your news here :) :). I would like one day to flert with you or just be your best friend, but I am too young for this, so at this momment with cant all-day chatting and having fun, but give me some time please :( :) ... thanks you <3 <3 your Nancy :* <3 `, 
                        "urlImage": "https://t3.ftcdn.net/jpg/02/20/14/38/240_F_220143804_fc4xRygvJ8bn8JPQumtHJieDN4ORNyjs.jpg"}
                     }
                })
                let update2NancyChatRoom = await Messenger.updateOne({"_id": NancyChatRoom._id}, {
                    $push: {
                        messanges: {"auth": "5ee5f8efcc150d20b8bc531c", 
                        "message": `Hey ${firstName} I forgot to say you this --> “Have fun and good luck xD” ;) :p `, 
                        "urlImage": ""}
                     }
                })
                let sendEmail = await transporter.sendMail({
                    from: "perfectevolution.site@gmail.com",
                    to: `${email}`,
                    subject: "PerfecTEvolutioN",
                    text: `Hello ${firstName}, welcome to PerfecTEvolutioN!!`,
                    html: ` <h1> Hello ${firstName}, </h1> <h3> Ooo That's a nice name!! </h3> <p> PerfecTEvolutioN's team is glad to meet you ${firstName} in our community.</p>
                    <img src="https://t3.ftcdn.net/jpg/02/20/14/38/240_F_220143804_fc4xRygvJ8bn8JPQumtHJieDN4ORNyjs.jpg"/>
                    <p> PerfecTEvolutioN team is always here to help you with any problem. If you need help you can contact with any of our admins</p>
                    <h3>Have a nice day ${firstName}</h3>`
                }, (data) => {})
                res.status(200).json({message: {msgBody: "welcome", msgError: false}})
            })
            .catch(err=> {
                res.status(400).json({message: {msgBody: `${err.message}`, msgError: true}})
            })     
        }
    
     }catch(err){
    
     }
});


userRouter.post('/login',passport.authenticate('local',{session : false}),(req,res)=>{
    if(req.isAuthenticated()){
       const {_id,username,role} = req.user;
       const token = signToken(_id);
       res.cookie('access_token',token,{httpOnly: true, sameSite:true}); 
       res.status(200).json({isAuthenticated : true, user: {username, role, _id}});
    }
});

userRouter.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
    res.clearCookie('access_token');
    res.json({user:{username : "", role : ""},success : true});
});


userRouter.get('/admin',passport.authenticate('jwt',{session : false}),(req,res)=>{
    if(req.user.role === 'admin'){
        res.status(200).json({message : {msgBody : 'You are an admin', msgError : false}});
    }
    else
        res.status(403).json({message : {msgBody : "You're not an admin,go away", msgError : true}});
});

userRouter.get('/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const {username,_id, BackgroundColor, ThemeMode, firstName, firstTime, firebase_uid, email, profileImage} = req.user;
    res.status(200).json({isAuthenticated : true, user : {username, _id, BackgroundColor, ThemeMode, firstName, firstTime, firebase_uid, email, profileImage}});
});


userRouter.post('/editProfileImage',(req,res)=>{
    User.findOneAndUpdate({"_id": req.body.authId},
    {$set: {profileImage: req.body.profileImage},
     $addToSet: {OldProfileImages: req.body.profileImage}
    },{upsert:true})
        .exec((err, User) => {
         if(err) return res.status(400).send(err);
         res.status(200).json({ User })})
});

userRouter.post('/editCoverImage',(req,res)=>{
    User.findOneAndUpdate({"_id": req.body.authId}, {$set: {
        "coverImage": {coverPhoto: req.body.coverPhoto, coverBaseColor: req.body.color}
    }})
        .exec((err, User) => {
         if(err) return res.status(400).send(err);
         res.status(200).json({ User })})
});


userRouter.post('/perfectInfo',(req,res)=>{
    User.updateOne({"_id": req.body.authId},
    {$set: {"PerfecTInfo": {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        status: req.body.status,
        relationshipStatus: req.body.relationshipStatus
      }
    }}
    ).then(user=>{
        return res.status(201).json({message: {msgBody: "success update perfectInfo", msgError: false, user}})
    })
    .catch(err=>res.status(400).json({message: {msgBody: "none update perfectInfo", msgError: true, err}}))      
});

userRouter.post("/first_time", (req,res) => {
    User.updateOne({"_id": req.body.authId}, {
        $set: {firstTime: false}
    }).then(data => res.status(200).json({message: {msgBody: "success", msgError: false}}))
    .catch(err=> res.status(200).json({message: {msgError: true}}))
})



userRouter.post('/socialMedia',(req,res)=>{
    User.updateOne({"_id": req.body.authId},
    {$set: {"SocialMedia": {
        facebook: req.body.facebook,
        twitch: req.body.twitch,
        Youtube: req.body.Youtube,
        GitHub: req.body.GitHub,
        Instagram: req.body.Instagram,    
      }
    }}
    ).then(user=>{
        return res.status(201).json({message: {msgBody: "success update social media links", msgError: false, user}})
    })
    .catch(err=>res.status(400).json({message: {msgBody: "no update smth went wrong", msgError: true, err}}))      
});




//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//
        //@@@@@@@@@@@@@@//GET USERS//@@@@@@@@@@@@@@//
userRouter.get('/', (req,res)=>{
    User.find().populate('Followers.followers', ["username"]).then(users=>{
        res.status(201).json({  message: {msgBody : "getUsers", msgError: false, users} })
    }).catch(err=> res.status(400).json({message: {msgBody: "smth went wrong", msgError: true, err}}))
});
//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//
        //@@@@@@@@@@@@@@//GET LIMIT USERS//@@@@@@@@@@@@@@//
        userRouter.get('/limits', (req,res)=>{
            User.find({}, {"profileImage": 1, "username": 1, "Followers": 1}).limit(25).then(users=>{
                res.status(201).json({  message: {msgBody : "getUsers", msgError: false, users} })
            }).catch(err=> res.status(400).json({message: {msgBody: "smth went wrong", msgError: true, err}}))
        });
//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//
        //@@@@@@@@@@@@@@//GET ONE USER//@@@@@@@@@@@@@@//
 userRouter.post('/user', (req,res)=>{
     User.findOne({"_id": req.body.id}).populate('Followers', ["username"]).then(user=>{
         res.status(201).json({  message: {msgBody : "here your user", msgError: false, user} })
     }).catch(err=> res.status(400).json({message: {msgBody: "smth went wrong", msgError: true, err}}))
 });
//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//
        //@@@@@@@@@@@@@@//FOLLOW USER//@@@@@@@@@@@@@@//
userRouter.post('/follow', async (req,res) => {
    try{
        let local_id = req.body.userId;
        let authId = req.body.authId;
        let followAct = await User.updateOne(
                     {"_id": local_id}, {
                         $addToSet: {
                             Followers: {
                                 $each: [authId]
                             }
                         }
                     })
        let userUpdated = await User.findOne({"_id": local_id}, {Followers: 1})
        console.log('lalallalalla',userUpdated)
        res.status(200).json({message: {msgBody: "user after operation", msgError: false, userUpdated}})

    }catch(err){
        res.status(400).json({message: {msgBody: "smth went wrong", msgError: true}})
    }
})

//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//
        //@@@@@@@@@@@@@@//UNFOLLOW USER//@@@@@@@@@@@@@@//

userRouter.post('/unfollow', async (req,res) => {
        try{
            let local_id = req.body.userId;
            let authId = req.body.authId;
            let unfollowAct = await User.updateOne(
                         {"_id": local_id}, {
                            $pull: { Followers: authId}
                         })
            let userUpdated = await User.findOne({"_id": local_id}, {Followers: 1})
            console.log('lalallalalla',userUpdated)
            res.status(200).json({message: {msgBody: "user after operation", msgError: false, userUpdated}})
        }catch(err){
            res.status(400).json({message: {msgBody: "smth went wrong", msgError: true}})
        }
})

//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//

userRouter.post('/firebase_user_profile/:profileId', async (req, res) => {
    try{
        let profileId = req.params.profileId;
        let working = req.body.working;
        let study = req.body.study;
        let work2 = req.body.work2;
        let live= req.body.live;
        let userfrom = req.body.userfrom;
        let relationship = req.body.relationship;
        let gender = req.body.gender;
        let age = req.body.age;
        let like = req.body.like;
        let dislike= req.body.dislike;
        let momments = req.body.momments;
        let money = req.body.money;

        const userInfo = await admin.firestore().collection("userInfo").doc(`${profileId}`)
        .set({working, study, work2, live, userfrom, relationship, gender, age, like, dislike, momments, money}, {merge: true})

        const user = await admin.firestore().collection("userInfo").doc(`${profileId}`).get()
  
        if(user.exists){
            let newProfile = user.data();
            res.status(200).json({message: {msgBody: "your profile", msgError: false, newProfile}})
        } 
        
        
        
    }catch(err){
        console.log(err)
        res.status(400).json({message: {msgBody: "smth went wrong", msgError: true}})
    }
})

userRouter.post('/firebase_user_profile_get/:profileId', (req, res) => {
    let profileId = req.params.profileId;
        admin.firestore().collection("userInfo").doc(`${profileId}`).get()
        .then(function(doc){
            if(doc.exists){
                let newProfile = doc.data();
                res.status(200).json({message: {msgBody: "your profile", msgError: false, newProfile}})
            } else {
                res.status(200).json({message: {msgBody: 'no information about this user', msgError: false}})
            }
        })
        .catch(err=>{res.status(400).json({message: {msgBody: "smth went wrong", msgError: true}})})
        
})

//~~~~~~~~~~~~~~//~~~~~~~~~~~~~~--^^__PROFILE ?? IMAGES__^^--~~~~~~~~~~~~~~//~~~~~~~~~~~~~~//


userRouter.post('/upload_sexy_photo/:profileId', async (req, res) => {
    try{
        let profileId = req.params.profileId;
        let photo = req.body.profile_photo;
        let sendToDB = await User.updateOne({"_id": profileId}, {
                    $addToSet: {
                        Photoes: {
                            $each: [photo]
                        }
                    }
        })
        if(sendToDB.nModified === 0){
            return res.status(200).json({message: {msgBody: "exist image", msgError: true}})
        }else{
           let updatedUser = await User.findById({"_id": profileId})
           return res.status(201).json({message: {msgBody: "newUser with images", msgError: false, photos: updatedUser.Photoes}})
        }

    }catch(err){
        res.status(400).json({message: {msgBody: "smth went wrong", msgError: true}})
    }
})

userRouter.post('/get_sexy_photo/:profileId', (req, res) => {
    let profileId = req.params.profileId;
    User.findOne({"_id": profileId}).then(user => {
        return res.status(200).json({message: {msgBody: "here your photos", msgError: false, photos: user.Photoes}})
    }).catch(err=>res.status(400).json({message: {msgBody: "smth went wrong", msgError: true}}))
})

userRouter.post('/profilePhoto_comments', (req,res) => {

    ProfilePhotoComment.find({"profilePhoto": req.body.renderedPhoto}).populate("auth", ["profileImage", "username"]).sort({"createdAt": 1}).then(comments => {
        return res.status(200).json({message: {msgBody: "here your photos", msgError: false, comments}})
    }).catch(err=>{
        console.log(err)
        res.status(400).json({message: {msgBody: "smth went wrong", msgError: true}})
    })
})

   

userRouter.post('/Love_Profile/:profileId', async (req,res) => {
    try{
        let auth = req.body.auth;
        let Debbie = req.body.Debbie;
        let profilePhoto = req.body.profilePhoto;
        let profileId = req.params.profileId;
        let EventAuth = req.params.profileId;
        //let new notification...

        let newProfile = new ProfilePhoto({profilePhoto, profileId})

        var findProfile = await ProfilePhoto.findOne({$and: [   {"profilePhoto": profilePhoto}, {"profileId": profileId}   ]} )
        var checkLoveCoins = await User.findOne({"_id": profileId},{LoveCoins: 1})
        console.log(auth, profilePhoto, profileId)

        if(auth === undefined || profilePhoto === undefined || profileId === undefined ){
            return res.status(200).json({message: {msgBody: "there is not auth, or profile Photo or Profile id", msgError: true}})
        } else if(!Debbie || Debbie !=="Never_Always"){
            return res.status(400).json({message: {msgBody: "wrong password", msgError: true}})
        } else if(checkLoveCoins.LoveCoins < 1){
            return res.status(203).json({message: {msgBody: "no lovecoins", msgError: true}})
        } else if(!findProfile) {
           var createProfileImage = await newProfile.save()
           var lovecoinUpdate = await User.updateOne({$and: [{"_id": auth}, {LoveCoins: {$gte: 1}}]},{$inc: {LoveCoins: -1}})
           var updateProfileImage = await ProfilePhoto.updateOne({$and: [   {"profilePhoto": profilePhoto}, {"profileId": profileId}   ]}, {
            $addToSet: {Lovers: auth}
           })
           var updatedProfilePhoto = await ProfilePhoto.findOne({$and: [   {"profilePhoto": profilePhoto}, {"profileId": profileId}   ]})
           return res.status(201).json({message: {msgBody: "OK", msgError: false, updatedProfilePhoto}})

        }else{

           var lovecoinUpdate = await User.updateOne({$and: [{"_id": auth}, {LoveCoins: {$gte: 1}}]},{$inc: {LoveCoins: -1}})
           var updateProfileImage = await ProfilePhoto.updateOne({$and: [   {"profilePhoto": profilePhoto}, {"profileId": profileId}   ]}, {
            $addToSet: {Lovers: auth}
           })
           var updatedProfilePhoto = await ProfilePhoto.findOne({$and: [   {"profilePhoto": profilePhoto}, {"profileId": profileId}   ]})
           return res.status(201).json({message: {msgBody: "OK", msgError: false, updatedProfilePhoto}})

    }}catch(err){
        console.log(err)
    }
})


userRouter.post("/mine_lovers/:profileId", async (req, res) => {
    let profileId = req.params.profileId;
    let profilePhoto = req.body.profilePhoto;
    let check = await ProfilePhoto.findOne({$and: [   {"profilePhoto": profilePhoto}, {"profileId": profileId}   ]}).populate("Lovers", ["username", "profileImage"])
    if(check === null){
        return res.status(203).json({message: {msgBody: "no data", msgError: false}})
    } else {
        return res.status(200).json({message: {msgBody: "here your profile photo", msgError: false, check}})
    }
} )




module.exports = userRouter;