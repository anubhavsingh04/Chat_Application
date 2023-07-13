import React,{useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterUser } from '../../apicalls/users';
import {toast} from "react-hot-toast"
import {ShowLoader, HideLoader } from '../../redux/loaderSlice';
import { useDispatch } from 'react-redux';

function Register(){
  const dispatch = useDispatch();
  const navigate=useNavigate();
    const [user,setUser]=React.useState({
        name:'',
        email:'',
        password:'',
    })

    const register = async () => {
      try {
        dispatch(ShowLoader());
        const response = await RegisterUser(user);
       dispatch(HideLoader())
        if (response.success) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } 
      catch (error) {
        dispatch(HideLoader())
        toast.error(error.message);
      }
    };
    useEffect(() => {
      if(localStorage.getItem("token"))
        navigate("/")
    }, [])
  return (
    <div className=" h-screen bg-primary flex items-center justify-center">
      <div className="bg-white shadow-md p-5 flex flex-col gap-5 w-96 rounded">
        <h1 className="text-2xl  uppercase font font-semibold text-primary">Chatly Register{" "}</h1>
        <hr />
        <h1 className=" font-semibold ">Name</h1>
        <input className="rounded" type='text'
            value={user.name}
            onChange={(e)=>setUser({...user,name:e.target.value})}
            placeholder='Enter Your Name'
         />
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
         <button className="contained-btn rounded-md" onClick={register}>Register</button>
         <Link to="/login" className='underline'>
            Already have an account? Login
         </Link>
      </div>
    </div>
  )
}

export default Register
