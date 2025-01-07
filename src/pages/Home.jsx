import React from "react"
import logo from "../assets/stock.png";

const Home=()=>{
    return(
        <div className="mx-auto max-w-4xl min-h-screen text-white">
            <section className="mb-12 flex scroll-mt-40 flex-col-reverse items-center justify-center gap-8 p-6 sm:flex-row">
                <article className="sm:w-1/2">
                <h2 className="max-w-md text-center text-4xl font-bold text-slate-900 dark:text-white sm:text-left sm:text-5xl">
                    Your&nbsp;
                    <span className="text-indigo-700 dark:text-indigo-300">
                        Stocks
                    </span>,
                    
                </h2>
                <h2 className="max-w-md text-center text-4xl font-bold text-slate-900 dark:text-white sm:text-left sm:text-5xl">
                    Your&nbsp;
                    <span className="text-indigo-700 dark:text-indigo-300">
                        Moves
                    </span>,
                    
                </h2>
                <h2 className="max-w-md text-center text-4xl font-bold text-slate-900 dark:text-white sm:text-left sm:text-5xl">
                    Your&nbsp;
                    <span className="text-indigo-700 dark:text-indigo-300">
                        Growth
                    </span>...
                    
                </h2>

                <p className="mt-4 max-w-md text-center text-2xl text-slate-700 dark:text-slate-400 sm:text-left">
                    Start your investment now!!!
                </p>
               

                </article>
                <img  src={logo} alt="Stock Logo"/>
            </section>
        </div>
    )
}

export default Home