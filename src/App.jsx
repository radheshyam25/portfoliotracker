import { useEffect, useState } from 'react'
import {Header,Footer} from "./components"
import {Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function App() {
  const [loading,setLoading]=useState(false)
  
  const navigate=useNavigate();
  const auth=useSelector((state)=>state.auth.status)
 
  useEffect(()=>{
    
    
    if(!auth){
      navigate("/")
    }


  },[auth,navigate])

  return !loading? (
    <div className='min-h-screen bg-white dark:bg-black dark:text:white'>
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  ):null
}

export default App
