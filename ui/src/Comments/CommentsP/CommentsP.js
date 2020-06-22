import React from 'react';
import socket from '../../socket';

function CommentsP(props) {
   const [comments, setComments] = React.useState([]);
   const [loading, setloading] = React.useState(true);

   React.useEffect(() => {
     const InitializeCom = async () => {
        console.log("we are here fuck")
        try{
           let postID = props.postID
           let GetCommentsSERVERreq = await socket.emit("getComments", {postID});
           socket.on(`all_commentsPost_for_${postID}`, ({commentSERVER, error}) => {
              if(error==="smth went wrong"){
                 console.log("error")
                 alert("smth went wrong with getting comments, perfectevolution team is working hard to fix this problem as soon as this is possible, refresh the page or try again later.")
              } else {
                 console.log("we are here", commentSERVER)
                 setComments(commentSERVER);
                 setloading(false)
              }
           })
        }catch(err){
           console.log(err)
           alert("smth went wrong with getting comments, perfectevolution team is working hard to fix this problem as soon as this is possible, refresh the page or try again later.")
        }
     }
     InitializeCom();
   }, [props.postID])

   if(loading === true) return <p>...loading</p>
   return (
      <div>
         {comments && comments.map(d => {
            return <div d={comments} key={d._id}>
                   <div dangerouslySetInnerHTML={{ __html: d.content }} />
               </div>
         } )}
      </div>
   )
}

export default React.memo(CommentsP);
