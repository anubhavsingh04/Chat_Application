import React,{useState} from 'react'
import ChatArea from './components/ChatArea'
import UserSearch from './components/UserSearch'

function Home() {
  const [searchKey, setSearchKey] = useState("")
  return (
    <div className="flex gap-5">
        {/* 1st part   user search , userslist/chatlist */}
        <div className="w-96 ">
            <UserSearch
              searchKey={searchKey} 
              setSearchKey={setSearchKey} />
        </div>

        {/* 2nd part chat box */}
        <div>
            <ChatArea />
        </div>
    </div>
  )
}

export default Home
