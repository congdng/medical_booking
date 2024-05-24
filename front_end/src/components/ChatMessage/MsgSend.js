import React, { useState } from "react";
import { getSocket } from "../../screens/Chat/socket";
import { useSelector } from "react-redux";
function MsgSend({ activeTab }) {
  const { chatList } = useSelector((state) => state.chatListGET);
  const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
  const [msg, setMsg] = useState('')
  const socket = getSocket()
  const convoId = chatList[activeTab]._id
//   async function submitToDatabase(){
//     const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//           user_id: prf.user_id,
//           text: msg,
//           date_created: new Date(),
//           convo_id: convoId
//       })
//   }
//   try {
//       await fetch("http://localhost:8080/saveMessage", requestOptions)
//           .then(response => response.json())
//           .then(responseData => {
//               const { status, data } = responseData
//               if (status === "completed") {
//                 console.log(status)             
//                 updateLastMessage(data._id, convoId)
//               }      
//               else {
//                   const { error } = data
//                   alert("Error: " + error)
//               }
//           })
//   } catch (error) {
//       console.log(error)
//   }
//   }

//   async function updateLastMessage(lastMessId, ConvoId) {
  
//     const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//           last_mess: lastMessId, 
//           convo_id: ConvoId
//       })
//   }

//   try {
//     await fetch("http://localhost:8080/updateLastMess", requestOptions)
//       .then(response => response.json())
//       .then(responseData => {
//           const {status} = responseData
//           if (status === "completed") {
//             console.log("updated successfully")
//           }      
//           else {
//               const { error } = responseData
//               alert("Error: " + error)
//           }
//       })
//   } catch (error) {
//     console.log(error)
//   }
// }


  function submit() {
    if (msg.length === 0) {
      alert("Please type something")
    }
    else {
      socket.emit('send-message', {
        convo_id: convoId,
        text: msg,
        user_id: userInfo._id,
        name: userInfo.name
      })
      setMsg('')
    }

  }


  return (
    <div className='border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0'>
      <div className='relative flex'>
        <input
          type='text'
          placeholder='Write your message!'
          className='w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3'
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <div className='absolute right-0 items-center inset-y-0 hidden sm:flex'>
          <button
            type='button'
            className='inline-flex items-center justify-center 
            rounded-lg px-4 py-3 
            transition duration-500 ease-in-out
           text-white bg-blue-500 hover:bg-blue-400 focus:outline-none'
            onClick={submit}
          >
            <span className='font-bold'>Send</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MsgSend