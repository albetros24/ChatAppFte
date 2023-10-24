import React from 'react'
import { useEffect } from 'react'
import { useOutletContext, useParams } from "react-router-dom";
import Chat from '../components/chat';
import { Typography } from '@mui/material';
// import  {io }from 'socket.io-client'
function ChatRoom() {
  const param = useParams()
   const { socket } = useOutletContext();
  useEffect(() => {
    console.log(param.roomId)
    if(!socket) return;
   socket.emit('join-room',{roomId: param.roomId})
  }, [socket])
  
  return (
    <>
    <Typography variant="h3" sx={{textAlign:"center",marginTop:5}}>Chat Room</Typography>
       <Chat/>
    </>

  )
}

export default ChatRoom
