import React from 'react';
import QuillEditorP from '../Editor/QuillEditorP';
import socket from '../socket';

function EditProfileStatus({profile}) {
   const [content, setContent] = React.useState("");

   const onEditorChange = (value) => setContent(value);

   const handleSubmit = async () => {
      try{
         let sendReqServer_forUpdateProfileStatus = await socket.emit("update_profileStatus", { profile, content });

      }catch(err){
         //console.log(err)
         alert(`smth went wrong, perfectevolution team is trying hard to fix the problem as soon as it is possible. ${profile.firstname} try refresh the page or comeback later`)
      }
   }
   return (
      <div style={{height: "100%", maxWidth: "34vw"}}>
         <QuillEditorP onEditorChange={onEditorChange} />
         <button className="sendbutton" onClick={handleSubmit}>SAVE</button>
      </div>
   )
}

export default EditProfileStatus;