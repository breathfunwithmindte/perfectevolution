import React from 'react';
import socket from '../socket';
import { LikeDis } from '../Comments/ExportFolder'
import { FcLike, FcLikePlaceholder} from 'react-icons/fc'
import { Tooltip } from '@material-ui/core';
import { AuthContext } from '../Context/AuthContext';

function SinglePostContent(props) {
    const {user} = React.useContext(AuthContext);
    {/*AUTH*/}
   return (<div style={{paddingTop: "14vh", width: "92%", marginLeft: "2%"}}>
    {/*AUTH*/}
    <div style={{display: "flex"}}>
      <img src={props.post.auth.profileImage} alt="" style={{marginLeft: "5vw", width: "34px", height: "34px"}} />
      <p> {"timing"}</p>
      {props.post.Love.length}
      <p>{props.post.auth.username}</p>
    </div>
     {/*AUTH*/}
   
    <div style={{width: "100%", minHeight: "fit-content", maxHeight: "92%"}}>
      <div dangerouslySetInnerHTML={{ __html: props.post.content }} />
    </div>
   
    <hr />
    
</div>
   )
}

export default SinglePostContent;

