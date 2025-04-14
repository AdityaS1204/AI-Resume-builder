import React from 'react'
import { Link, NavLink } from 'react-router-dom'


const Navbar = () => {
    return (
        <div className="relative flex justify-center z-50">
            <div className='fixed top-9  border-2 h-fit w-6/12 rounded-4xl bg-amber-200 p-3 flex justify-between items-center'>
                <div className="logo">
                    <h1 className='font-bold text-3xl pl-1'>INKAI</h1>
                </div>
                <div className="list ">
                    <ul className='flex gap-5 '>
                       <Link to={'/'}><li className=" hover:scale-110 duration-300">Home</li></Link> 
                       <Link to={'/'}><li className="hover:scale-110 duration-300">Featues</li></Link> 
                       <Link to={'/ats-score'}><li className="hover:scale-110 duration-300">ATS Score</li></Link> 
                    </ul>
                </div>
                <div className="cta-button">
                  <Link to={'/create-resume'}><button className='bg-gradient-to-r from-red-600 to-orange-500 p-2 rounded-4xl text-white hover:cursor-pointer hover:scale-105 duration-300'>Get started</button></Link>  
                </div>
            </div>
        </div>
    )
}

export default Navbar