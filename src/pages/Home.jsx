import React, { useContext } from 'react'
import { Home } from '../components/Home.jsx'
import { ContextStore } from '../context/contextStore.jsx'
import { useNavigate } from 'react-router-dom'



export const HomePage = (props) => {
  const {token} = useContext(ContextStore)
  const navigate = useNavigate()
  return(
    <div className='flex justify-center items-center min-h-[60vh]'>
      {token? <Home/>: <div>
        <span onClick={()=>navigate("/login")} className='text-blue-500'>Sign in</span> to see the content.
      </div> }
        
        
    </div>
   )
  }
