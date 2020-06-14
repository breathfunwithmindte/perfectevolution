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



app.use(    cookieParser()  );

app.use(BodyParser.json({limit:'50mb'}));
app.use(BodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true 
}));

app.use('/Public/Stories', express.static('Public/Stories'));
app.use('/Public/Selfie', express.static('Public/Selfie'));
app.use('/Public/Music', express.static('Public/Music'));
app.use('/Public/Profile', express.static('Public/Profile'));


mongoose
    .connect(process.env.MONGODB_URI || "mongodb+srv://mikeTE:02589746310@perfectevolutionapp-oascp.mongodb.net/PerfecTEvolutioN", { useNewUrlParser: true, useUnifiedTopology: true})
    .catch(e =>{
        console.log('Connection error', e.message)
    });

const db = mongoose.connection;

db.once('open',()=>{
    console.log("MongoDB database connection established successfully");
})

const userRouter = require('./routes/User');
app.use('/user', userRouter);

const StoriesRouter = require('./routes/Stories');
app.use('/Stories', StoriesRouter);

const SelfieRouter = require('./routes/Selfie');
app.use('/Selfie', SelfieRouter);

const PostRouter = require('./routes/Post');
app.use('/Post', PostRouter);

const MusicRouter = require('./routes/Music');
app.use('/Music', MusicRouter);

const girlRouter = require('./routes/Girls');
app.use('/Girl', girlRouter);

const MessengerNewRouter = require('./routes/MessengerNew');
app.use('/Messenger', MessengerNewRouter);

const NotificationRouter = require('./routes/Notification');
app.use('/ntfctn', NotificationRouter);

const RiotGamesRouter = require('./routes/RiotGames');
app.use('/Riot', RiotGamesRouter);

const ReactionRouter = require('./routes/Reactions');
app.use('/React', ReactionRouter);

const DeliveryRouter = require('./routes/Delivery');
app.use('/Delivery', DeliveryRouter)

app.use(express.static(path.join(__dirname, 'build')))
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
    ;
});

const CommentSelfie = require('./models/CommentSelfie')
const CommentSong = require('./models/CommentSong')
const CommentPost = require('./models/CommentPost')
const CommentGirl = require('./models/CommentGirl')
const Girls = require('./models/Girls')
const AskQuestion = require('./models/AskQuestion')
const Messenger = require('./models/Messenger')
const ProfilePhotoComment = require('./models/ProfilePhotoComment')
const Notification = require('./models/Notification')
const User = require('./models/User')
const Post = require('./models/Post');
const Stories = require('./models/Stories')


io.on('connection', (socket)=>{

     console.log('one new client connected to socket');

     socket.on("HeyDebbie", ({signalData, userToCall, chatroomID}) => {
        socket.broadcast.emit(`HeyMaster_${chatroomID}`, {signalData});
     })

     socket.on("call_accepted", ({signal, chatroomID}) => {
         socket.broadcast.emit(`call_accepted${chatroomID}`, {signal})
     })




                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~//||   "here is comments place for selfies"   ||//~~~~~~~~~~~~~~//
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//

    socket.on('comments_place_Selfie', async({image,comment,authId,selfieId,EventAuth}) => {
        try{
            let newComment = new CommentSelfie({image: image, comment: comment, selfieId: selfieId, auth: authId});
            let newNotification = new Notification({selfie: selfieId, comment: comment, description: "commented your Selfie", auth: authId})
            let commentsave = await newComment.save()
            let newcomments = await CommentSelfie.find({"selfieId": commentsave.selfieId}).populate("auth", ["profileImage", "username"]).sort({"createdAt": 1})
            let newNotf = await newNotification.save()
            let SendNotf = await Notification.updateOne({"_id": newNotf._id}, {
                $addToSet: {"eventAuth": EventAuth}
            })
                 socket.broadcast.emit( `${selfieId}`, {newcomments})
                 socket.emit(`${selfieId}`, {newcomments})
        }catch(err){
            console.log(err)
        }     
    })
    //~~~~~~~~~~~~~~//||   "CommentToComment"   ||//~~~~~~~~~~~~~~//

          socket.on('CommentToComment_selfie', async ({image,comment,authId,commentId,EventAuth}) => {
              try{
             let newNotification = new Notification({commentSelfie: commentId, comment: comment, description: "answered to your comment :) :)", auth: authId})
             let newCommentToComment = await CommentSelfie.updateOne(
                                           {"_id": commentId}, {
                                                $push: {
                                                        CommentToComment: {"image": image, "comment": comment, "authId": authId}
                                                    }
                                                }
                                            )
             let notf = await newNotification.save()
             let SendNotf = await Notification.updateOne({"_id": notf._id}, {
                $addToSet: {"eventAuth": EventAuth}
            })
             CommentSelfie.findOne({"_id": commentId})
             .populate("CommentToComment.authId", ["profileImage", "username"])
             .sort({"createdAt": 1})
             .then(updatedComment => {
                 socket.broadcast.emit( `${commentId}`, {newcomments: updatedComment.CommentToComment})
                 socket.emit(`${commentId}`, {newcomments: updatedComment.CommentToComment})
             })
         
              }catch(err){
                  console.log(err)
              }
          })
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~//||   "here is comments place for songs"       ||//~~~~~~~~~~~~~~//
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//

           socket.on('comments_place_Songs', async ({image,comment,authId,songId,EventAuth}) => {
            try{
                let newComment = new CommentSong({image: image, comment: comment, songId: songId, auth: authId});
                let newNotification = new Notification({music: songId, comment: comment, description: "commented your Selfie", auth: authId})
                let commentsave = await newComment.save()
                let newcomments = await CommentSong.find({"songId": commentsave.songId}).populate("auth", ["profileImage", "username"]).sort({"createdAt": 1})
                let newNotf = await newNotification.save().then(notf=>console.log(notf));
                let SendNotf = await Notification.updateOne({"_id": newNotf._id}, {
                    $addToSet: {"eventAuth": EventAuth}
                })
                     socket.broadcast.emit( `${songId}`, {newcomments})
                     socket.emit(`${songId}`, {newcomments})
            }catch(err){
                console.log(err)
            }     
     
            })
   //~~~~~~~~~~~~~~//||   "CommentToComment"   ||//~~~~~~~~~~~~~~//

         socket.on('CommentToComment_song', async ({image,comment,authId,commentId,EventAuth}) => {
            try{
           let newNotification = new Notification({commentSong: commentId, comment: comment, description: "answered to your comment :) :)", auth: authId})
           let newCommentToComment = await CommentSong.updateOne(
                                         {"_id": commentId}, {
                                              $push: {
                                                      CommentToComment: {"image": image, "comment": comment, "authId": authId}
                                                  }
                                              }
                                          )
           let notf = await newNotification.save();
           let SendNotf = await Notification.updateOne({"_id": notf._id}, {
            $addToSet: {"eventAuth": EventAuth}
        })
           CommentSong.findOne({"_id": commentId})
           .populate("CommentToComment.authId", ["profileImage", "username"])
           .sort({"createdAt": 1})
           .then(updatedComment => {
               socket.broadcast.emit( `${commentId}`, {newcomments: updatedComment.CommentToComment})
               socket.emit(`${commentId}`, {newcomments: updatedComment.CommentToComment})
           })

            }catch(err){
                console.log(err)
            }
        })

                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~//||   "here is comments place for posts"   ||//~~~~~~~~~~~~~~//
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//

         socket.on('comments_place_Post', async ({image,comment,authId,postId,EventAuth}) => {
            try{
                let newComment = new CommentPost({image: image, comment: comment, postId: postId, auth: authId});
                let newNotification = new Notification({post: postId, comment: comment, description: 
           "commented your Post", auth: authId})
                let commentsave = await newComment.save()
                let newcomments = await CommentPost.find({"postId": commentsave.postId})
                .populate("auth", ["profileImage", "username"])
                .populate("CommentToComment.authId", ["profileImage", "username"])
                .sort({"createdAt": 1})
                let newNotf = await newNotification.save().then(notf=>console.log(notf));
                let SendNotf = await Notification.updateOne({"_id": newNotf._id}, {
                    $addToSet: {"eventAuth": EventAuth}
                })

                     socket.broadcast.emit( `${postId}`, {newcomments})
                     socket.emit(`${postId}`, {newcomments})
            }catch(err){
                console.log(err)
            }     
         })
//~~~~~~~~~~~~~~//||   "CommentToComment"   ||//~~~~~~~~~~~~~~//

         socket.on('CommentToComment_post', async ({image,comment,authId,commentId,EventAuth}) => {
             try{
            let newNotification = new Notification({commentPost: commentId, comment: comment, description: "answered to your comment :) :)", auth: authId})
            let newCommentToComment = await CommentPost.updateOne(
                                          {"_id": commentId}, {
                                               $push: {
                                                       CommentToComment: {"image": image, "comment": comment, "authId": authId}
                                                   }
                                               }
                                           )
            let notf = await newNotification.save();
            let SendNotf = await Notification.updateOne({"_id": notf._id}, {
                $addToSet: {"eventAuth": EventAuth}
            })
            CommentPost.findOne({"_id": commentId})
            .populate("CommentToComment.authId", ["profileImage", "username"])
            .sort({"createdAt": 1})
            .then(updatedComment => {
                socket.broadcast.emit( `${commentId}`, {newcomments: updatedComment.CommentToComment})
                socket.emit(`${commentId}`, {newcomments: updatedComment.CommentToComment})
            })

             }catch(err){
                 console.log(err)
             }
         })
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~//||   "here is comments place for Girls"   ||//~~~~~~~~~~~~~~//
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//

    socket.on('comments_place_Girls', async({image,comment,authId,girlID,EventAuth}) => {
        try{
            let newComment = new CommentGirl({image: image, comment: comment, girlID: girlID, auth: authId});
            let newNotification = new Notification({Girls: true, girlID: girlID, comment: comment, description: "commented your anonymous post", auth: authId})
            let commentsave = await newComment.save()
            let newcomments = await CommentGirl.find({"girlID": commentsave.girlID}).populate("auth", ["profileImage", "username"]).sort({"createdAt": 1})
            let newNotf = await newNotification.save()
            let SendNotf = await Notification.updateOne({"_id": newNotf._id}, {
                $addToSet: {"eventAuth": EventAuth}
            })
                 socket.broadcast.emit( `${girlID}`, {newcomments})
                 socket.emit(`${girlID}`, {newcomments})
        }catch(err){
            console.log(err)
        }     
    })
    //~~~~~~~~~~~~~~//||   "CommentToComment"   ||//~~~~~~~~~~~~~~//

          socket.on('CommentToComment_Girls', async ({image,comment,authId,commentId,EventAuth}) => {
              try{
             let newNotification = new Notification({commentGirl: commentId, comment: comment, description: "answered to your comment :) :)", auth: authId})
             let newCommentToComment = await CommentGirl.updateOne(
                                           {"_id": commentId}, {
                                                $push: {
                                                        CommentToComment: {"image": image, "comment": comment, "authId": authId}
                                                    }
                                                }
                                            )
             let notf = await newNotification.save()
             let SendNotf = await Notification.updateOne({"_id": notf._id}, {
                $addToSet: {"eventAuth": EventAuth}
            })
             CommentGirl.findOne({"_id": commentId})
             .populate("CommentToComment.authId", ["profileImage", "username"])
             .sort({"createdAt": 1})
             .then(updatedComment => {
                 socket.broadcast.emit( `${commentId}`, {newcomments: updatedComment.CommentToComment})
                 socket.emit(`${commentId}`, {newcomments: updatedComment.CommentToComment})
             })
         
              }catch(err){
                  console.log(err)
              }
          })
//~~~~~~~~~~~~~~//||   "____find users____"   ||//~~~~~~~~~~~~~~//
          socket.on('Girls_find_users', ({name, userID}) => {
              console.log(name);
              User.findOne({"username": name}, {"username": 1, "profileImage": 1}).then(foundUser => {
                  console.log(foundUser)
                  socket.emit(`responseUsers_girls_${userID}`, {foundUser})
              })
          })
//~~~~~~~~~~~~~~//||   "____find who i am____"   ||//~~~~~~~~~~~~~~//
          socket.on('Girls_find_whoIAM', async ({USERID, authID, GirlAuth, GirlID}) => {
              try{
                  console.log({USERID, authID, GirlAuth, GirlID})
                if(USERID === GirlAuth) {
                    let girlUpadate = await Girls.updateOne({"_id": GirlID}, {$addToSet: {"Winners": authID}});
                    let findNewGirl = await Girls.find({})
                    .populate('lovers', ['username', 'profileImage'])
                    .populate('Winners', ['username', 'profileImage'])
                    .sort({"createdAt": -1});
                    socket.emit(`WhoIAm_${authID}`, {findNewGirl})
                } 
                else if(USERID !== GirlAuth){
                    let girlUpadate = await Girls.updateOne({"_id": GirlID}, {$addToSet: {"WhoTried": authID}});
                    let findNewGirl = await Girls.find({})
                    .populate('lovers', ['username', 'profileImage'])
                    .populate('Winners', ['username', 'profileImage'])
                    .sort({"createdAt": -1});
                    socket.emit(`WhoIAm_${authID}`, {findNewGirl})
                }
              }catch(err){
                  console.log(err)
              }
           

           
           
           
          })


                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~//||   "____AskQuestion Place____"   ||//~~~~~~~~~~~~~~//
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//

//~~~~~~~~~~~~~~//||   "____Create One____"   ||//~~~~~~~~~~~~~~//
          socket.on('AskQuestion', async ({question, auth}) => {
              try{
                let newQuestion = new AskQuestion({question, auth})
                let saveQuestion = await newQuestion.save();
                let Questions = await AskQuestion.find({})
                socket.emit("Question", {Questions})
              }catch(err){
                  console.log(err)
              }        
          })
//~~~~~~~~~~~~~~//||   "____Create One____"   ||//~~~~~~~~~~~~~~//
          socket.on('GetQuestions', async ({}) => {
            try{
              let Questions = await AskQuestion.find({})
              socket.emit("Questions", {Questions})
            }catch(err){
                console.log(err)
            }        
        })

        socket.on('AskQuestion_Answer', async ({Answer, ID}) => {
            try{
                let updateOperationQuestion = await AskQuestion.updateOne({"_id": ID}, {$push: {"Answers": Answer}});
                let updatedQuestions = await AskQuestion.find({})
                socket.broadcast.emit('AnswerResponse', {updatedQuestions})
                socket.emit('AnswerResponse', {updatedQuestions})
            }catch(err){
                console.log(err)
            }
        })



                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~//||   "Αγάπα με όταν δεν το αξίζω, σκουπίδι"   ||//~~~~~~~~~~~~~~//
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//

    socket.on('messenger_place', ({newmsg, authId, chatroomId, urlImage}) => {
        Messenger.updateOne(
            {"_id": chatroomId},{
               $push: {
                  messanges: {"auth": authId, "message": newmsg, "urlImage": urlImage}
               }
            }).then(answer => {
                console.log(answer)
                if(answer.nModified === 1){
                    Messenger.findOne({"_id": chatroomId})
                    .populate('messanges.auth', ["profileImage"])
                    .then(newchat=>{
                        console.log(newchat)
                        socket.broadcast.emit( `${chatroomId}`, {newmessages: newchat.messanges})
                        socket.emit(`${chatroomId}`, {newmessages: newchat.messanges})
                    }).catch(err=>console.log(err))
                }
            })
    })
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~//||         "diabastike"       ||//~~~~~~~~~~~~~~//
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
      socket.on("real_time_messaging", ({messaging, chatroomId, Debbie}) => {
          console.log(messaging, chatroomId)
          socket.broadcast.emit( `real_time_messaging/${chatroomId}`, {realtimeMessage: messaging, chatroomId, Debbie})
      })
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~//||         "diabastike"       ||//~~~~~~~~~~~~~~//
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
    socket.on("diabastike", ({chatroomId}) => {
        Messenger.updateOne({"_id": chatroomId}, {
            $set: {"messanges.$[].diabastike": true
            }
         }).catch(err=>{res.json({err})})
    })

                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~//||         "Online"       ||//~~~~~~~~~~~~~~//
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//

    socket.on("online", ({user}) => {
        User.updateOne({"_id": user}, {$set: {"Online": true}}).catch(err=>console.log(err))
    })

    socket.on('offline', ({userId}) => {
        User.updateOne({"_id": userId}, {$set: {"Online": false}}).catch(err=>console.log(err))
    })

                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~//||   "Αγάπα με όταν δεν το αξίζω, σκουπίδι"   ||//~~~~~~~~~~~~~~//
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//

//~~~~~~~~~~~~~~//||         "PROFILE PHOTOS"       ||//~~~~~~~~~~~~~~//

                //~~~~~~~~~~~~~~"COMMENT PHOTOS"~~~~~~~~~~~~~~//



        socket.on('comments_profilePhoto', async ({comment, profilePhoto, auth, EventAuth}) => {
            try{
                let newComment = new ProfilePhotoComment({comment, profilePhoto, auth})

                let newNotification = new Notification({comment: comment, description: "commented your profile photo :) :)", auth, profileComment: true, profilePhoto})

                let commentSave = await newComment.save();
                let newComments = await ProfilePhotoComment.find({"profilePhoto": profilePhoto}).populate("auth", ["profileImage", "username"]).sort({"createdAt": 1})
                let notf = await newNotification.save();
                let SendNotf = await Notification.updateOne({"_id": notf._id}, {
                    $addToSet: {"eventAuth": EventAuth}
                })

                socket.broadcast.emit(`${profilePhoto}`, {newComments});
                socket.emit(`${profilePhoto}`, {newComments});

            }catch(err){
                console.log(err)
            }
        })

        socket.on("react_comment_profilePhoto", async ({profilePhoto, reaction, commentId}) => {
            try{
                let reactOperation = await ProfilePhotoComment.updateOne({"_id": commentId}, {$set: {"Reaction": reaction}})
                let FindUpdatedProfileComments =  await ProfilePhotoComment.find({"profilePhoto": profilePhoto}).populate("auth", ["profileImage", "username"]).sort({"createdAt": 1})

                socket.broadcast.emit(`${profilePhoto}`, {newComments: FindUpdatedProfileComments});
                socket.emit(`${profilePhoto}`, {newComments: FindUpdatedProfileComments});

            }catch(err){
                console.log(err)
            }
        })




                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~//||         "Like Post"        ||//~~~~~~~~~~~~~~//
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//

     socket.on("like", async ({postId, userId, EventAuth}) => {
         try{
            let like = await Post.updateOne({"_id": postId}, {$pull: {dislike: userId}, $addToSet: {like: {$each: [userId]}}})
            let updatedPost = await Post.findOne({"_id": postId})
                                 .populate("like", ["profileImage", "username"])
                                 .populate("dislike", ["profileImage", "username"])
            let newNotification = new Notification({post: postId, description: 'Liked your post', auth: userId}) 
            let saveNotifiction = await newNotification.save();
            let SendNotf = await Notification.updateOne({"_id": notf._id}, {
                $addToSet: {"eventAuth": EventAuth}
            })
             socket.emit('like_update', {updatedPost})
         }catch(err){
             console.log(err)
         }
     })

     socket.on("dislike", async({userId, postId, EventAuth}) => {
        try{
            let like = await Post.updateOne({"_id": postId}, {$pull: {like: userId}, $addToSet: {dislike: {$each: [userId]}}})
            let updatedPost = await Post.findOne({"_id": postId})
                                 .populate("like", ["profileImage", "username"])
                                 .populate("dislike", ["profileImage", "username"])
            let newNotification = new Notification({post: postId, description: 'Disliked your post', auth: userId}) 
                let saveNotifiction = await newNotification.save();
                let SendNotf = await Notification.updateOne({"_id": saveNotifiction._id}, {
                    $addToSet: {"eventAuth": EventAuth}
                })           
             socket.emit('dislike_update', {updatedPost})
         }catch(err){
             console.log(err)
         }
    })

                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~//||         "NOTIFICATIONS"        ||//~~~~~~~~~~~~~~//
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//

    socket.on('notf', ({userId})=>{
        Notification.find({$and: [{"eventAuth": userId}, {"auth": {$ne: userId}}]})
        .sort({"createdAt": -1})
        .populate("auth", ["profileImage", "username"])
        .populate("selfie", ["selfie"])
        .populate("post", ["Title"])
        .populate("music", ["song"])
        .populate("girlID", ["Girl"])
        .populate("commentSong", ["comment"])
        .populate("commentSelfie", ["comment"])
        .populate("commentsPost", ["comment"])
        .populate("commentGirl", ["comment"])
        .then(notf => {
            socket.broadcast.emit( `${userId}`, {notf})
            socket.emit(`${userId}`, {notf})
        }).catch(err=>console.log(err))
    })

    socket.on('notf_seen',async ({userId}) => {
        try{
          let updateNotf = await Notification.updateMany({$and: [{"eventAuth": userId}, {"auth": {$ne: userId}}]}, {$set: {"seen": true}})

        }catch(err){
            console.log(err)
        }
    })
             

//~~~~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~~~~//

                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~//||    "Αγάπα με όταν δεν το αξίζω, nai ee?? STORIES TRUE "   ||//~~~~~~~~~~~~~~//
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
                socket.on("stories", async ({storyID, userID}) => {
                    let watchOperation = await Stories.findOneAndUpdate({"_id": storyID}, {$addToSet: {"viewers": userID}});
                  let updatedStories = await Stories.find({})
                    .populate('auth', ["coverImage", "profileImage", "username"])
                    .populate("viewers", ["coverImage", "profileImage", "username"])
                    socket.emit("storiesGET", {stories: updatedStories})
                    socket.broadcast.emit("storiesGET", {stories: updatedStories})
                })

//~~~~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~~~~//

               //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~//||    " THEME OF APPLICATION"   ||//~~~~~~~~~~~~~~//
                //~~~~~~~~~~~~~~<3<3~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~//
                socket.on("user_theme", async ({color, authId, theme, rgb}) => {
                    try{
                
                   let operationUpdate = await User.updateOne({"_id": authId}, {
                        $set: {BackgroundColor: color, ThemeMode: theme !== undefined? theme:null},
                    })
                    

                    let updatedUser = await User.findById({"_id": authId})

                    if(operationUpdate.nModified === 0){
                        console.log('nothing updated')
                    }else {
                        socket.emit("updatedUser_theme", {updatedUser})
                    }
                    }catch(err){
                        console.log(err)
                    }
                   
                })
            

//~~~~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~~~~//


    socket.on('disconnect', ({user})=>{
        console.log('a client disconected from socket', {user});
        User.updateOne({"_id": user}, {$set: {"Online": false} }).then(x=>{}).catch(err=>console.log(err))
    })

 })

 //~~~~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~~~~xx~~~~~~~~~~~~~~~~~//


server.listen(PORT, ()=>console.log('server started wow xD')) 