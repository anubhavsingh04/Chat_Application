import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetMessages, SendMessage } from "../../../apicalls/messages";
import { HideLoader, ShowLoader } from "../../../redux/loaderSlice";
import { toast } from "react-hot-toast";
import moment from "moment"
import { ClearChatMessages } from "../../../apicalls/chats";
import { SetAllChats } from "../../../redux/userSlice";

function ChatArea({socket}) {
  const dispatch=useDispatch();
  const [newMessage,setNewMessage]=React.useState("");
  const [messages=[],setMessages]=React.useState([]);
  const { selectedChat,user,allChats } = useSelector((state) => state.userReducer);
  const receipentUser=selectedChat.members.find(
    (mem)=>mem._id!==user._id
  );

  const sendNewMessage = async () => {
      try {
        dispatch(ShowLoader());
        const message = {
          chat: selectedChat._id,
          sender: user._id,
          text: newMessage,
          
        };
        const response=await SendMessage(message);
        dispatch(HideLoader());
        if(response.success){
          setNewMessage("");
        }
      } 
      catch (error) {
        dispatch(HideLoader());
        toast.error(error.message);
      }
    };

    const getMessages = async () => {
      try {
        dispatch(ShowLoader());
        const response = await GetMessages(selectedChat._id);
        dispatch(HideLoader());
        if (response.success) {
          setMessages(response.data);
        }
      } catch (error) {
        dispatch(HideLoader());
        toast.error(error.message);
      }
    };

    const clearUnreadMessages = async () => {
      try {
        dispatch(ShowLoader());
        const response = await ClearChatMessages(selectedChat._id);
        dispatch(HideLoader());
        if (response.success) {
          const updatedChats = allChats.map((chat) => {
            if (chat._id === selectedChat._id) {
              return response.data;
            }
            return chat;
          });
          dispatch(SetAllChats(updatedChats));
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    useEffect(() => {
      getMessages();
      if (selectedChat?.lastMessage?.sender !== user._id) {
        clearUnreadMessages();
      }
    }, [selectedChat])
    
  return <div className="bg-white h-[82vh] w-full border rounded-xl flex flex-col justify-between p-5">
    {/* 1st part receipent user */}
      <div>
      <div className="flex gap-5 items-center mb-2">
                    {receipentUser.profilePic && (
                        <img src={receipentUser.profilePic} alt="profilePic" className="w-10 h-10 rounded-full" />
                    )}
                    
                    {!receipentUser.profilePic && (
                        <div className="bg-cyan-400 rounded-full h-10 w-10 flex items-center justify-center">
                            <h1 className="text-xl uppercase font-semibold text-black">{receipentUser.name[0]}</h1>
                        </div>
                    )}
                    <h1 className="uppercase">{receipentUser.name}</h1>
               </div>
               <hr />
      </div>


    {/* 2nd part chat message */}
      <div className="h-[55vh] overflow-y-scroll p-5">
        <div className="flex flex-col gap-2">
          {messages.map((message)=>{
            const isCurrentUserIsSender=message.sender===user._id;
            return <div className={`flex ${isCurrentUserIsSender && "justify-end"}`}>
                <div className="flex flex-col gap-1">
                    <h1
                      className={`${isCurrentUserIsSender? "bg-primary text-white rounded-bl-none":"bg-gray-300 text-primary rounded-tr-none"} p-2 rounded-xl `}
                    >
                      {message.text}
                    </h1>
                    <h1 className="text-gray-500 text-sm">
                      {moment(message.createdAt).format("hh:mm A")}
                    </h1>
                </div>
                {isCurrentUserIsSender && (<i class={`ri-check-double-line text-lg p-1
                  ${message.read ? "text-blue-500" : "text-gray-400"}
                `}></i>
          )}
            </div>
          })}
        </div>
      </div>


    {/* 3rd part chat input  */}
    <div>
      <div className="h-18 rounded-xl border-gray-300 shadow border flex justify-between p-2 items-center">
        <input type="text" placeholder="Type a message" 
          className="w-[90%] border-0 h-full rounded-xl focus:border-none"
          value={newMessage}
          onChange={(e)=>setNewMessage(e.target.value)}
        />
        <button className="bg-primary text-white py-1 px-5 rounded h-max"
          onClick={sendNewMessage}
        >
            <i className="ri-send-plane-2-line text-white"></i>
        </button>
      </div>
    </div>
  </div>;
}

export default ChatArea;
