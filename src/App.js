import './App.css';
import {io} from "socket.io-client"
import React, { useState}  from "react"
import Chat from './Chats/Chat';

const socket =io("https://chat-server-59ms.onrender.com")  
function App() {
  const [room,setRoom] = useState("")
  const [userName,setUserName] = useState("")
  const [showChat , setShowChat] = useState(false)
  

const joinRoom = ()=>{
  if(room !=="" &&  userName!==""){
    
    socket.emit("JOINROOM", room)
    setShowChat(true);
  }
}



  return (
    <div className="App">
      {!showChat ?
     ( <div className='joinChat'>
      <p>Join a chat</p>
      <input placeholder="Enter Room Name"  onChange={(e)=>setRoom(e.target.value)}/>
      <input placeholder="Enter Username"  onChange={(e)=>setUserName(e.target.value)}/>
      <button onClick={joinRoom} > Join Room</button> 
      </div>)
      :
      <Chat room= {room} socket={socket} username={userName}/>}
    </div>
  );
}

export default App;
