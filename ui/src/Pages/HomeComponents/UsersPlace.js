import React from 'react';
import socket from '../../socket';
import {useHistory} from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { messengerContext } from '../../Context/MessengerContext';

function UsersPlace () {
    const { YoumiChatRooms } = React.useContext( messengerContext )
    const [users, setUsers] = React.useState([]);
    const { user, setUser } = React.useContext( AuthContext );
    const History = useHistory();

    React.useEffect(() => {
        const InitialGetUsers = async () => {
            try{
                let ReqForUsers = socket.emit("getUsers_forPAGE", {});
                socket.on("all_Users_PAGE", ({users, err}) => {
                    if(err !== "noError"){
                        alert(err)
                    } else {
                        setUsers(users)
                    }
                })
            }catch(err){
                alert(err)  
            }
        }
        InitialGetUsers();
    }, [user]);

    return (
        <div className="Container_users_forPages">
            here will be usersff
            {
                users && users.map(usr => {
                    return <div usr={users} key={usr._id}>
                        {usr.username}
                        {usr._id}
                        <button onClick={async () => {
                          try{
                            let authID = user._id;
                            let userID = usr._id;
                            let authUsername = user.username;
                            let userUsername = usr.username;
                            let ReqSERVER_for__Create__NEWChatRoom = await socket.emit("initial_ChatRoom", { authID, userID, authUsername, userUsername });
                            socket.on("initial_ChatRoom_Response", async ({error, chatRoomkey}) => {
                                console.log("thisis", chatRoomkey)
                                if(error !== "noError"){
                                    alert(error)
                                }else {
                                    History.push(`/MessengerYoumi/${chatRoomkey}`)
                                }
                            })
                            }catch(err){
                                alert(err)
                            }
                        }}>send message</button>
                    </div>
                })
            }
        </div>
    )
}

export default React.memo(UsersPlace);
