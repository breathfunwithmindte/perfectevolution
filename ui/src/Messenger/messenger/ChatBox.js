import React from 'react';
import "../messenger.css";
import socket from '../../socket';
import LinearProgress from '@material-ui/core/LinearProgress';

function ChatBox (props) {
    const [messages, setMessages] = React.useState([])
    const [newmsg, setnewmsg] = React.useState("");
    const [loading, setloading] = React.useState(false);

    React.useEffect(() => {
        console.log("nnanan==>>>", props)
        if(props.ChatRoom_BOX !== "" || props.ChatRoom_BOX !== undefined){
            console.log("here==>>>", props.ChatRoom_BOX)
            setMessages(props.ChatRoom_BOX.messages);
            setloading(false)
        }
    }, [props.ChatRoom_BOX])

    const SendMessage = async (event) => {
        try{
            if(event.key === "Enter" && props.ChatRoom_BOX !== "loading"){
              let sendMessageToSERVER = await socket.emit("send_message", {newmsg, messengerKEY: props.ChatRoom_BOX.messengerKEY, authID: props.authID});
            }
        }catch(err){
            alert(err)
        }
    }

    if(props.ChatRoom_BOX === "loading") return <LinearProgress color="secondary" />
    else return(
        <div className="ChatBox_container"> 
            <div>
                here will be title
            </div>
            <hr style={{width: "99%"}}/>
            <div style={{width: "97%", padding: "0.7vw"}}>
                {
                    loading === true ? <LinearProgress color="secondary" /> :
                    <div>
                        {messages.length === 0 ? <p>No messages yet, say hello to {""}</p> : <div>
                            {messages && messages.map(msg => {
                                return <div msg={messages} key={msg._id}>
                                        {msg.type}
                                        {msg.message}
                                    </div>
                            })}
                            </div>}
                    </div>
                }
            </div>
            <div className="ChatBox_imput_messenger">
                <input id="messages_id" type="text" name="messages" value={newmsg} style={{width: "98%", minHeight: "23px", maxHeight: "2.3vh", fontSize: "14px", letterSpacing: "1px", padding: "0.4vw"}} onChange={(event) => {
                    setnewmsg(event.target.value)
                }}  onKeyPress={SendMessage} />
            </div>
        </div>
    )
}

export default React.memo(ChatBox);