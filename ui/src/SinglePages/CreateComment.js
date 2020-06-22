import React from 'react';
import QuillEditorP from '../Editor/QuillEditorP';
import "../Pages/Posts/posts.css";
import socket from '../socket';

function CreateComment(props) {
   const [content, setContent] = React.useState("")

   const onEditorChange = (value) => setContent(value);

   const handleSubmit = async () => {
      try{
         let sendReqServer_forCreateComment = await socket.emit("create_commentP", {})

      }catch(err){
         //console.log(err)
         alert(`smth went wrong, perfectevolution team is trying hard to fix the problem as soon as it is possible. ${props.user_firstname} try refresh the page or comeback later`)
      }
   }
   return (
      <div style={{height: "100%"}}>
         <QuillEditorP onEditorChange={onEditorChange} />
      </div>
   )
}

export default CreateComment
