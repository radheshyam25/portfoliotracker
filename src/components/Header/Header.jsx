import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
// Logout button




const Header=()=>{
    const authStatus=useSelector((state)=>state.auth.status);
    const dispatch=useDispatch();
    const navigate=useNavigate()

    const navItems=[
        {
            name:'Home',
            slug:"/",
            active:true
        },

        {
            name:"Login",
            slug:"/login",
            active:!authStatus,
        },

        {
            name:"Signup",
            slug:"/signup",
            active:!authStatus,
        },

        {
            name:"Dashboard",
            slug:"/dashboard",
            active:authStatus,
        },

        {
            name:"Add Stock",
            slug:"/add-stock",
            active:authStatus,
        },
        

        

    ]

    const toggle=()=>{
        const hamburgerBtn=document.getElementById('hamburger-btn')
        const mobilemenu=document.getElementById('mobile-menu')
        mobilemenu.classList.toggle('hidden')
        mobilemenu.classList.toggle('flex')
        hamburgerBtn.classList.toggle('toggle-btn')
    }

    const handlelogout=()=>{
        dispatch(logout());
        navigate("/")
    }

    

    return (
        <header className="sticky top-0 z-10 bg-teal-700 text-white">
            <section className="mx-auto flex max-w-4xl items-center justify-between p-4">
                <h1 className="text-3xl font-medium">
                    Portfolio Tracker
                </h1>

                <div>
                    <button onClick={toggle} id="hamburger-btn" className="relative h-8 w-8 cursor-pointer text-3xl md:hidden">
                        <div className="absolute top-4 -mt-0.5 h-1 w-8 rounded bg-white transition-all duration-500 before:absolute before:h-1 before:w-8 before:-translate-x-4 before:-translate-y-3 before:rounded before:bg-white before:transition-all before:duration-500 before:content-[''] after:absolute after:h-1 after:w-8 after:-translate-x-4 after:translate-y-3 after:rounded after:bg-white after:transition-all after:duration-500 after:content-['']">
                        </div>
                    </button>
                    <nav className="hidden space-x-8 text-xl md:block" aria-label="main">
                     <ul className="flex gap-10">
                        {navItems.map((items)=>
                        items.active?(
                           <li key={items.name}>
                            <button onClick={()=> navigate(items.slug)}
                            className="gap-x-6 hover:bg-teal-300 hover:opacity-90 rounded-sm">
                                {items.name}
                            </button>
                           </li> 
                        ):null)}
                        {authStatus && (<li key="logout">
                            <button 
                            className="gap-x-6 hover:bg-teal-300 hover:opacity-90 rounded-sm" onClick={handlelogout}>
                                Logout
                            </button>
                           </li>)}

                        
                        </ul>   
                    </nav>

                </div>
            </section>

            <section id="mobile-menu" onClick={toggle}
            className="top-68 justify-center absolute hidden w-full origin-top animate-open-menu flex-col dark:text-white bg-white text-black dark:bg-black text-5xl">
                <nav className="min-h-screen flex flex-col items-center py-8" arial-label="mobile">
                    <ul>
                        {navItems.map((items)=>
                        items.active?(
                            <li key={items.name}>
                                <button onClick={()=>navigate(items.slug)}
                                className="w-full py-6 text-center hover:opacity-90">
                                    {items.name}
                                </button>
                            </li>
                        ):null)}
                        {authStatus && (
                            <li key="logout">
                            <button onClick={handlelogout}
                            className="w-full py-6 text-center hover:opacity-90">
                                Logout
                            </button>
                        </li>
                        )}


                    </ul>
                    </nav>
                    
            </section>
        </header>

    )
}

export default Header
