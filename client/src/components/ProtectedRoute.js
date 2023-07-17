import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllUsers, GetCurrentUser } from "../apicalls/users";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { HideLoader, ShowLoader } from "../redux/loaderSlice";
import { SetUser, SetAllChats, SetAllUsers } from "../redux/userSlice";
import { GetAllChats } from "../apicalls/chats";


function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);
  const getCurrentUser = async () => {
    try {
      dispatch(ShowLoader());
      const response = await GetCurrentUser();
      const allUsersResponse=await GetAllUsers();
      const allChatsResponse=await GetAllChats();
      dispatch(HideLoader());
      if (response.success) {
        dispatch(SetUser(response.data));
        dispatch(SetAllUsers(allUsersResponse.data));
        dispatch(SetAllChats(allChatsResponse.data))
      } else {
        toast.error(response.message);
        navigate("/login");
      }
    } catch (error) {
      dispatch(HideLoader());
      toast.error(error.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-100 p-2">
        {/* header */}
        <div className="flex justify-between p-5 bg-cyan-600 rounded">
            
            <div className="flex items-center gap-1">
              <i class="ri-message-2-line text-2xl text-white "></i>
              <h1 className="text-white text-2xl uppercase font-semibold cursor-pointer"
                onClick={()=>(navigate("/"))}
              >CHATLY</h1>
            </div>
            <div className="flex gap-1 text-md items-center text-white cursor-pointer">
              {user?.profilePic && 
              <img
                src={user?.profilePic}
                alt="profile"
                className="h-8 w-8 rounded-full object-cover"
                onClick={()=>{navigate("/profile")}}
              />
              }
              {!user?.profilePic && <i class="ri-user-3-fill text-white"
                onClick={()=>{navigate("/profile")}}
               ></i>}
              <h1 className="underline text-white cursor-pointer"
                onClick={()=>{navigate("/profile")}}
              >{user?.name}</h1>
              <i class="ri-logout-circle-r-line ml-5 text-xl cursor-pointer text-white"
                onClick={()=>{
                  localStorage.removeItem("token");
                  navigate("/login")
                }}
                ></i>
            </div>
         </div>
          

          {/* main */}
          <div className="py-5">{children}</div>
    </div>
  );
}

export default ProtectedRoute;
