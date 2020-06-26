import React from 'react';
import { messengerContext } from '../../Context/MessengerContext'
import { AuthContext } from '../../Context/AuthContext';
import "../messenger.css"
import { useHistory } from 'react-router-dom';


export default function ChatRooms () {
    const { MyChatRooms, YoumiChatRooms, GroupChatRooms } = React.useContext( messengerContext );
    const { user } = React.useContext( AuthContext );
    const [loading, setloading] = React.useState(true);
    const [youmiORgroup, setYoumiORgroup] = React.useState("youmi")
    const [RenderedYoumiChatRooms, setRenderedYoumiChatRooms] = React.useState([]);
    const [RenderedGroupChatRooms, setRenderedGroupChatRooms] = React.useState([]);
    const History = useHistory();
    console.log(MyChatRooms, YoumiChatRooms, GroupChatRooms)
    
    React.useEffect(() => {
        setRenderedGroupChatRooms(GroupChatRooms);
        setRenderedYoumiChatRooms(YoumiChatRooms);
        setTimeout(() => {
            setloading(false)
        }, 936);
    }, [YoumiChatRooms, GroupChatRooms])

    if(loading===true) return(
        <div className="messenger_chatrooms_container">
            <img className="messenger_chatrooms_images_whenLoading"/>
            <img className="messenger_chatrooms_images_whenLoading"/>
            <img className="messenger_chatrooms_images_whenLoading"/>
            <img className="messenger_chatrooms_images_whenLoading"/>
            <img className="messenger_chatrooms_images_whenLoading"/>
        </div>
    )
    else if(youmiORgroup === "youmi") return (
        <div className="messenger_chatrooms_container">
            <button className="messenger_changetype_button" onClick={()=>setYoumiORgroup("group")}>Group ChatRooms</button>
            <div>
                {RenderedYoumiChatRooms.length === 0 ? <div>No Data</div> : <div>
                {RenderedYoumiChatRooms && RenderedYoumiChatRooms.map(youmi => {
                    return <div youmi={RenderedYoumiChatRooms} key={youmi._id}>
                        <img src={youmi.users.find(debbie=>debbie._id !== user._id) ? youmi.users.find(debbie=>debbie._id !== user._id).profileImage : "" } className="messenger_chatrooms_images_whenLoading" onClick={() => {
                            History.push(`/MessengerYoumi/${youmi.messengerKEY}`)
                        }}/>
                        <hr />
                        </div>
                })}</div>}
            </div>
        </div>
    )
    else if(youmiORgroup === "group") return(
        <div className="messenger_chatrooms_container">
            <button className="messenger_changetype_button" onClick={()=>setYoumiORgroup("youmi")}>Youmi ChatRooms</button>
            <div>
                {RenderedGroupChatRooms.length === 0 ? <div>No Data</div> : <div>
              {RenderedGroupChatRooms && RenderedGroupChatRooms.map(youmi => {
                    return <div youmi={RenderedGroupChatRooms} key={youmi._id}>
                        <img src={youmi.users.find(debbie=>debbie._id !== user._id) ? youmi.users.find(debbie=>debbie._id !== user._id).profileImage : "" } className="messenger_chatrooms_images_whenLoading" onClick={() => {
                            History.push(`/MessengerYoumi/${youmi.messengerKEY}`)
                        }}/>
                        <hr />
                        </div>
                })}</div>}
            </div>
        </div>
    )
}