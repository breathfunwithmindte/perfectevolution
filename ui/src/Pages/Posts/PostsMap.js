import React from 'react';
import "./posts.css";
import LinearProgress from '@material-ui/core/LinearProgress';
import ReactEmoji from 'react-emoji';
import socket from '../../socket';
import { LikeDis } from '../../Comments/ExportFolder'
import { FcLike, FcLikePlaceholder} from 'react-icons/fc'
import { Tooltip } from '@material-ui/core';
import { AuthContext } from '../../Context/AuthContext';
import {useHistory} from 'react-router-dom';

function PostsMap(props) {
   const {user} = React.useContext(AuthContext);
   const [loading, setloading] = React.useState(true);
   const [profile, setProfile] = React.useState({})
   const History = useHistory();

   React.useEffect(() => {
      let userID = user._id;
      let profileID = user.profile
      let get_profileFunction = async () => {
         try{
          let RequestToSERVER_forProfileByID = await socket.emit("get_profile_byID", {profileID, userID});
            socket.on(`profile_response_forUser_${userID}`, ({profile, error}) => {
               if(error && error === "smth went wrong"){
                  alert("smth went wrong we are trying to fix the problem as soon as this is possible !!")
               }else {
                  setloading(false);
                  setProfile(profile);
               }
            })
         }catch(err){
            //console.log(err)
            alert("smth went wrong with profiles, perfectevolution team is trying hard to fix the problem as soos as this is possible. Refresh tha page or try again later");
         }
      }
      get_profileFunction();

   }, [user])

   return (
      <div className="postsMap_container">
         {
            props.posts && props.loading === false ? props.posts.map(p => {
               return <div p={props.posts} key={p._id} className="postsMap_single">
                      <div className="postsMap_auth">
                        <img src={p.auth.profileImage} alt="" style={{marginLeft: "5vw", width: "34px", height: "34px"}} onClick={() => {
                           History.push(`/Profile/${p.authProfile.username}`)
                        }}/>
                        <p> {"timing"}</p>
                        {p.Love.length}
                        <button onClick={() => {
                         History.push(`/Post/${p._id}`)
                      }}>-</button>
                        <p>{p.auth.username}</p>
                      </div>
                      <div style={{width: "100%", minHeight: "fit-content", maxHeight: "92%", overflowY: "scroll"}}>
                        <div dangerouslySetInnerHTML={{ __html: p.content }} />
                      </div>
                      <hr />
                      <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
                         {
                            p.Love.find(d=>d._id === user._id) ? <FcLike data-toggle="tooltip"
                            title="You already loved this post" style={{fontSize: "23px", color: "red"}} /> 
                            :
                             <FcLikePlaceholder style={{fontSize: "23px", color: "white"}} data-toggle="tooltip" title="Love this post?" onClick={async () => {
                                try{
                                 let ReqServer = await socket.emit("love_post", {postID: p._id, authID: user._id})
                                }catch(err){
                                   //console.log(err)
                                   alert("smth went wrong refresh the page !!")
                                }
                            }}/>
                         }
                         {
                            loading === true ? <p>...loading</p> : <LikeDis postID={p._id} Writter={p.auth._id} authID={user._id} profile={profile} />
                         }
                         
                         
                      </div>
                      
                      
                      
            </div>
            })
            :
            <LinearProgress color="secondary"/>
         }
      </div>
   )
}

export default PostsMap
