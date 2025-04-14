import { Twitter, Linkedin, Github } from 'lucide-react'


const Footer = () => {
    return (
        <div className='w-full h-40 -mt-10 bg-[#06051d] flex justify-center relative z-40'>
            <div className='w-10/12 h-full border border-slate-400 rounded-3xl text-white p-10 flex justify-between items-center'>
                <div>
                    <p>Copyright</p>
                </div>
                <div>
                    <p>Made by Aditya Singh</p>
                </div>
                <div className="">
                    <ul className='flex gap-4'>
                        <li className='cursor-pointer hover:scale-105 duration-200'><Twitter /></li>
                        <li className='cursor-pointer hover:scale-105 duration-200'>< Github/></li>
                        <li className='cursor-pointer hover:scale-105 duration-200'><Linkedin /></li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Footer