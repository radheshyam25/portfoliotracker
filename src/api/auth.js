import axios from "./axios"
import { useState } from "react";




const createaccount=async({name,email,password})=>{
    try{
        return await axios.post("/api/users/register",{
            "name":name,
            "email":email,
            "password":password,
        }).then(response=>Login({email,password}));
        
    }
    catch(err){
        
        
        throw err;
    }
}

const Login=async({email,password})=>{
    try{
        const response=await axios.post("/api/users/login",
            {},
            {
            headers:{
            "email":email,
            "password":password,
            }
        })
        axios.defaults.headers.common['email'] = email;
        axios.defaults.headers.common['password'] = password;
        return response;
    }
    catch(err){
        console.log(err)
        throw err;
    }
}


const addstock=async({name,ticker,quantity,buyPrice})=>{
    try{
        const response=await axios.post("/api/stocks",{
            "name":name,
            "ticker":ticker,
            "quantity":quantity,
            "buyPrice":buyPrice,
            "currentPrice":buyPrice,
            
        },
        )
        return response

    }
    catch(err){
        throw err;

    }
}

const sellstock=async({id,name,ticker,buyPrice,currentPrice,newquantity})=>{
    try{
        const response=await axios.put(`/api/stocks/${id}`,{
            "name":name,
            "ticker":ticker,
            "buyPrice":buyPrice,
            "currentPrice":currentPrice,
            "quantity":newquantity
        })
        console.log(response);

    }
    catch(err){
        throw err;

    }
}

const deletestock=async({id})=>{
    
    try{
        const response=await axios.delete(`/api/stocks/${id}`)
        console.log(response);


    }
    catch(err){
        throw err;

    }
}

const getstockprice=async({symbol})=>{
    
    try{
        const response=await axios.get("/api/stocks/price",
            
            {
                headers:{
                    "symbol":symbol,
                }
            }
        )
        

        return response;


    }
    catch(err){
        console.log(err);
        throw err;

    }



}

const getAllStocks=async()=>{
    try{
    const response=await axios.get("/api/stocks")
        return response
    }
    catch(err){
        throw err;
    }
    

}

const updatestock=async({id,name,ticker,newprice,newquantity,currentPrice})=>{
    
        try{
            const response=await axios.put(`/api/stocks/${id}`,{
                "name":name,
                "ticker":ticker,
                "buyPrice":newprice,
                "currentPrice":currentPrice,
                "quantity":newquantity
            })
    

    }
    catch(err){
        throw err;
    }
}

const stockpresent=async({name})=>{
    const stockname=name;
    try{
        const response=await axios.post("/api/stocks/exist",stockname,{
            headers:{
                'Content-Type':'text/plain'
            }
        })
        return response;
    }
    catch(err){
        throw err;
    }
}



export  {createaccount,Login,addstock,getstockprice,getAllStocks,deletestock,updatestock,sellstock,stockpresent}