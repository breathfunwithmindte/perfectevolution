import React from 'react';
import socket from '../../socket';
import "./commentsP.css";
import { useHistory } from 'react-router-dom';
import GlobalProfile from '../../Profiles/GlobalProfile';
import { Button, Tooltip } from '@material-ui/core';

function CommentsP(props) {
   const [comments, setComments] = React.useState([]);
   const [loading, setloading] = React.useState(true);
   console.log("comments ===>>>",comments)

   React.useEffect(() => {
     const InitializeCom = async () => {
        try{
           let postID = props.postID
           let GetCommentsSERVERreq = await socket.emit("getComments", {postID});
           socket.on(`all_commentsPost_for_${postID}`, ({commentSERVER, error}) => {
              if(error==="smth went wrong"){
                 //console.log("error")
                 alert("smth went wrong with getting comments, perfectevolution team is working hard to fix this problem as soon as this is possible, refresh the page or try again later.")
              } else {
                 console.log("we are here", commentSERVER)
                 setComments(commentSERVER);
                 setloading(false)
              }
           })
        }catch(err){
           //console.log(err)
           alert("smth went wrong with getting comments, perfectevolution team is working hard to fix this problem as soon as this is possible, refresh the page or try again later.")
        }
     }
     InitializeCom();
   }, [props.postID])

   const History = useHistory()

   if(loading === true) return <p>...loading</p>
   return (
      <div style={{overflowY: "auto", height: "69vh"}}>
         {comments && comments.map(d => {
            return <div className="SinglePage_postComment_SingleComment" d={comments} key={d._id}>
                     <Tooltip title={<div><GlobalProfile profile={d.authProfile}/></div>} placement="left"><Button color="secondary" onClick={() => History.push(`/Profile/${d.auth.username}`)}>
                        <img src={d.auth.profileImage} alt="" style={{width: "34px", height: "34px", borderRadius: "50%"}} />
                        </Button></Tooltip>
                     <div className="SinglePage_postComments_singleComment_content">
                        <p style={{letterSpacing: "1px", fontWeight: "bold"}} onClick={() => {
                           History.push(`/Profile/${d.auth.username}`)
                        }}>{d.auth.username}</p>
                        <div dangerouslySetInnerHTML={{ __html: d.content }} />
                        <Button>MM</Button><Button>MM</Button>
                     </div>
                  </div>
         } )}
      </div>
   )
}

export default React.memo(CommentsP);