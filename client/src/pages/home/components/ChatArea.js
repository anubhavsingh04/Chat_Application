import React from "react";
import { useSelector } from "react-redux";

function ChatArea() {
  const { selectedChat,user } = useSelector((state) => state.userReducer);
  const receipentUser=selectedChat.members.find(
    (mem)=>mem._id!==user._id
  );

  console.log(receipentUser);
  return <div className="bg-white h-[82vh] w-full border rounded-xl flex flex-col justify-between p-5">
    {/* 1st part receipent user */}
      <div>
         {receipentUser.name}
      </div>
    {/* 2nd part chat message */}
      <div>
        chat message
      </div>
    {/* 3rd part chat input  */}
    <div>
      chat input
    </div>
  </div>;
}

export default ChatArea;
