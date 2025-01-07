import React from "react";
import { useState ,useEffect} from "react";
import {Input, Logo,Button} from "./index"

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useId } from "react";
import {updatestocks} from "../store/authSlice"
import { RotatingLines } from "react-loader-spinner";
import { addstock,getstockprice ,stockpresent,updatestock} from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


const AddStock=()=>{

    const navigate=useNavigate()
    const location=useLocation()
    const {state}=location
    const id=useId();
    const [stock,setstock]=useState({
        "Apple Inc":"AAPL",
        "Microsoft Corp":"MSFT",
        "Alphabet Inc":"GOOGL",
        "Amazon Inc":"AMZN",
        "Nvidia Corp":"NVDA",
        "Meta Platforms":"META",
        "JPMorgan Chase & Co.":"JPM",
        "Visa Inc":"V",
        "UnitedHealth Group Inc":"UNH",
        
    })

    const[error,seterror]=useState("")
    const [loader,setloader]=useState(false)
    const {register,handleSubmit,setValue,watch,formState:{errors},}=useForm({
        defaultValues:{
            name:state?.name || "",
            ticker:state?.ticker || "",
        },
    });

    useEffect(()=>{

        const helper=async()=>{
            const session=await getstockprice({"symbol":state.ticker})
            if(session){
                setValue("buyPrice",session.data);
            }
        }
        if(state){
            helper();
            
        }
    },[])

    const company=["Apple Inc","Microsoft Corp","Alphabet Inc","Amazon Inc","Nvidia Corp","Meta Platforms","JPMorgan Chase & Co.","Visa Inc","UnitedHealth Group Inc"];
    


   

    const handleChange=async(event)=>{
        
        
        const value=event.target.value
        
        const ticker = stock[value] || "";
        const session=await getstockprice({"symbol":ticker})
        

        setValue("name",value)
        
       
        setValue("ticker",ticker);
        if(session){
            setValue("buyPrice",session.data);
        }
    


    }

   

    const add=async(data)=>{
        seterror("")
        setloader(true);
        const response=await stockpresent({name:data.name})
        const session=response.data
        try{
            if(session.present){
               
                const newquantity=Number(session.stock.quantity)+Number(data.quantity)
                const newprice=(session.stock.buyPrice*session.stock.quantity+data.buyPrice*data.quantity)/newquantity
               
                const response=await updatestock({...session.stock,newprice,newquantity})
            

                

            }
            else{
            const session=await addstock(data)
            

            


            }
        }


        
        catch(err){
            seterror(err.response.data.message)
        
        }
        finally{
            setloader(false);
            navigate("/Dashboard")
        }

    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-black dark:bg-black dark:border-white`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <div>
                            <img src={Logo} alt="logo"/>
                        </div>
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight dark:text-white'>Add Stock</h2>
               
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(add)} className='mt-8'>
                    <div className='space-y-5'>
                    <div className="w-full dark:text-white">
                        <label
                            className="inline-block mb-1 pl-1"
                            htmlFor={id}>
                            Select Stock: 
                        </label>
                        <select 
                        value={watch("name")|| ""}
                        onChange={(event) => {
                            handleChange(event); 
                          }}
                        id={id}
                        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
                        {...register("name",{
                            required:"Select option",
                            onChange: (event) => {
                                handleChange(event); 
                              },
                        })}>
                             <option value="">Select a name</option>
                            {company.map((items,index)=>(
                                <option key={index} value={items}>{items}</option>
                                

                            ))}

                            

                        </select>
                        </div>

                        <Input
                        label="Ticker: "
                        value={watch("ticker") || ""}
                        type="text"
                        readOnly
                        {...register("ticker",{
                            required:true
                        })}
                        />

                        <Input
                        label="Buy Price: "
                        
                        type="number"
                        readOnly
                        
                        {...register("buyPrice",{
                            required:true
                        })}
                        />
                        <Input
                        label="Quantity: "
                        
                        type="text"
                        
                        {...register("quantity",{
                            required:"Quantity required!!!",
                            validate:{
                                positive:(value)=>
                                    value>0 || "Quantity should be greater than 0",

                                
                            }
                        })}
                        />
                        {errors.quantity && <p className='text-red-700'>{errors.quantity.message}</p>}
                        <Button
                        type="submit"
                        disabled={loader}
                        className='w-full bg-green-400'>
                            {loader?(
                                <div className='flex justify-center'>
                                    <RotatingLines

                                        visible={true}
                                        height="24"
                                        width="24"
                                        color="white"
                                        strokeWidth='5'
                                        strokeColor='white'
                                        animationDuration='0.75'
                                        ariaLabel='rotating-lines-loading'
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        />                                                                           
                                </div>
                            ):"Add Stock"}
                            
                        </Button> 
                       





                        
                       
                    </div>
                </form>

                </div>

        </div>



    )
}

export default AddStock;
