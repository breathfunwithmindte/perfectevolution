import React, { useState } from 'react';
import socket from '../socket';
import "./profile.css"

function Profile(props) {
   const [profile, setProfile] = useState({}); 
   const username = props.match.params.username;

   const [loading, setloading] = useState(false)

   React.useEffect(() => {
      let InitialProfileFunction = async () => {
         socket.emit("profile_master", {username});
         socket.on(`profile_response_${username}`, ({profileServ, error}) => {
            if(error && error === "smth went wrong"){
               alert("smth went wrong we are trying to fix the problem as soon as this is possible !!")
            }else {
               setloading(false);
               setProfile(profileServ);
            }
         })
      }
      if(username){
         InitialProfileFunction();
      }else{
         setloading(true)
      }
   }, [username])

   if(loading === true) return <h3>Wait a few second if it will not load the profile then that mean smth went wrong and you propably need refresh the page</h3>
   return (
      <div className="profile_container"> 
         <div className="profile_header">
            <button>nan</button>
            <button>nan</button>
            <button>nan</button>
            <button>nan</button>
            <button>nan</button>
         </div>
         <div className="profile_details_container">
            <img className="profile_coverImage" src={profile.coverImage} alt="" />
            <img className="profile_profileImage" src={profile.profileImage} alt="" />
            {profile.username}   
         </div>
         <div className="profile_container_else">
               <button className="profile_buttons">selfies</button>
               <button className="profile_buttons">Posts</button>
               <button className="profile_buttons" style={{display: "flex"}}><h3>{profile.username} 's</h3> Store</button>
               <button className="profile_buttons"></button>
         </div>
      </div>
   )
}

export default Profile
