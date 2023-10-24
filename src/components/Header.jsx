import { Card,Button ,Box} from '@mui/material'
import React from 'react'
import Cookies from 'js-cookies'
import {useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import Home from '../pages/Home'
import { v4 as uuidv4 } from 'uuid';
function Header({socket,userId, setUserId}) {
       const [rooms,setRooms]=useState([]) //for storing rooms
     const navigate=useNavigate();


     function login(){
      const userId= uuidv4();
      setUserId(userId);
      Cookies.setItem('userId',userId);
      navigate(`/`);

   }

   function logout(){
    setUserId(null)
    Cookies.removeItem('userId');
    navigate(`/`);
  }
    function createNewRoom(){
      //for creating new room
      const roomId = uuidv4();
      navigate(`/room/${roomId}`) //for navigating to new room
      socket.emit('new-room-created',{roomId,userId})
      setRooms([...rooms,roomId]);
    }
    useEffect(() => {
      async function fetchRooms() {
        const res = await fetch("http://localhost:8000/rooms");
        const {rooms} = await res.json();
        // console.log(data);
        setRooms(rooms);
      }
      fetchRooms();
    }, []);


    useEffect(() => {
      if(!socket) return;
    socket.on('new-room-created',({room})=>{
      setRooms([...rooms,room]);
    })
    socket.on('room-removed',({roomId})=>{
      setRooms(rooms.filter(room =>room.roomId !==roomId));
    })
      }, [socket])
    //to fetch all the rooms
    
   
  return (
    <Card sx={{marginTop:5, padding:"0 3",backgroundColor:'#468B97'}}>
      <Box sx={{display:"flex",justifyContent:"space-between"}}>

    <Box>
    <Link to="/"  style={{ textDecoration:"none"}}>
         <Button  sx={{ color:"white"}}>
           Home
         </Button>
       </Link>
   
       


      {/* <Link  to="/chat" style={{ textDecoration:"none"}}>
      <Button sx={{ color:"white"}}>
          Chats
         </Button>
      </Link> */}

    
{rooms.map((room) => (
            <Link
              key={room._id}
              style={{ textDecoration: "none" }}
              to={`/room/${room.roomId}`}
            >
              <Button sx={{ color: "white" }} variant="text">
                {room.name}
              </Button>
            </Link>
          ))}
           </Box>
      {/* button  for creating new room */}
      <Box>
          {userId && (
            <>
              <Button
                sx={{ color: "white" }}
                variant="text"
                onClick={createNewRoom}
              >
                New Room
              </Button>
              <Button sx={{ color: "white" }} variant="text" onClick={logout}>
                Logout
              </Button>
            </>
          )}

          {!userId && (
            <Button sx={{ color: "white" }} variant="text" onClick={login}>
              Login
            </Button>
          )}
        </Box>
     
         </Box>
    </Card>
  )
}

export default Header
