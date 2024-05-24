import React, {useState} from 'react'
import LeftPane from './LeftPane'
import RightPane from './RightPane'

export const ChatConversations = ({socket}) => {
    const [activeTab, setActiveTab] = useState(0)

    return (
        
        <div className=' flex'>
            <LeftPane activeTab={activeTab} setActiveTab={setActiveTab} />
            <RightPane socket={socket} activeTab={activeTab}/>

        </div>
    )
}