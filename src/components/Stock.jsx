import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'


const Stock=({stk})=>{
    const dispatch = useDispatch()
    const navigate=useNavigate();
    const sellhandle=()=>{
        navigate("/sell-stock",{state:stk})
    }
    const addhandle=()=>{
      navigate("/add-stock",{state:stk})
    }
    //const [isTodoEditable,setIsTodoEditable]=useState(false)
    //const [todoMsg,setTodoMsg]=useState(todo.text)
 
  return (
    <>
    

    <ul className="list-none  flex w-full justify-center items-center">
          <li
            className="my-2 flex w-full justify-between items-center bg-yellow-200 dark:bg-yellow-100 px-4 py-2 rounded"
            key={stk.id}
          >
            <div className="flex border flex-col w-full justify-between  border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ">
           <div className='flex w-full'>
            <h1>{stk.name}</h1></div>
           <div className='flex w-full justify-between'>
            <h1>Quantity:</h1>
           
            <h2>{stk.quantity}</h2>
            </div>
            <div className='flex w-full justify-between'>
              <h1>Current:</h1>
              <h2>${(stk.currentPrice).toFixed(2)}</h2>
            </div>
            <div className='flex w-full justify-between'>
              <h1>Avg:</h1>
              <h2>${(stk.buyPrice).toFixed(2)}</h2>
            </div>
            <div className='flex w-full justify-between'>
            <button
              //className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
              className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
              onClick={sellhandle}

              
          >
              Sell
          </button>
            <button
            
              className="text-white bg-green-500 border-0 py-1 px-4 focus:outline-none hover:bg-green-600 rounded text-md"
              onClick={addhandle}
            >
             Buy
            </button>
            </div>
           
          
            </div>
          </li>
        
      </ul>
    </>
  )
}

export default Stock