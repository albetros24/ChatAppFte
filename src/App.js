

import './App.css';
import Header from './components/Header';
// import Chat from './components/chat';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { io } from 'socket.io-client'
import Cookies from 'js-cookies'
import { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
function App() {

  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    
    setSocket(io("http://localhost:8000"));
    const  _userId=Cookies.getItem('userId');
   if(userId)
   {
     setUserId(_userId)
   }
  }, [])


  return (
    <>
      

        <Container>
        <Header socket={socket} userId={userId}   setUserId={setUserId}  />
      
          <Outlet context={{socket,userId}} />
      
      </Container>
    </>
 
  );
}

export default App;
