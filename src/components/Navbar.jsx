import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { ContextStore } from '../context/contextStore.jsx';


export const Navbar = (props) => {
  const {token, setToken} = useContext(ContextStore)
  const navigate = useNavigate();

  const handleLogOut = ()=>{
    setToken("");
    localStorage.removeItem("token")
    navigate("/")
  }

  return(
    <div className='flex justify-around py-4 mx-auto items-center max-w-6xl'>
        <div>AuthApp</div>
        {token ? (
          <div>
            <button onClick={handleLogOut}>Log Out</button>
          </div>
        ) : 
        (
          <div className='flex gap-4'>
            <button onClick={()=>navigate("/login")}>Sign In</button>
            <button onClick={()=>navigate('/signup')}>Sign Up</button>
        </div>
        )
        }
    </div>
   )
  }
