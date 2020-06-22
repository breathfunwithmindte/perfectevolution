import React from 'react';
import './homeheader.css'
import { AuthContext } from '../../Context/AuthContext';
import { themeContext } from '../../Context/ThemeContext';
import { BsFillGearFill } from 'react-icons/bs';
import HeaderSettingsDialog from './HeaderSettingsDialog';


function HomeHeader() {
   const { user } = React.useContext( AuthContext );
   const { theme } = React.useContext( themeContext );



   return (
      <header className="homeheader_container">
         <img src="https://res-console.cloudinary.com/perfectevolutionsite/thumbnails/v1/image/upload/v1592463697/c2FtcGxl/preview" alt="" className="homeheader_coverImage" />
         <img src="https://res-console.cloudinary.com/perfectevolutionsite/thumbnails/v1/image/upload/v1592463697/c2FtcGxl/preview" alt="" className="homeheader_profileImage" />
         <div style={{marginTop: "-5%"}}>
            <h3>
               {user.firstName}
            </h3>
            <BsFillGearFill />
            <BsFillGearFill />
            <HeaderSettingsDialog />
         </div>
         

         
      </header>
   )
}

export default HomeHeader
