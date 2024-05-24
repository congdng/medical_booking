import React from "react";
import { io } from "socket.io-client";

export const host = "http://localhost:8000"


export const socket = io(host, {
  autoConnect: false
})
export const socketInit = () => {
      socket.connect()
  };
  
  export const socketDisconnect = () => {
    if (socket) socket.disconnect();
  };
  
  export const getSocket = () => socket;