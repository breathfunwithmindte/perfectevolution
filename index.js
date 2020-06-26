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

//Messenger//

const Messenger = require("./models/Messenger")

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

//-~-~-~-~-~-~-~-~-~-~-~-~-~-~-USER CHATROOMS FOR CONTEXT-~-~-~-~-~-~-~-~-~-~-~-~-~-~-//

    socket.on("mychatrooms", async ({authID}) => {
        try{
            let findUser_messengers = await User.findOne({"_id": authID}, {"messenger": 1})
            let chatrooms = await Messenger.find({"messengerKEY": findUser_messengers.messenger}).populate("users", ["profileImage", "username", "firstName"])
            socket.emit(`chatrooms_${authID}`, {chatrooms})
        }catch(err){
            console.log(err)
        }
    })

                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~//||     "Ώστε Έτσι?? Τώρα θά'θελες !!"         ||//~~~~~~~~~~~~~~//
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//

    socket.on("initial_ChatRoom", async ({userID, authID, authUsername, userUsername}) => {
        try{
            //newChatRoom schema === here  ^^__^^
            let check_IF_chatroom_exist = await Messenger.findOne({ $or: [ {"messengerKEY": [authUsername, userUsername].join("")}, {"messengerKEY": [userUsername, authUsername].join("")} ] });
            console.log(check_IF_chatroom_exist)
            if(check_IF_chatroom_exist === null) {
                console.log("not exist")
            let newChatRoom = new Messenger({users: [userID, authID], adminUser: authID, title: [userID, authID].join("") , messengerKEY: [authUsername, userUsername].join("") });
            //chatRoom SAVE === here ^^__^^
            let create__ChatRoom = await newChatRoom.save();

            //users updates === here ^^__^^
            let updateUserMessenger = await User.updateOne({"_id": userID}, {$addToSet: {"messenger": [authUsername, userUsername].join("")}});
            let updateAuthMessenger = await User.updateOne({"_id": authID}, {$addToSet: {"messenger": [authUsername, userUsername].join("")}});

            //find new user to send for MESSENGER CONTEXT === here ^^__^^
            let findAuth_messengers = await User.findOne({"_id": authID}, {"messenger": 1});
            let findUser_messengers = await User.findOne({"_id": userID}, {"messenger": 1});   
            
            //send smth for update AUTH CONTEXT === here ^^__^^

            socket.emit(`update_AUTH_Context_${authID}`, {smth: true})

            //find new user to send for MESSENGER CONTEXT === here ^^__^^
            let authChatrooms = await Messenger.find({"key": findAuth_messengers.messenger}).populate("users", ["profileImage", "username", "firstName"]);
            let userChatRooms = await Messenger.find({"key": findUser_messengers.messenger}).populate("users", ["profileImage", "username", "firstName"]);

            //send found messenger to CONTEXT === here ^^__^^
            socket.emit(`chatrooms_${authID}`, {chatrooms: authChatrooms});
            socket.broadcast.emit(`chatrooms_${userID}`, {chatrooms: userChatRooms})
            socket.emit(`initial_ChatRoom_Response`, {error: "noError", chatRoomkey: create__ChatRoom.messengerKEY})
            } else {
                console.log("exist", check_IF_chatroom_exist)
                socket.emit(`initial_ChatRoom_Response`, {error: "noError", chatRoomkey: check_IF_chatroom_exist.messengerKEY})
            }
        }catch(err){
            socket.emit(`initial_ChatRoom_Response`, {error: err})
        }
    })

    socket.on("getChatRoom",  ({messengerKEY}) => {
      Messenger.findOne({"messengerKEY": messengerKEY}).populate("users", ["profileImage", "username", "firstName"])
      .then(data => socket.emit(`chatroom_${messengerKEY}`, {data})).catch(err=>console.log(err))
    })

    socket.on("send_message", async ({messengerKEY, newmsg, authID}) => {
        try{
            let pushMessengerToDatabase = await Messenger.updateOne({"messengerKEY": messengerKEY}, {$push: {
                "messages": {message: newmsg, auth: authID}
            }});
            let updatedMessenger = await Messenger.findOne({"messengerKEY": messengerKEY}).populate("users", ["profileImage", "username", "firstName"]);
            socket.emit(`chatroom_${messengerKEY}`, {data: updatedMessenger})
            socket.broadcast.emit(`chatroom_${messengerKEY}`, {data: updatedMessenger})
        }catch(err){
            console.log(err)
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
            //console.log(err)
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
            console.log(postID, Writter, type, authID, profile)
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
            let getPost = await Post.findOne({"_id": id}).populate("auth", ["username", "profileImage"]).populate("Love", ["username", "profileImage"])
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
            let find_again_comments = await CommentsPost.find({"post": postID})
            .populate("authProfile")
            .populate("auth", ["username", "profileImage"]);
            socket.emit(`all_commentsPost_for_${postID}`, {commentSERVER: find_again_comments, error: "no error"});

        }catch(err){
            console.log(err)
            socket.emit(`all_commentsPost_for_${postID}`, {error: "smth went wrong"})
        }
    })

    socket.on("getComments", async ({postID}) => {
        try{
            let findComments_operation = await CommentsPost.find({"post": postID})
            .populate("authProfile")
            .populate("auth", ["username", "profileImage"]);
            socket.emit(`all_commentsPost_for_${postID}`, {commentSERVER: findComments_operation, error: "no error"})
        }catch(err){
            //console.log(err);
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


    //-~-~-~-~-~-~-~-~-~-~-~-~-~-~-PROFILE USER-~-~-~-~-~-~-~-~-~-~-~-~-~-~-//
        socket.on("getUsers_forPAGE", () => {
            User.find({}).then(users => {
                socket.emit("all_Users_PAGE", {users, err: "noError"})
            }).catch(err => {
                //console.log(err);
            })
        })
    //-~-~-~-~-~-~-~-~-~-~-~-~-~-~-UPADTE PROFILE-~-~-~-~-~-~-~-~-~-~-~-~-~-~-//
        socket.on("update_profilePhoto", async ({profileImage, authID, profile}) => {
            try{
            let updateOperation = await User.updateOne({"_id": authID}, {$set: {"profileImage": profileImage}});
            let updateProfileOeration = await Profile.updateOne({"_id": profile}, {
                $set: {"profileImage": profileImage},
                $addToSet: {"profileImages": profileImage}
            })
            let findUpdatedProfile = await Profile.findOne({"_id": profile});
            socket.emit(`profile_response_forUser_${authID}`, {profile: findUpdatedProfile})
            socket.broadcast.emit(`profile_response_forUser_${authID}`, {profile: findUpdatedProfile});
            socket.emit(`profile_response_${findUpdatedProfile.username}`, {profileServ: findUpdatedProfile});
            socket.broadcast.emit(`profile_response_${findUpdatedProfile.username}`, {profileServ: findUpdatedProfile});
        }catch(err){ console.log(err) }
        })

        socket.on("update_coverPhoto", async ({coverImage, profile}) => {
            try{
                let updateOperation = await Profile.updateOne({"_id": profile}, {$set: {"coverImage": coverImage}});
                let findUpdatedProfile = await Profile.findOne({"_id": profile});
                socket.emit(`profile_response_forUser_${authID}`, {profile: findUpdatedProfile})
                socket.broadcast.emit(`profile_response_forUser_${authID}`, {profile: findUpdatedProfile});
                socket.emit(`profile_response_${findUpdatedProfile.username}`, {profileServ: findUpdatedProfile});
                socket.broadcast.emit(`profile_response_${findUpdatedProfile.username}`, {profileServ: findUpdatedProfile});
            }catch(err){console.log(err)}
        })

        socket.on("update_profileStatus", async ({ profile, content }) =>{
            try{
                let updateOperation = await Profile.updateOne({"_id": profile._id}, {$set: {"statusContent": content}});
                let findUpdatedProfile = await Profile.findOne({"_id": profile._id});
                socket.emit(`profile_response_forUser_${profile.user}`, {profile: findUpdatedProfile})
                socket.broadcast.emit(`profile_response_forUser_${profile.user}`, {profile: findUpdatedProfile});
                socket.emit(`profile_response_${findUpdatedProfile.username}`, {profileServ: findUpdatedProfile});
                socket.broadcast.emit(`profile_response_${findUpdatedProfile.username}`, {profileServ: findUpdatedProfile});
            }catch(err){
                console.log(err)
            }
        })


    socket.on('disconnect', ()=>{
        console.log('__ ... ___ CLIENT DISCONECTED FROM SERVER', socket.id);
    })

 })

 //~~~~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~~~~//


server.listen(PORT, ()=>console.log(`server started wow xD at == ${PORT}`)) 