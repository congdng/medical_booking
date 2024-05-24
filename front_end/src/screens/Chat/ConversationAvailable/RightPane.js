import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// import Button from '../../../pieces/Button/Button'
// import MRSingle from '../../../components/ChatMessage/MsgReceiverSgl.js'
// import MSDouble from '../../../components/ChatMessage/MsgSenderDbl.js'
// import MSSingle from '../../../components/ChatMessage/MsgSenderSgl.js'
import MsgSend from '../../../components/ChatMessage/MsgSend.js'
import { getSocket } from '../socket.js'
import ItemList from '../MsgList/ItemList.js'

const RightPane = ({activeTab}) => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const { chatList } = useSelector((state) => state.chatListGET);
    const socket = getSocket()
    const convo = chatList[activeTab]
    const [msgList, setMsgList] = useState([])
    console.log("MSG LIST", msgList)
    useEffect(()=>{
        socket.on('convo::'+convo._id, (data)=>{
            setMsgList(msgList =>[...msgList, data])
        })
        return ()=>{
            socket.off('convo::'+convo._id)
        }
    },[])
    return (
        <div className='content-start flex flex-col flex-wrap items-start grow p-6 '>
        <div className='flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen w-[200%]'>
            <div className='flex sm:items-center justify-between py-3 border-b-2 border-gray-200'>
                <div className='relative flex items-center space-x-4'>
                    <div className='relative'>
                        <span className='absolute text-green-500 right-0 bottom-0'>
                            <svg width='20' height='20'>
                                <circle
                                    cx='8'
                                    cy='8'
                                    r='8'
                                    fill='currentColor'
                                ></circle>
                            </svg>
                        </span>
                        <img
                            src='https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144'
                            alt=''
                            className='w-10 sm:w-16 h-10 sm:h-16 rounded-full'
                        />
                    </div>
                    <div className='flex flex-col leading-tight'>
                        <div className='text-2xl mt-1 flex items-center'>
                            <span className='text-gray-700 mr-3'>{userInfo.role === 'patient' ? convo.dtid?.name : convo.pid?.name}</span>
                            {/* <span className='text-gray-700 mr-3'>Nguyen Van A</span> */}
                        </div>
                        <span className='text-lg text-gray-600'>{userInfo.role === 'patient' ? convo.dtid?.role : convo.pid?.role}</span>
                        {/* <span className='text-lg text-gray-600'>Patient</span> */}
                    </div>
                </div>
            </div>
            <div
                id='messages'
                className='flex flex-col space-y-6 p-3 h-[400px] overflow-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'
                >
                    {/* <MSSingle msg="Please give me full instruction on exercise" />
                    <MRSingle msg="You should make an appointment on this Tuesday." />
                    <MSDouble msglist={["What about Friday?", "I have compulsory work on Tuesday"]} />
                    <MRSingle msg="Okay, go to our website to make that appoiment. I make time for you." />
                    <MSSingle msg="Thank you doctor." /> */}


                    <ItemList items= {msgList}/>
                </div>
                <MsgSend activeTab={activeTab}/>
            </div>
        </div>
    )
}

export default RightPane