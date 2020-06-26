import React from 'react';
import QuillEditorP from '../Editor/QuillEditorP';
import "./singlepage.css"
import socket from '../socket';

function CreateComment(props) {
   const [content, setContent] = React.useState("");

   const onEditorChange = (value) => setContent(value);

   const handleSubmit = async () => {
      let authID = props.authID;
      let postID = props.postID;
      let profile = props.profile;
      let Writter = props.Writter;
      try{
         let sendReqServer_forCreateComment = await socket.emit("create_commentP", {authID, postID, Writter, profile, content});
         socket.on(`all_commentsPost_for_${postID}`, ({error}) => {
            if(error === "smth went wrong"){
               alert("smth went wrong with publishing your comment to this post. Perfectevolution team is working hard to fix the problem as soon as this is possible, refresh the page or try again later.")
            } 
         })

      }catch(err){
         //console.log(err)
         alert(`smth went wrong, perfectevolution team is trying hard to fix the problem as soon as it is possible. ${props.user_firstname} try refresh the page or comeback later`)
      }
   }
   return (
      <div style={{height: "100%"}}>
         <QuillEditorP onEditorChange={onEditorChange} />
         <button className="sendbutton" onClick={handleSubmit}>ff</button>
      </div>
   )
}

export default CreateComment;
