import React, { useEffect, useState } from 'react';
import NoConversations from './NoConversations';
import { useDispatch, useSelector } from "react-redux";
import { getSocket, socketDisconnect, socketInit } from './socket';
import { get_chatlist } from "../../actions/chatActions";
import { ChatConversations } from "./ConversationAvailable/ChatConversations";
import Message from "../../pieces/Message/Message";

const numberOfConvo = (length, role, socket)=>{
    if (length===0){
    return <NoConversations role={role}/>
    } else if (length >0) {
        return <ChatConversations socket={socket}/>
    }
    else if (length === undefined) return <Message>Error. Please Refresh</Message>
}

const DoctorChatScreen = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const {loading, error, chatList}= useSelector((state) => state.chatListGET);
    const socket = getSocket()
    const [message, setMessage] = useState("")
    const doctorConnectChat = ()=>{
        console.log(socket)
        socket.emit('doctor-connect', {
         id: userInfo._id, name: userInfo.name
          })
    }
    useEffect(()=>{
        if(userInfo){
            dispatch(get_chatlist(userInfo._id, userInfo.role))
        }
    },[message])
    useEffect(()=>{
        
        socketInit()
        doctorConnectChat()
        socket.on('send-to-doctor-'+userInfo._id, (data)=>{
            setMessage(data)
            dispatch(get_chatlist(userInfo._id, userInfo.role))
        })
        return ()=>{
            socketDisconnect()
        }        
        
}
,[])
return <div>
{numberOfConvo(chatList?.length, userInfo.role, socket)}
</div>
}

export default DoctorChatScreen