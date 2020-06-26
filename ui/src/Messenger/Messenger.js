import React from 'react';
import { AuthContext } from '../Context/AuthContext';
import { themeContext } from '../Context/ThemeContext';
import { messengerContext } from '../Context/MessengerContext'
import "./messenger.css";
import socket from '../socket';
import { useHistory } from 'react-router-dom';
const NavBarMessenger = React.lazy(() => import("../NavBar/NavBarMessenger"));
const ChatRoomsFunction = React.lazy(() => import("./messenger/ChatRooms"));
const ChatBox = React.lazy(() => import("./messenger/ChatBox"));

 function Messenger (props) {
    const { MyChatRooms } = React.useContext( messengerContext );
    const { user } = React.useContext( AuthContext );
    const { theme } = React.useContext( themeContext );
    const [chatRoom, setChatRoom] = React.useState("");
    const [loading, setloading] = React.useState(true);
    const [ userTalk, setUsetTalk ] = React.useState("")
   
   const History = useHistory();

    React.useEffect(() => {
        const InitialChatRoom = async () => {
            try{
                let messengerKEY = await props.match.params.chatRoom_KEY;
                let sendIDtoSERVERforChatRoom = await socket.emit("getChatRoom", {messengerKEY});
                socket.on(`chatroom_${messengerKEY}`, ({data}) => {
                    console.log("AA", data)
                    if(data === null || data === undefined){
                        alert("smth went wrong")
                    }
                    else if(user.messenger.some(x=>x===data.messengerKEY) === false){
                        History.push("/")
                    }else {
                        setChatRoom(data)
                        setUsetTalk(data.users.find(debbie => debbie._id !== user._id))
                        setloading(false)
                    }   
                })
            }catch(err){
                alert("smth went wrong with youmi messenger system")
            }
        }
        InitialChatRoom();
    }, [props.match.params.chatRoom_KEY])


    if(theme === "light")
    return(
        <div>
            <NavBarMessenger />
            <div className="messenger_container__LIGHT">
               <ChatRoomsFunction />
               {loading === true ? null : <ChatBox ChatRoom_BOX={chatRoom} authID={user._id}/>}
                
                {loading === true ? null : <div className="messenger_settings_container">
                       <img src={userTalk.profileImage} alt="" className="messenger_photo_design"/>
                       <div className="messenger_laneWithstyle">
                       <hr />
                       <p>{userTalk.firstName}</p>
                       <hr />
                       </div>
                 </div> }
            </div>
        </div>
    )
   else if(theme === "dark")
    return(
        <div>
            <NavBarMessenger />
            <div className="messenger_container__DARK">
                    <ChatRoomsFunction />
                    {loading === true ? null : <ChatBox ChatRoom_BOX={chatRoom} authID={user._id}/>}
                    {loading === true ? null : <div className="messenger_settings_container">
                        <img src={userTalk.profileImage} alt="" className="messenger_photo_design"/>
                        <div className="messenger_laneWithstyle">
                       <hr />
                       <p>{userTalk.firstName}</p>
                       <hr />
                       </div>
                    </div> }
            </div>
        </div>
    )
   else if(theme === "black")
    return(
        <div>
            <NavBarMessenger />
            <div className="messenger_container__BLACK">
                    <ChatRoomsFunction />
                    {loading === true ? null : <ChatBox ChatRoom_BOX={chatRoom} authID={user._id}/>}
                    {loading === true ? null : <div className="messenger_settings_container">
                       <img src={userTalk.profileImage} alt="" className="messenger_photo_design"/>
                       <div className="messenger_laneWithstyle">
                       <hr />
                       <p>{userTalk.firstName}</p>
                       <hr />
                       </div>
                    </div> }
            </div>
        </div>
    )
}

export default React.memo(Messenger);