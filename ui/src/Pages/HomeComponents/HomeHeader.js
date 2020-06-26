import React from 'react';
import './homeheader.css'
import { AuthContext } from '../../Context/AuthContext';
import { themeContext } from '../../Context/ThemeContext';
import { MdNotificationsActive } from 'react-icons/md';
import { FaFacebookMessenger } from 'react-icons/fa';
import HeaderSettingsDialog from './HeaderSettingsDialog';
import { useHistory } from 'react-router-dom';
import { messengerContext } from '../../Context/MessengerContext';



function HomeHeader() {
   const { user } = React.useContext( AuthContext );
   const { theme } = React.useContext( themeContext );
   const { MyChatRooms } = React.useContext( messengerContext )

   const History = useHistory()

   if(theme === "dark" || theme === "black")
   return (
      <header className="homeheader_container__DARK">
         <img src="https://res-console.cloudinary.com/perfectevolutionsite/thumbnails/v1/image/upload/v1592463697/c2FtcGxl/preview" alt="" className="homeheader_coverImage" />
         <img src="https://res-console.cloudinary.com/perfectevolutionsite/thumbnails/v1/image/upload/v1592463697/c2FtcGxl/preview" alt="" className="homeheader_profileImage" />
         <div className="header_buttons_homePage">
            <h3>
               {user.firstName}
            </h3>
            <div style={{display: "flex", width: "100%", justifyContent: "space-around"}}>
               <MdNotificationsActive onClick={()=> History.push("/Notifications")} />
               <FaFacebookMessenger onClick={()=> History.push(`/MessengerYoumi/${MyChatRooms[0].messengerKEY}`)} />
               <HeaderSettingsDialog />
            </div>
         </div> 
      </header>
   )
   else if(theme === "light") return(
      <header className="homeheader_container__LIGHT">
      <img src="https://res-console.cloudinary.com/perfectevolutionsite/thumbnails/v1/image/upload/v1592463697/c2FtcGxl/preview" alt="" className="homeheader_coverImage" />
      <img src="https://res-console.cloudinary.com/perfectevolutionsite/thumbnails/v1/image/upload/v1592463697/c2FtcGxl/preview" alt="" className="homeheader_profileImage" />
      <div className="header_buttons_homePage">
         <h3>
            {user.firstName}
         </h3>
         <div style={{display: "flex", width: "100%", justifyContent: "space-around"}}>
            <MdNotificationsActive onClick={()=> History.push("/Notifications")} />
            <FaFacebookMessenger onClick={()=> History.push(`/MessengerYoumi/${MyChatRooms[0].messengerKEY}`)}/>
            <HeaderSettingsDialog />
         </div>
      </div> 
   </header>
   )
   else if(theme === undefined) return(
      <header className="homeheader_container__UNDEFINED">
      welcome to PerfecTEvolutioN APP
   </header>
   )
}

export default HomeHeader
