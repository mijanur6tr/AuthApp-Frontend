import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ContextStoreProvider from './context/contextStore.jsx'
 

import {HomePage} from './pages/Home.jsx'
import {Signup} from "./pages/Singup.jsx"
import {Signin} from "./pages/Singin.jsx"

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<HomePage/>
      },
      {
        path:"/login",
        element:<Signin/>
      },
      {
        path:"/signup",
        element:<Signup/>
      },
      
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextStoreProvider>
    <RouterProvider router={router}>
        <App />
    </RouterProvider>
    </ContextStoreProvider>
  </StrictMode>,
)
