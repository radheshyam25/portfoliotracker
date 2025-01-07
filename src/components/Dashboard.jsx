import React, { useEffect } from "react";
import { useState } from "react";
import { getAllStocks } from "../api/auth";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updatestocks } from "../store/authSlice";
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from "react-loading-skeleton";
import Stock from "./index";
import logo from "../assets/stock.png";

const DashBoard=()=>{
    const [list,setlist]=useState([])
    const [current,setcurrent]=useState(0)
    const [invest,setinvest]=useState(0)    
    
    const dispatch=useDispatch()
    const [loader,setloader]=useState(true)
    useEffect(()=>{
        const helper=async()=>{
        const response=await getAllStocks();
        if(response){
            
            
            dispatch(updatestocks({stocks:response.data}))

            setlist(response.data)
            await dash(response.data);
            setloader(false)
            
            
        
        }
    }

    const dash=async(newlist)=>{
        let curr=0;
        let inest=0;
       for(var i=0;i<newlist.length;i++){
        var stk=newlist[i]
        curr=curr+stk.currentPrice*stk.quantity;
        inest=inest+stk.buyPrice*stk.quantity;

       }
    setcurrent(curr)
    setinvest(inest)

    }
    
        helper();
    
        


    },[])

    if (loader) { 
        return (
            <div className="dark:bg-black bg-white">
            <div
            className="dark:[--skeleton-base:#202020] dark:[--skeleton-highlight:#444444] 
                       [--skeleton-base:#e0e0e0] [--skeleton-highlight:#f5f5f5]"
        >
             <div className="px-2"> 
                <div className="flex rounded w-full max-w-4xl mt-4 px-4 items-center justify-center mx-auto text-white border border-black/5 dark:border-white/10">
                    <div className="w-full">
                        <Skeleton count={3} height={20}  baseColor="var(--skeleton-base)"
                                highlightColor="var(--skeleton-highlight)" />
                    </div>
                </div>
                <div className="flex w-full max-w-4xl mt-4 px-4 items-center justify-center mx-auto text-white border border-black/5 dark:border-white/10">
                    <div className="w-full">
                        <Skeleton count={4} height={30}  baseColor="var(--skeleton-base)"
                                highlightColor="var(--skeleton-highlight)" />
                    </div>
                </div>

                <div className="flex  rounded w-full max-w-4xl mt-4 px-4 items-center justify-center mx-auto text-white border border-black/5  dark:border-white/10">
                    <div className="w-full">
                        <Skeleton count={4} height={30}  baseColor="var(--skeleton-base)"
                                highlightColor="var(--skeleton-highlight)" />
                    </div>
                </div>

                <div className="flex w-full max-w-4xl mt-4 px-4 items-center justify-center mx-auto  text-white border border-black/5 dark:border-white/10 rounded ">
                    <div className="w-full">
                        <Skeleton count={4} height={30}  baseColor="var(--skeleton-base)"
                                highlightColor="var(--skeleton-highlight)" />
                    </div>
                </div>


             </div> 
             </div>
             </div>); }

    

    return list.length!=0? (
        <div>
           

        <div className="flex max-w-4xl px-4 items-center justify-center mx-auto text-black  dark:text-white">
            <div className="my-2 border  flex w-full justify-between items-center border-black dark:border-white px-4 py-2 rounded">
                <div className="flex flex-col border border-black dark:border-white w-full rounded px-3">
                <div className="flex  w-full items-center justify-between">
                  <h1>Current:</h1>
                  <h2>${current.toFixed(2)}</h2>
                </div>
                <div className="flex flex-row w-full items-center justify-between">
                  <h1>Invest:</h1>
                  <h2>${invest.toFixed(2)}</h2>
                </div>
                <div className="flex flex-row w-full items-center justify-between">
                  <h1>Returns:</h1>
                  <h2 className={(current-invest)>=0?`text-green-600`:`text-red-600`}>${(current-invest).toFixed(2)}</h2>
                </div>

                

                </div>
            </div>
            
        </div>
    
       
       {list.map((stk)=>(
            <div key={stk.id} className="flex max-w-4xl px-4 items-center justify-center mx-auto">
                <Stock stk={stk}/>
            </div>
        ))}
        </div>
       
    ):(
        <div className="flex flex-col items-center  text-white mx-auto  min-h-screen">
             <img  src={logo} alt="Stock Logo"/>
            <h1 className="sm:text-4xl text-2xl ">You have no holdings</h1>
            <h2 className="sm:text-2xl">Make your next investment</h2>
        </div>
    )


}

export default DashBoard
