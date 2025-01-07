import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {Button,Input,Logo} from "./index";
import { RotatingLines } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import { deletestock, sellstock } from "../api/auth";

const SellStock=()=>{
    const [loader,setloader]=useState(false)
    const navigate=useNavigate()
    const location=useLocation();
    const {state}=location;
    const [error,seterror]=useState("")
  

    const {register,watch,handleSubmit,setValue,formState:{errors}}=useForm({
        defaultValues:{
            name:state?.name||"",
            ticker:state?.ticker||"",
            

        },
    });

    const sell=async(data)=>{
        seterror("");
        setloader(true)
        try{
        if(data.quantity==state.quantity){
            await deletestock(state);
        }
        else{
            console.log(state.quantity-data.quantity);
            await sellstock({...state,newquantity:state.quantity-data.quantity});
        }
    }
    catch(err){
        seterror(err.response.data.message)
    }
    finally{
        setloader(false)
        navigate("/Dashboard")
    }
        
    }

    


    return(
      

    <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-black dark:bg-black dark:border-white`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <div>
                            <img src={Logo} alt="logo"/>
                        </div>
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight dark:text-white'>Sell Stock</h2>
                
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(sell)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                        label="Stock name: "
                        placeholder="name"
                        type="text"
                        readOnly
                        {...register("name",{
                            required:"Name required!!!",
                            
                        })}
                        />
                        {errors.email && <p className='text-red-700'>{errors.stockname.message}</p>}
                        <Input
                        label="Ticker: "
                        placeholder="Ticker value"
                        type="text"
                        {...register("ticker",{
                            required:"Ticker required!!!",
                        })}
                        />
                        {errors.ticker && <p className='text-red-700'>{errors.ticker.message}</p>}

                        <Input
                        label="Quantity: "
                        placeholder="Quantity value"
                        type="number"
                        {...register("quantity",{
                            required:'Quantity Required!!!',
                            validate:{
                                positive: (value) =>
                                    value > 0 || 'Quantity should be greater than 0',
                                max:value=>value<=state.quantity || `Quantity should be less than or equal to ${state.quantity}`
                                
                            }
                        })}
                        />
                        {errors.quantity && <p className='text-red-700'>{errors.quantity.message}</p>}

                        <Button
                        type="submit"
                        disabled={loader}
                        className='w-full bg-red-500'>
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
                            ):"Sell"}
                            
                        </Button>
                    </div>
                </form>

                </div>

        </div>
    )

}

export default SellStock;