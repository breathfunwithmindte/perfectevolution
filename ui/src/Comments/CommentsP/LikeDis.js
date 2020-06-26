import React from 'react';
import socket from '../../socket'
import { AiOutlineDislike, AiOutlineLike} from 'react-icons/ai'

function LikeDis(props) {
   const [likes, setLikes] = React.useState(null);
   const [loading, setLoading] = React.useState(true);

   React.useEffect(() => {
      async function InitialLikes() {
         try{
          let sendReqServer = await socket.emit("getlikesP", {postID: props.postID, Writter: props.Writter, authID: props.authID})
          socket.on(`LikesP_${props.postID}`, ({data}) => {
             if(data === null){
                setLikes("noLikes");
                setLoading(false)
             } else if(data !== null && data.type === "like") {
                 setLikes("like");
                 setLoading(false);
             } else if(data !== null && data.type === "dislike") {
                setLikes("dislike");
                setLoading(false);
             }
          })
         }catch(err){
            //console.log(err)
         }
      }
      InitialLikes();
   }, [props.authID])

if(loading === true) return <div>loading...</div>
   return (
      <div>
         {
            likes === "noLikes" ? <div style={{display: "flex", alignItems: "center"}}>
               <AiOutlineLike style={{paddingRight: "1vw"}} onClick={async() => {
                 let ReqServer = await socket.emit("create_like", {postID: props.postID, Writter: props.Writter, type: "like", authID: props.authID, profile: props.profile});
               }} />
               <AiOutlineDislike onClick={async() => {
                  let ReqServer = await socket.emit("create_like", {postID: props.postID, Writter: props.Writter, type: "dislike", authID: props.authID, profile: props.profile});
               }} />
            </div>
            :
            likes === "like" ? <div style={{display: "flex", alignItems: "center"}}>
               <p style={{paddingRight: "1vw"}}>you liked this post</p>
               <AiOutlineDislike style={{paddingRight: "1vw"}} onClick={async () => {
                  socket.emit("opdateLikeP", {postID: props.postID, Writter: props.Writter, type:"dislike", authID:props.authID})
               }} />
            </div>
            :
            likes === "dislike" ? <div style={{display: "flex", alignItems: "center"}}>
                  <AiOutlineLike style={{paddingRight: "1vw"}} onClick={() => {
                     socket.emit("opdateLikeP", {postID: props.postID, Writter: props.Writter, type:"like", authID: props.authID, profile: props.profile})
                  }} />
                  <p>you disliked this post</p>
            </div>
            :
            <p>smth went wrong refresh the page</p>
         }
      </div>
   )
}

export default React.memo(LikeDis);
