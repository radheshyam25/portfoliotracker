import React, {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button,Input,Logo} from './index'
import { useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form'
import {RotatingLines} from "react-loader-spinner"
import {createaccount} from '../api/auth'


function Signup(){
    const navigate=useNavigate();
    const [loader,setloader]=useState(false)
    const [error,seterror]=useState("")
    const dispatch=useDispatch();
    const {register,handleSubmit,formState:{errors},}=useForm();

    

    const create=async(data)=>{
        setloader(true);
        seterror("")
        try{
            
            const userData=await createaccount(data);
            if(userData){
                dispatch(login({userData}))
                navigate("/")
            }
        }
        catch(error){
            seterror(error.response.data.message);
        }
        finally{
            setloader(false)
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
                        <h2 className='text-center text-2xl font-bold leading-tight dark:text-white'>Sign up to create account</h2>
                        <p className='mt-2 text-center text-base text-black/60 dark:text-white'>
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-medium text-primary transition-all duration-200 hover:underline "
                            >
                                Sign In
                            </Link>
                        </p>
                        {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                        <form onSubmit={handleSubmit(create)} className='mt-8'>
                            <div className='space-y-5'>
                                <Input
                                label="Name: "
                                placeholder="Enter your name"
                                {...register("name",{
                                    required:"Name is required!!!",
                                })}
                                />
                                {errors.name && <p className='text-red-700'>{errors.name.message}</p>}
                                <Input
                                label="Email: "
                                placeholder="Enter your email"
                                type="email"
                                {...register("email",{
                                    required:"Email required!!!",
                                    validate:{
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                                               "Email address must be a valid address",
                                    }
                                })}
                                />
                                {errors.email && <p className='text-red-700'>{errors.email.message}</p>}
                                <Input
                                label="password: "
                                placeholder="Enter your password"
                                type="password"
                                {...register("password",{
                                    required:"Password required!!!",
                                })}
                                />
                                {errors.password && <p className='text-red-700'>{errors.password.message}</p>}
                                <Button
                                type="submit"
                                disabled={loader}
                                className='w-full bg-teal-700 mx-auto'>
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
                                    </div>):("Sign Up")}
                                    
                                </Button>
                            </div>
                        </form>
        
                        </div>
        
                </div>

    )
}



export default Signup

