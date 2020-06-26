import React from 'react';
import socket from '../socket';
import { AuthContext } from './AuthContext'

export const messengerContext = React.createContext();

export default ({ children })=>{
    const [MyChatRooms, setMyChatRooms] = React.useState([]);
    const [YoumiChatRooms, setYoumiChatRooms] = React.useState([]);
    const [GroupChatRooms, setGroupChatRooms] = React.useState([]);
    const { user } = React.useContext( AuthContext );
    
    React.useEffect(()=>{
        const getChatRooms = async () => {
            let sendAuthSERVER = await socket.emit("mychatrooms", {authID: user._id})
            socket.on(`chatrooms_${user._id}`, ({chatrooms}) => {
                setMyChatRooms(chatrooms);
                setYoumiChatRooms(chatrooms.filter(ctrm=>ctrm.type === "youmi"));
                setGroupChatRooms(chatrooms.filter(ctrm=>ctrm.type === "Group"))
            })
        }
        getChatRooms();
    },[user]);

    return (
        <div>
            <messengerContext.Provider value={{MyChatRooms, YoumiChatRooms, GroupChatRooms}}>
                { children }
            </messengerContext.Provider>
        </div>
    )
}