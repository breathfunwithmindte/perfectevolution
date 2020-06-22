import React from 'react';
import socket from '../socket';
import { LikeDis } from '../Comments/ExportFolder'
import { FcLike, FcLikePlaceholder} from 'react-icons/fc'
import { Tooltip } from '@material-ui/core';
import { AuthContext } from '../Context/AuthContext';

function SinglePostContent(props) {
    const {user} = React.useContext(AuthContext);



   return (<div style={{paddingTop: "14vh", width: "92%", marginLeft: "2%"}}>
      {/* auth */}
    <div style={{display: "flex"}}>
      <img src={props.post.auth.profileImage} alt="" style={{marginLeft: "5vw", width: "34px", height: "34px"}} />
      <p> {"timing"}</p>
      {props.post.Love.length}
      <p>{props.post.auth.username}</p>
      <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
       {
          props.post.Love.find(d=>d._id === user._id) ? <FcLike data-toggle="tooltip"
          title="You already loved this post" style={{fontSize: "23px", color: "red"}} /> 
          :
           <FcLikePlaceholder style={{fontSize: "23px", color: "white"}} data-toggle="tooltip" title="Love this post?" onClick={async () => {
              try{
               let ReqServer = await socket.emit("love_post", {postID: props.post._id, authID: user._id})
              }catch(err){
                 //console.log(err)
                 alert("smth went wrong refresh the page !!")
              }
          }}/>
       }
       <LikeDis postID={props.post._id} Writter={props.post.auth._id} authID={user._id} />
    </div>
    </div>
     {/* auth */}


    <div style={{width: "100%", minHeight: "fit-content", maxHeight: "92%"}}>
      <div dangerouslySetInnerHTML={{ __html: props.post.content }} />
    </div>
    
    <hr />


    

</div>
   )
}

export default SinglePostContent;

