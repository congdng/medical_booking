import React from "react";

const MSSingle = ({msg}) =>{
    return (<div className='chat-message'>
    <div className='flex items-end'>
      <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start'>
        <div>
          <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600'>
            {msg}
          </span>
        </div>
      </div>
      <img
        src='https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144'
        alt='My profile'
        className='w-6 h-6 rounded-full order-1'
      />
    </div>
  </div>)
}
export default MSSingle