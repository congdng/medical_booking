import React, { useEffect, useState } from "react";

import MsgSend from "../../../page/message/msgcomp/MsgSend";
import ItemList from "../../../page/message/ItemList";

const ChatBox = ({socket, convoArray, prf, activeTab, setRunValue}) => {
    const testConvo = convoArray[activeTab]
    const [msgList, setMsgList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    async function getMessage(convoId) {
        try {
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ convo_id: convoId })
          }
          await fetch("http://localhost:8080/findMessage", requestOptions)
            .then(response => response.json())
            .then(data => {
                setMsgList(data.data)
                // console.log(data.data)
            })
            
        }
        catch (err) {
          console.log(err)
        }
    
      }



    useEffect(()=>{
        socket.connect()
        setIsLoading(true)
        getMessage(testConvo._id)
        socket.on('user-chat:::'+testConvo._id, (response)=> {
          setMsgList(msgList => [...msgList,response]);  
        })   
        setIsLoading(false)
        return ()=>{
          socket.off('user-chat:::'+testConvo._id)
        socket.disconnect()
      }
        
      },[msgList, activeTab])

    // console.log("testid neeeee:" ,testConvo)
    if (isLoading){
        console.log(isLoading)
        return <div>Loading...</div> 
    }
    return (<div className='content-start flex flex-col flex-wrap items-start grow p-6'>
        <div className='flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen w-full'>
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
                            <span className='text-gray-700 mr-3'>{prf.role === 'patient' ? testConvo.dtid?.user_id?.name : testConvo.pid?.user_id?.name}</span>
                        </div>
                        <span className='text-lg text-gray-600'>{prf.role === 'patient' ? testConvo.dtid?.user_id?.role : testConvo.pid?.user_id?.role}</span>
                    </div>
                </div>
            </div>
            <div
                id='messages'
                className='flex flex-col space-y-6 p-3 h-[400px] overflow-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'
            >
                {/* <MSSingle msg = "Please give me full instruction on exercise"/>
    <MRSingle msg = "You should make an appointment on this Tuesday."/>
    <MSDouble msglist = {["What about Friday?","I have compulsory work on Tuesday"]}/>
    <MRSingle msg = "Okay, go to our website to make that appoiment. I make time for you."/>
    <MSSingle msg = "Thank you doctor."/> */}

                <ItemList items={msgList}/>

            </div>
            <MsgSend socket={socket} convoId={testConvo._id}/>

        </div>
    </div>)

}

export default ChatBox