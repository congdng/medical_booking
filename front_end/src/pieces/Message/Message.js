import React from "react";

const Message = ({ children }) => {
  return (
    <div
      className='mb-4 rounded-lg bg-red-200 px-6 py-5 text-base text-red-800'
      role='alert'
    >
      {children}
    </div>
  );
};

export default Message;
