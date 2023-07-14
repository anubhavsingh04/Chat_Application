import React from "react";
import { useSelector } from "react-redux";

function ChatArea() {
  const { selectedChat,user } = useSelector((state) => state.userReducer);
  const receipentUser=selectedChat.members.find(
    (mem)=>mem._id!==user._id
  );

  
  return <div className="bg-white h-[82vh] w-full border rounded-xl flex flex-col justify-between p-5">
    {/* 1st part receipent user */}
      <div>
      <div className="flex gap-5 items-center mb-2">
                    {receipentUser.profilePic && (
                        <img src={receipentUser.profilePic} alt="profilePic" className="w-10 h-10 rounded-full" />
                    )}
                    
                    {!receipentUser.profilePic && (
                        <div className="bg-gray-400 rounded-full h-10 w-10 flex items-center justify-center">
                            <h1 className="text-xl uppercase font-semibold text-black">{receipentUser.name[0]}</h1>
                        </div>
                    )}
                    <h1 className="uppercase">{receipentUser.name}</h1>
               </div>
               <hr />
      </div>


    {/* 2nd part chat message */}
      <div>
        chat message
      </div>


    {/* 3rd part chat input  */}
    <div>
      <div className="h-18 rounded-xl border-gray-300 shadow border flex justify-between p-2 items-center">
        <input type="text" placeholder="Type a message" 
          className="w-[90%] border-0 h-full rounded-xl focus:border-none"
        />
        <button className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4  text-white p-2 rounded h-max">
            SEND
        </button>
      </div>
    </div>
  </div>;
}

export default ChatArea;
