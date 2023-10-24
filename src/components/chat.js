import React from 'react'

import { useEffect, useState,useRef } from 'react';
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
//import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
 import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AttachFileIcon from '@mui/icons-material/AttachFile';
// import { useOutletContext} from "react-router-dom";
// import TextField from '@mui/material/TextField';

import SendIcon from '@mui/icons-material/Send';
// import { io } from 'socket.io-client'
import { Link } from 'react-router-dom';
function Chat() {
    // const [socket, setSocket] = useState(null);
  const [message, setmessage] = useState('')
  const [chat, setchat] = useState([])
    const [typing, settyping] = useState(false)
    const {roomId}= useParams();
   const navigate= useNavigate();

  const { socket } = useOutletContext();
  useEffect(() => {
    if (!socket)
      return;

    socket.on('message-from-server', (data) => {
      setchat((prevchat) => [...prevchat, {message:data.message,recieved:true}])
      console.log(data.message)
      //typing event
        socket.on('typing-started-from-server',()=>{
            settyping(true)
            console.log('typing....')
           
        });
        socket.on('typing-stopped-from-server',()=>{
            console.log('typing stopped')
            settyping(false)
        })
    })

  }, [socket])


  const [typingTimeout, settypingTimeout] = useState(null);
  function handleInput(e)
  {
    setmessage(e.target.value);
    socket.emit("typing-started", {roomId});
    if(typingTimeout)clearTimeout(typingTimeout)
    settypingTimeout(setTimeout(()=>{
          socket.emit("typing-stopped",{roomId});
    },1000)); 

  }



  function handleForm(e) {
    e.preventDefault();
       console.log(message)
    //sending an event to the server
    socket.emit('sent-message', { message, roomId })
    setchat((prevchat) => [...prevchat, {message, recieved: false}])
    setmessage('')
  }
 //for room id
 async function removeRoom() {
  await fetch(`http://localhost:8000/rooms/${roomId}`,{
    method:"DELETE",
  })
  socket.emit("room-removed", { roomId });
  navigate("/");
}

const fileRef = useRef();
  return (

  
          <Box sx={{display:"flex", justifyContent:"center"}}>

            <Card sx={{
              padding:2,
               marginTop:10,
               width:"60%",
                backgroundColor:"#12486B",
    }}>
      <Container>
        <Box sx={{ marginBottom: 5 }}>
          {
            chat.map((data) => {
              return (
                <Typography sx={{
                  marginBottom: 1,
                  padding: 1,
                  borderRadius: 1,
                  backgroundColor: data.recieved ? "white" : "#78D6C6",
                  color: "black",
                  width:"fit-content",
                   alignItems:data.recieved ==="true"? "left" : "right",
                    alignSelf:data.recieved ==="true"? "left" : "right",

                }}
                key={roomId}>{data.message}</Typography>
              )

            })
          }
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {roomId && <Typography>Room: {roomId}</Typography>}
        {roomId && (
          <Button
            size="small"
            variant="text"
            color="secondary"
            onClick={removeRoom}
          >
            Delete Room
          </Button>
        )}
      </Box>

        <Box component='form' onSubmit={handleForm}>
        {typing && (
          <InputLabel sx={{ color: "white" }} shrink htmlFor="message-input">
            Typing...
          </InputLabel>
        )}
          <OutlinedInput
              id="message-input"
             sx={{

              backgroundColor:"white",
              width:"100%",
             }}
            size='small'
            value={message}
            label="Write your message here..."
            placeholder="Write your message here..."
            onChange={handleInput}
            
            endAdornment={
              <InputAdornment position="end">
                 <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  type='submit'
                >
                  <AttachFileIcon  />
                </IconButton>
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  type='submit'
                 sx={{ marginRight:1}}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }

          />

        </Box>

      </Container>

    </Card>
    </Box>

   
 
  );
}

export default Chat
