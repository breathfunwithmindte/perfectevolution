const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const BodyParser = require('body-parser');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 5000;

//~~~~~~~~~~~~~~//||   "SOME APP.USE"   ||//~~~~~~~~~~~~~~//

app.use(    cookieParser()  );

app.use(BodyParser.json({limit:'50mb'}));
app.use(BodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true 
}));

//~~~~~~~~~~~~~~//||   "PUBLISH FILES"   ||//~~~~~~~~~~~~~~//

app.use('/PublicFILES', express.static('PublicFILES'));

//~~~~~~~~~~~~~~//||   "MONGODB CONNECTION"   ||//~~~~~~~~~~~~~~//
mongoose
    .connect(process.env.MONGODB_URI || "mongodb+srv://mike:02580258@perfectevolution.4kg6e.mongodb.net/PERFECTEVOLUTION", { useNewUrlParser: true, useUnifiedTopology: true})
    .catch(e =>{
        console.log('Connection error', e.message)
    });
const db = mongoose.connection;
db.once('open',()=>{
    console.log("MongoDB database connection established successfully");
})

//~~~~~~~~~~~~~~//||   "ROUTES AND MODELS"   ||//~~~~~~~~~~~~~~//

const userRouter = require('./routes/User');
app.use('/User', userRouter);

const User = require("./models/User")
const Post = require("./models/Post");
const LikesP = require('./models/LikeDisP');
const Profile = require("./models/Profile");
const CommentsPost = require("./models/CommentsPost");

//~~~~~~~~~~~~~~//||   "SOCKET.IO"   ||//~~~~~~~~~~~~~~//

io.on('connection', (socket)=>{

     console.log('^__^ => CONNECTED TO SERVER CLIENT ===', socket.id);
     io.to(socket.id).emit("initialization", {socketID: socket.id})

                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~//||   "Αγάπα με όταν δεν το αξίζω, σκουπίδι"   ||//~~~~~~~~~~~~~~//
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//

//-~-~-~-~-~-~-~-~-~-~-~-~-~-~-USER THEME FOR CONTEXT-~-~-~-~-~-~-~-~-~-~-~-~-~-~-//

    socket.on("theme", ({authID}) => {
        User.findOne({"_id": authID}, {"ThemeMode": 1}).then(user => {
            socket.emit("theme_response", {userTheme: user.ThemeMode})
        })
    })

    socket.on("changeTheme", async ({authID, theme}) => {
        try{
         let updateOperation = await User.updateOne({"_id": authID}, {$set : {ThemeMode: theme}});
         socket.emit("AnswerTheme", {error: undefined})
        }catch(err){
            socket.emit("AnswerTheme", {error: "smth went wrong"})
        }
    })


//-~-~-~-~-~-~-~-~-~-~-~-~-~-~-POSTS PLACE-~-~-~-~-~-~-~-~-~-~-~-~-~-~-//
    socket.on("create_Post", async ({content, authID, limit, profile}) => {
        try{
         const newPost = new Post({content, auth: authID, authProfile: profile});
         let savePost = await newPost.save();
         let getAgainAll = await Post.find({})
         .sort({"_id": -1})
         .limit(limit)
         .populate("auth", ["username", "profileImage"])
         .populate("Love", ["username", "profileImage"])
         .populate("authProfile", ["username"])
         socket.emit("ServerAnswer", {error: undefined});
         socket.emit("Posts", {posts: getAgainAll})
        }catch(err){
            socket.emit("ServerAnswer", {error: "smth went wrong"})
            console.log(err)
        }
    })

    socket.on("get_Posts", async ({}) => {
        try{
            let posts = await Post.find({})
            .limit()
            .sort({"_id": -1})
            .populate("auth", ["username", "profileImage"])
            .populate("Love", ["username", "profileImage"])
            .populate("authProfile", ["username"])
            socket.emit("Posts", {posts, error: undefined});
        }catch(err){
            socket.emit("Posts", {error: err})
            //console.log(err)
        }
    })

    socket.on("love_post", async ({postID, authID}) => {
        try{
            let updateOperation = await Post.updateOne({"_id": postID}, {
                $addToSet: {Love: authID}
            })
            let getPostsAgain = await Post.find({})
            .limit()
            .sort({"_id": -1})
            .populate("auth", ["username", "profileImage"])
            .populate("Love", ["username", "profileImage"])
            .populate("authProfile", ["username"])
            socket.emit("Posts", {posts: getPostsAgain, error: undefined});
        }catch(err){
            socket.emit("Posts", {error: err})
            //console.log(err)
        }
    })

    socket.on("create_like", async({postID, Writter, type, authID, profile}) => {
        try{
            let like = new LikesP({auth: authID, post: postID, type, authProfile: profile});
            let SaveOperation = await like.save();
            let FindAgain = await LikesP.findOne({"post": postID, "auth": authID});
            socket.emit(`LikesP_${postID}`, {data: FindAgain});

        }catch(err) {
            socket.emit("Posts", {error: err})
            //console.log(err)
        }
    })

    socket.on("opdateLikeP", async ({postID, Writter, type, authID}) => {
        try{
            let opdateOperation = await LikesP.updateOne({"post": postID, "auth": authID}, {
                $set: {type: type}
            })
            let FindAgain = await LikesP.findOne({"post": postID, "auth": authID});
            socket.emit(`LikesP_${postID}`, {data: FindAgain});
        }catch(err){
            socket.emit("Posts", {error: err})
            //console.log(err)
        }
    })

    socket.on("getlikesP", async ({postID, Writter, authID}) => {
                console.log(postID)
        try{
            let findOperation = await LikesP.findOne({"post": postID, "auth": authID});
            socket.emit(`LikesP_${postID}`, {data: findOperation})
        }catch(err){
            socket.emit("Posts", {error: err})
            //console.log(err)
        }
    })

    socket.on("single_post", async ({id}) => {
        try{
            let getPost = await Post.findOne({"_id": id}).populate("auth", ["firstname", "profileImage"]).populate("Love", ["firstname", "profileImage"])
            socket.emit("get_signlePost", {post: getPost});
        }catch(err){
            socket.emit("Posts", {error: err})
            //console.log(err)
        }
    })

    socket.on("create_commentP", async ({postID, authID, profile, content, Writter}) => {
        try{
            let newComment = new CommentsPost({post: postID, auth: authID, authProfile: profile, content, writter: Writter});
            let createComment = await newComment.save();
            let find_again_comments = await CommentsPost.find({"post": postID});
            socket.emit(`all_commentsPost_for_${postID}`, {commentSERVER: find_again_comments, error: "no error"});

        }catch(err){
            console.log(err)
            socket.emit(`all_commentsPost_for_${postID}`, {error: "smth went wrong"})
        }
    })

    socket.on("getComments", async ({postID}) => {
        try{
            let findComments_operation = await CommentsPost.find({"post": postID});
            socket.emit(`all_commentsPost_for_${postID}`, {commentSERVER: findComments_operation, error: "no error"})
        }catch(err){
            console.log(err);
            socket.emit(`all_commentsPost_for_${postID}`, {error: "smth went wrong"})
        }
    })



   

//-~-~-~-~-~-~-~-~-~-~-~-~-~-~-PROFILE USER-~-~-~-~-~-~-~-~-~-~-~-~-~-~-//

    socket.on("profile_master", async ({username}) => {
        try{
            let profileServ = await Profile.findOne({"username": username});
            socket.emit(`profile_response_${username}`, {profileServ})
        }catch(err){
            socket.emit(`profile_response_${username}`, {error: "smth went wrong"})
        }
    })

    socket.on("get_profile_byID", async ({profileID, userID}) => {
        try{
            let profile_with_id = await Profile.findOne({"_id": profileID});
            socket.emit(`profile_response_forUser_${userID}`, {profile: profile_with_id})
        }catch(err){
            socket.emit(`profile_response_forUser_${userID}`, {error: "smth went wrong"})
        }
    })


    socket.on('disconnect', ()=>{
        console.log('__ ... ___ CLIENT DISCONECTED FROM SERVER', socket.id);
    })

 })

 //~~~~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~~~~//


server.listen(PORT, ()=>console.log(`server started wow xD at == ${PORT}`)) 