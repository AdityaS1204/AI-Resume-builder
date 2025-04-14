import { Link } from 'react-router-dom';
import { gradientImg } from '../../assets/index.js'
import { ArrowRight } from 'lucide-react';


const CTA = () => {


    return (
        <div className='w-full h-full flex justify-center bg-[#06051d] relative z-40 flex-col items-center'>
            <div className="border border-slate-500 rounded-3xl w-10/12 p-3 h-[400px] z-50 relative object-cover overflow-hidden ">
                <img src={gradientImg} alt="bg image" className='object-cover rounded-2xl  w-full relative' />
                <div className='absolute inset-0 p-5 flex items-center flex-col gap-5'>
                <h4 className='mt-10 text-3xl font-semibold'>Build Your Resume Effortlessly</h4>
                <p className='text-xl text-center mb-10'>Create a professional resume in minutes. Just upload your details and <br/> get a polished resume ready to go.</p>
               <Link to={'/create-resume'}>
                <button className='py-2 px-4 border bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl flex gap-3 group hover:scale-105 duration-300'>Get Started Now<ArrowRight className='group-hover:rotate-180 group-hover:translate-x-2 duration-500 '/></button>
               </Link>
                </div>
            </div>
        </div>
    )
}

export default CTA