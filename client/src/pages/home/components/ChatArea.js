import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SendMessage } from "../../../apicalls/messages";
import { HideLoader, ShowLoader } from "../../../redux/loaderSlice";
import { toast } from "react-hot-toast";

function ChatArea() {
  const dispatch=useDispatch();
  const [newMessage,setNewMessage]=React.useState("");
  const { selectedChat,user } = useSelector((state) => state.userReducer);
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
      <div>
        chat message
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
