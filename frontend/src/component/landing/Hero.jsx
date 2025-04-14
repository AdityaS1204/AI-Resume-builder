import { useRef } from 'react'
import {useScroll,motion, useTransform} from 'motion/react'
import { heroImg } from '../../assets/index'

const Hero = () => {
const containerRef = useRef(null)

const {scrollYProgress} = useScroll({
    target:containerRef,
})
const RotateX = useTransform(scrollYProgress,[0,0.1],[6,0])
const translateY = useTransform(scrollYProgress,[0,0.1],[0,500])
const scale = useTransform(scrollYProgress,[0,0.1],[0.9,1.1])
const textScale = useTransform(scrollYProgress,[0,0.1],[1,0.8])
const textOpacity = useTransform(scrollYProgress,[0,0.1],[1,0.5])


    return (
        
        <div
        ref={containerRef}
        className='h-[190vh] bg-[#06051d] flex flex-col items-center py-60 [perspective:900px] [transform-style:preserve-3d] mt-1 -z-10'>
            <motion.h1 
            className='text-white font-bold text-7xl text-center leading-14'
            style={{
                scale:textScale,
                opacity:textOpacity,
                position:screenY,
            }}
            >Build the Perfect, Job-Ready Resume<br /> in Minutes with AI</motion.h1>
            <motion.div 
            className="w-7/12 rounded-3xl shadow-2xl h-[650px] bg-white mt-2 p-2" 
            style={{
                rotateX:RotateX,
                Y:translateY,
                translateZ:"50px",
                scale:scale,
            }}

            >
            <div className="w-full h-full bg-black rounded-[16px] p-2 ">
                <div className='bg-neutral-400 w-full h-full rounded-xl p-1 overflow-hidden'>
                    <img src={heroImg} alt="resume image" className='rounded-xl' />
                </div>
            </div>
            </motion.div>
        </div>
    )
}

export default Hero