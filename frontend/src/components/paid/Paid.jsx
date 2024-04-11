import React, { useEffect, useState } from 'react'
import socketIO from "socket.io-client"
import "./paid.css"
import ScrollToBottom from "react-scroll-to-bottom"
const Paid = () => {

 

const ENDPOINT = 'http://localhost:4000/'
const socket = socketIO(ENDPOINT,{transports:['websocket']})

const[messages,setMessage]=useState([]);

const send =()=>{
let msg = document.querySelector("#chat_input").value;
if(msg!=""){
  socket.emit("message",{msg})
document.querySelector("#chat_input").value="";
}
}
const [onlineUsers, setOnlineUsers] = useState(0);
useEffect(()=>{
  socket.on("join",()=>{
  setOnlineUsers((onlineUsers)=>onlineUsers+1)
  })
  socket.on("")
  return()=>{
    socket.emit("disconnect_user",()=>{
      setOnlineUsers((onlineUsers)=>onlineUsers-1)
    })
    socket.off()
    
  }
},[])
useEffect(()=>{
  console.log(onlineUsers)
},[onlineUsers])
  useEffect(() => {
    socket.on("sendMessage",(msg)=>{
      setMessage([...messages,msg])
      
    })
  
    return () => {
      socket.off()
    }
  }, [])
  
  
  return (
    <div class="chat_main_container">
      <div className="onlineusers">
        <p>Online users:{onlineUsers}</p>
      </div>
      <div className="chat_results">
      <ScrollToBottom>
      {messages.map((item,index)=>(
        <div className='chats' key={index}>
          {item.msg}
          
        </div>
       
      ))}
      </ScrollToBottom>
      </div>
      <div className="chat_input_container">
        <div className="chat_input_box">
        <input type="text" id="chat_input"/>
        </div>
        <div className="chat_submit_btn">
        <button onClick={send}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Paid