import React,{useState} from 'react'
import ChatArea from './components/ChatArea'
import UserSearch from './components/UserSearch'
import UsersList from './components/UsersList'
import { useSelector } from 'react-redux'


function Home() {
  const [searchKey, setSearchKey] = useState("")
  const {selectedChat}=useSelector((state=>state.userReducer))
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
            <ChatArea />
        </div>)}
    </div>
  )
}

export default Home
