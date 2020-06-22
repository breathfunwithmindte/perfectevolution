const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const multer = require('multer');
const admin = require('../firebase');
const Profile = require("../models/Profile");

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

userRouter.get('/nana', (req,res)=> {
    res.send("nana")
})



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
                try{
                let newMongoDBuser = new User({username, password, role, firstName, email, firebase_uid: result.user.uid})
                let saveMongoDbuser = await newMongoDBuser.save();
                let newProfile = await Profile({user: saveMongoDbuser._id, username: saveMongoDbuser.username});
                let saveProfileUser = await newProfile.save()
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
            }catch(err){
                res.status(400).json({message: { msgBody: `${err.message}`, msgError: true}})
            }
            })
            .catch(err=> {
                console.log(err)
                res.status(400).json({message: {msgBody: `${err.message}`, msgError: true}})
            })     
        }
    
     }catch(err){
        console.log(err)
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
    const {username,_id, firstName, firstTime, firebase_uid, email, profileImage, profile} = req.user;
    res.status(200).json({isAuthenticated : true, user : {username, _id, firstName, firstTime, firebase_uid, email, profileImage, profile}});
});




module.exports = userRouter;