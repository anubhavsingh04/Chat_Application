import React from "react";
import { useSelector } from "react-redux";

function ChatArea() {
  const { selectedChat } = useSelector((state) => state.userReducer);
  return <div>{selectedChat && <h1>{selectedChat._id}</h1>}</div>;
}

export default ChatArea;
