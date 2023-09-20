import React, { useEffect, useState } from 'react'
import "./Chat.css"

const Chat = ({socket , username , room}) => {
    const [currentMessage , setCurrentMessage]= useState("");
    const [messageList , setMessageList]= useState([]);


    const sendMessage = ()=>{
        if(currentMessage !==""){
            const message = {
                room: room,
                user : username,
                message : currentMessage
            }
            socket.emit("SENDMESSAGE",  message)
        }

    }

    useEffect(()=>{
        socket.on("RECEIVED", (data)=>{
            setMessageList((list)=>[...list ,data])
        })
    },[socket])
  return (
    <div className='Chat'>
      <div className='Chat-Head'>
        <p>{username.toUpperCase()}</p>
      </div>

    <div className='Chat-Body'>
        {messageList.map((item,index)=>{
            return(
                <div className={(username===item.user)? "You" : "other"} key={index}>
                    <p className={(username===item.user)? "message You ybg" : "message other obg"}>{item.message}</p>
                    <p className={(username===item.user)? "username You" : "username other"}>{item.user}</p>

                </div>
            )
        })}

    </div>

    <div className='Chat-Footer'>
    <input type='text' placeholder='Hey..' onChange={(e)=>{ setCurrentMessage(e.target.value)}}/>
    <button onClick={sendMessage}>+</button>
    </div>

    </div>
  )
}

export default Chat
