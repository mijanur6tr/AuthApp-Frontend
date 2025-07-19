import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Toaster } from "react-hot-toast";

function App() {
 

  return (
    <>
     <Toaster position="top-center" reverseOrder={false} />
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
