import React, { useEffect, useState } from "react"
import Loader from "../../pieces/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { create_chat, get_chatlist } from "../../actions/chatActions";
import Message from "../../pieces/Message/Message";
import NoConversations from "./NoConversations";
import { getSocket, socketDisconnect, socketInit } from "./socket";
import { ChatConversations } from "./ConversationAvailable/ChatConversations";
const numberOfConvo = (length, role, onlineList, func, socket)=>{
    if (length===0){
    return <NoConversations role={role} onlineList={onlineList} func={func}/>
    } else if (length >0) {
        return <ChatConversations socket={socket}/>
    }
    else if (length === undefined) return <Message>Error. Please Refresh</Message>
}


const PatientChatScreen = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const {loading, error, chatList, message}= useSelector((state) => state.chatListGET);
   
    const [onlineList, setOnlineList] = useState([])
    const socket = getSocket()

    useEffect(()=>{
        if(userInfo){
            dispatch(get_chatlist(userInfo._id, userInfo.role))
        }
    },[message])

    useEffect(()=>{
        socketInit()
        socket.on('connect', ()=>{
            socket.emit('requestDoctorOnlineList')
        })
        socket.on('doctor-online-list', (data)=>{
            setOnlineList(data)
        })
        return ()=>{
            socketDisconnect()
        }        
    },[])
    
    const createChat = (doctorID, role)=>{
        dispatch(create_chat(doctorID, role))
        socket.emit('create-chat-doctor-signal', {doctor_id:doctorID, user_id: userInfo._id})
    }
return(
    <>
    {loading? <Loader/>:
    error? <Message>{error}</Message>:
    (
        <>{numberOfConvo(chatList?.length, userInfo.role, onlineList, createChat, socket)}</>
    )}
    


</>
)


}

export default PatientChatScreen