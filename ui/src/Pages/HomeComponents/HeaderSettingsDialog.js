import React from 'react'
import { BsFillGearFill, BsPentagonFill, BsPentagonHalf, BsPentagon, BsPlug} from 'react-icons/bs';
import './homeheader.css';
import { AuthContext } from '../../Context/AuthContext';
import { themeContext } from '../../Context/ThemeContext';
import socket from '../../socket'
import CircularProgress from '@material-ui/core/CircularProgress';

function HeaderSettingsDialog() {
   const [open, setOpen] = React.useState(false)
   const { theme, setTheme } = React.useContext( themeContext );
   const { user } = React.useContext( AuthContext );
   const [loading, setLoading] = React.useState(false);
   console.log(theme)
   

   return (
      <div>
         <BsFillGearFill onClick = {() => setOpen(true)} />
         <div className="DialogHeaderBackground" onClick={() => setOpen(false)} style={{display: `${open === true? "flex" : "none"}`, flexDirection: "column"}}>
          {loading === true ? <CircularProgress color="secondary" /> :
          <div>
               <button className="Button_Settings" onClick={async () => {
                  setLoading(true)
                 let ReqServer = await socket.emit("changeTheme", {authID: user._id, theme: "dark"});
                 socket.on("AnswerTheme", ({error}) => {
                    if(error === undefined) {
                       setTheme("dark");
                       setLoading(false)
                    }
                    else {
                       setTimeout(() => {
                          alert("smth went wrong refresh the page !!")
                       }, 3369);
                    }
                 })
               }}>
                  DarkTheme <BsPentagonHalf />
               </button>

               <button className="Button_Settings" onClick={ async () => {
                      setLoading(true)
                      let ReqServer = await socket.emit("changeTheme", {authID: user._id, theme: "light"});
                      socket.on("AnswerTheme", ({error}) => {
                         if(error === undefined) {
                            setTheme("light");
                            setLoading(false)
                         }
                         else {
                            setTimeout(() => {
                               alert("smth went wrong refresh the page !!")
                            }, 3369);
                         }
                      })
               }}>
                  LightTheme <BsPentagon />
               </button>

               <button className="Button_Settings" onClick={ async () => {
                      setLoading(true)
                      let ReqServer = await socket.emit("changeTheme", {authID: user._id, theme: "black"});
                      socket.on("AnswerTheme", ({error}) => {
                         if(error === undefined) {
                            setTheme("black");
                            setLoading(false)
                         }
                         else {
                            setTimeout(() => {
                               alert("smth went wrong refresh the page !!")
                            }, 3369);
                         }
                      })
               }}>
                  Total Black Theme  <BsPentagonFill />
               </button>

               <button className="Button_Settings">
                  Settings <BsFillGearFill />
               </button>

               <button className="Button_Settings">
                  Log Out <BsPlug />
               </button>
               </div>
                }
         </div>
      </div>
   )
}

export default HeaderSettingsDialog
