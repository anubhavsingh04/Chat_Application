import React,{useEffect, useState} from 'react'
import ChatArea from './components/ChatArea'
import UserSearch from './components/UserSearch'
import UsersList from './components/UsersList'
import { useSelector } from 'react-redux'
import {io} from "socket.io-client";


function Home() {
  const socket=io("http://localhost:5000");
  const [searchKey, setSearchKey] = useState("")
  const {selectedChat,user}=useSelector((state=>state.userReducer))

  useEffect(() => {
    // join the room
    if(user)
    {
      socket.emit("join-room",user._id);
      // send new message to receipent 
      socket.emit("send-message",{
        text:"Hi arjun this is from John",
        sender:user._id,
        receipent:"64b037fd5ac9d6f247dca69a",
      })

      // receive message from arjun
      socket.on("receive-message",(data)=>{
        console.log(data);
      });
    }
  }, [user])
  
  return (
    <div className="flex gap-5">
        {/* 1st part   user search , userslist/chatlist */}
        <div className="w-96 ">
            <UserSearch
              searchKey={searchKey} 
              setSearchKey={setSearchKey}
             />
            <UsersList 
              searchKey={searchKey}
            />
        </div>

        {/* 2nd part chat box */}
        {selectedChat && (<div className="w-full">
            <ChatArea
              socket={socket} />
        </div>)}
    </div>
  )
}

export default Home
