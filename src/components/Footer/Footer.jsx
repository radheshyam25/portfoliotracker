import React from 'react'

const Footer=()=>{
    return(
        <footer id="footer" className=' bg-teal-700 text-xl text-white bottom-0'>
            <section className='mx-auto flex max-w-4xl flex-col p-4 sm:flex-row sm:justify-between'>
                <address>
                    <h1>Meet the Developer</h1>
                    <h2>Piyush Agarwal</h2>
                    <h3>Birla Intitute of Technology,Mesra</h3>
                    Email:
                    <a href="mailto:piyushagarwal250903@gmail.com">
                        piyushagarwal250903@gmail.com
                    </a><br/>
                    Phone:<a href="tel:+8540869718">
                        (854)08 69718
                    </a>
                </address>
                <div className='flex flex-col sm:gap-2'>
                    <p className='text-right'>Copyright &copy;<span id="year">2024</span></p>
                    <p className='text-right'>All Rights Reserved</p>
                </div>
            </section>
        </footer>
    )
}
export default Footer