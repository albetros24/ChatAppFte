import React from 'react'
import Typography from "@mui/material/Typography";
import '@fontsource/roboto/700.css';
import img1 from './img1.gif'
function Home() {
  return (
    <div style={{ display:'flex',alignItems:'center', justifyContent:"center",textAlign:"center",flexWrap:"wrap"}}>
        <h1>Welcome to my Chat App</h1>
        <img src={img1}
         alt=" messaage" />
    </div>
  )
}

export default Home
