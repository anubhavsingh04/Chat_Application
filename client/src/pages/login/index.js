import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser } from '../../apicalls/users';
import {toast} from "react-hot-toast"
function Login(){
  const navigate=useNavigate();
    const [user,setUser]=React.useState({
        email:'',
        password:'',
    })
    const login=async ()=>{
      try {
        
        const response = await LoginUser(user);
       
        if (response.success) {
          toast.success(response.message);
          localStorage.setItem("token",response.data);
          navigate("/");
        } else {
          toast.error(response.message);
        }
      } 
      catch (error) {
        toast.error(error.message);
      }
  };

  useEffect(() => {
    if(localStorage.getItem("token"))
    navigate("/")
  }, [])
  
  return (
    <div className=" h-screen bg-primary flex items-center justify-center">
      <div className="bg-white shadow-md p-5 flex flex-col gap-5 w-96 rounded-md">
        <h1 className="text-2xl  uppercase font-semibold text-primary">Chatly Login</h1>
        <h1 className=" font-semibold ">Email</h1>
        <input className="rounded" type='text'
            value={user.email}
            onChange={(e)=>setUser({...user,email:e.target.value})}
            placeholder='Enter Your Email'
         />
         <h1 className=" font-semibold ">Password</h1>
        <input className="rounded" type="password"
            value={user.password}
            onChange={(e)=>setUser({...user,password:e.target.value})}
            placeholder='Enter Your Password'
         />
         <button className="contained-btn rounded-md" onClick={login}>Login</button>
         <Link to="/register" className='underline'>
            Don't have an account? Register
         </Link>
      </div>
    </div>
  )
}

export default Login
