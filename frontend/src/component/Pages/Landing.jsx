import React from 'react'
import { CTA, Features, Footer, Hero, Navbar } from "../landing/index"
const Landing = () => {
  return (
    <div className="bg-[#06051d] h-[100vh] w-full">
    <Navbar />
  
    <Hero />
    <Features />
    <CTA/>
    <Footer/>
  </div>        
  )
}

export default Landing