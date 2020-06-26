import React from 'react';
import { messengerContext } from '../Context/MessengerContext'
import { AuthContext } from '../Context/AuthContext';
import "./messenger.css"
import { useHistory } from 'react-router-dom';


 function GlobalMessenger () {
    const { MyChatRooms, YoumiChatRooms, GroupChatRooms } = React.useContext( messengerContext );
    const { user } = React.useContext( AuthContext );
    const [loading, setloading] = React.useState(true);
    const [youmiORgroup, setYoumiORgroup] = React.useState("youmi")
    const [RenderedYoumiChatRooms, setRenderedYoumiChatRooms] = React.useState([]);
    const [RenderedGroupChatRooms, setRenderedGroupChatRooms] = React.useState([]);

    const [currentChatRoom, setCurrentChatRoom] = React.useState(null);
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
        <div className="messenger_Global_chatrooms_container">
            <img className="messenger_chatrooms_images_whenLoading"/>
            <img className="messenger_chatrooms_images_whenLoading"/>
            <img className="messenger_chatrooms_images_whenLoading"/>
            <img className="messenger_chatrooms_images_whenLoading"/>
            <img className="messenger_chatrooms_images_whenLoading"/>
        </div>
    )
    else if(youmiORgroup === "youmi") return (
        <div className="messenger_Global_chatrooms_container">
            <button className="messenger_changetype_button" onClick={()=>setYoumiORgroup("group")}>Group ChatRooms</button>

             {/* H E R E   WILL BE   C H A T R O O M S */}
            <div>
                {RenderedYoumiChatRooms.length === 0 ? <div>No Data</div> : <div>
                {RenderedYoumiChatRooms && RenderedYoumiChatRooms.map(youmi => {
                    return <div youmi={RenderedYoumiChatRooms} key={youmi._id}>
                        <img src={youmi.users.find(debbie=>debbie._id !== user._id) ? youmi.users.find(debbie=>debbie._id !== user._id).profileImage : "" } className="messenger_chatrooms_images_whenLoading" onClick={() => {
                            setCurrentChatRoom(youmi)
                        }}/>
                        <hr />
                        </div>
                })}</div>}
            </div>

                {/* H E R E   WILL BE   B O X   FOR   M E SS A G I N G */}
               {currentChatRoom === null ? null : <div className="messenger_global_nana">
                    <header>
                        <button onClick={()=>setCurrentChatRoom(null)}>close</button>
                    </header>
                    <main className="main_body_messengerGLOBAL">
                        here will be main body
                        here will be main body
                        here will be main body
                        here will be main body
                        here will be main body
                    </main>
                    <div>
                        here will be input
                    </div>
                </div>}
           

        </div>
    )





    else if(youmiORgroup === "group") return(
        <div className="messenger_Global_chatrooms_container">
            <button className="messenger_changetype_button" onClick={()=>setYoumiORgroup("youmi")}>Youmi ChatRooms</button>
            {/* H E R E   WILL BE   C H A T R O O M S */}
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
            {/* H E R E   WILL BE   B O X   FOR   M E SS A G I N G */}
            <div> 
            </div>


        </div>
    )
}

export default React.memo(GlobalMessenger);