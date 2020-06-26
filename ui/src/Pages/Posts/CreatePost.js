import React from 'react';
import QuillEditorP from '../../Editor/QuillEditorP';
import "./posts.css";
import socket from '../../socket';

function CreatePost(props) {
   const [content, setContent] = React.useState("")

   function onEditorChange (value) {setContent(value);}
   return (
      <div>
         <QuillEditorP onEditorChange={onEditorChange} />
         <button className="buttonCreatePost" onClick={async () => {
            try{
              let SendReqServer = await socket.emit("create_Post", {content, authID: props.authID, profile: props.profile});
              socket.on("ServerAnswer", ({error}) => {
               if(error !== undefined){alert("smth went wrong refresh the page")}
            })
            }catch(err){
               alert("smth went wrong refresh the page !!")
               console.log(err)
            }
         }}>Publish</button>
         <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
   )
}

export default CreatePost
