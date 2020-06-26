import React, { useState, useContext } from 'react';
import socket from '../socket';
import { themeContext } from '../Context/ThemeContext';
import { AuthContext } from '../Context/AuthContext';
import { MdSettingsEthernet } from 'react-icons/md';
import { Tooltip, Button,Dialog } from '@material-ui/core';
import "./profile.css";
import ProfileGlobal from './GlobalProfile';

const ProfileImageSettings = React.lazy(() => import("./ProfileImageSettings"));
const EditProfileStatus = React.lazy(() => import("./EditProfileStatus"));


function Profile(props) {
   const { theme } = useContext( themeContext );
   const { user } = useContext( AuthContext );
   const [profile, setProfile] = useState({}); 
   const username = props.match.params.username;
   const [settings, setSettings] = React.useState(false);
   const [EditStatus, setEditStatus] = React.useState(false)
   const [loading, setloading] = useState(false)

   console.log(profile)

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
   else if(theme === "dark" || theme === "black" || theme === "undefinded") return (
      <div className="profile_container__DARK"> 
         <div className="profile_header" />
         <div className="profile_details_container__DARK">
            <img className="profile_coverImage" src={profile.coverImage} alt="" />
            {profile._id === user.profile ? <Tooltip placement="bottom" title={<h3>Profile Images Settings</h3>}><Button onClick={() => setSettings(true)} style={{zIndex: "5", position: "absolute", left: "1vw", top: "5vh"}} color="secondary"><MdSettingsEthernet style={{fontSize: "1.6vw"}}/></Button></Tooltip> : null}
            <img className="profile_profileImage" src={profile.profileImage} alt="" />
            {profile.username} 
            <div  >
                <div dangerouslySetInnerHTML={{ __html: profile.statusContent }} /> 
            </div>
            {profile._id === user.profile ? <Tooltip placement="bottom" title={<h3>Edit profile status</h3>}><Button onClick={() => {
                if(EditStatus=== true) setEditStatus(false);
                else if(EditStatus === false) setEditStatus(true);
            }} color="secondary"><MdSettingsEthernet style={{fontSize: "1.6vw"}}/></Button></Tooltip> : null}
            {EditStatus === true ? <EditProfileStatus profile={profile}/> : null}
             
            <Dialog open={settings} onClose={() => setSettings(false)}>
               <ProfileImageSettings profile={profile} user={user} theme={theme}/>
            </Dialog>
         </div>
         <div className="profile_container_else">
               <button className="profile_buttons">selfies</button>
               <button className="profile_buttons">Posts</button>
               <button className="profile_buttons" style={{display: "flex"}}><h3>{profile.username} 's</h3> Store</button>
               <button className="profile_buttons"></button>
               <ProfileGlobal profile={profile} />
         </div>
      </div>
   )
   else if(theme === "light") return (
         <div className="profile_container__LIGHT"> 
         <div className="profile_header" />
         <div className="profile_details_container__LIGHT">
            <img className="profile_coverImage" src={profile.coverImage} alt="" />
            {profile._id === user.profile ? <Tooltip placement="bottom" title={<h3>Profile Images Settings</h3>}><Button onClick={() => setSettings(true)} style={{zIndex: "5", position: "absolute", left: "1vw", top: "5vh"}} color="secondary"><MdSettingsEthernet style={{fontSize: "1.6vw"}}/></Button></Tooltip> : null}
            <img className="profile_profileImage" src={profile.profileImage} alt="" />
            {profile.username}   
            <div className="profile_Status_Place" dangerouslySetInnerHTML={{ __html: profile.statusContent }} /> 
            {profile._id === user.profile ? <Tooltip placement="bottom" title={<h3>Edit profile status</h3>}><Button onClick={() => {
               if(EditStatus=== true) setEditStatus(false);
               else if(EditStatus === false) setEditStatus(true);
            }} color="secondary"><MdSettingsEthernet style={{fontSize: "1.6vw"}}/></Button></Tooltip> : null}
            {EditStatus === true ? <EditProfileStatus profile={profile}/> : null}


            <Dialog open={settings} onClose={() => setSettings(false)}>
               <ProfileImageSettings profile={profile} user={user} theme={theme}/>
            </Dialog>
         </div>
         <div className="profile_container_else">
               <button className="profile_buttons">selfies</button>
               <button className="profile_buttons">Posts</button>
               <button className="profile_buttons" style={{display: "flex"}}><h3>{profile.username} 's</h3> Store</button>
               <button className="profile_buttons"></button>
               <ProfileGlobal profile={profile} />
         </div>
      </div>
   )
}

export default React.memo(Profile);
