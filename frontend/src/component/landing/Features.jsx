import { features } from '../../assets/index'
import { PenLine,ShieldCheck,Zap,LayoutTemplate,Target,SearchCheck } from 'lucide-react';

const iconMap = {
    PenLine,
    SearchCheck,
    Target,
    Zap,
    LayoutTemplate,
    ShieldCheck,
  };

const Features = () => {
    return (
        <div className='w-full h-full  flex justify-center bg-[#06051d] -mt-40 relative z-40 flex-col items-center'>
            <div className="text-5xl font-bold text-white px-3 py-1 mb-7"><h4>Features</h4></div>
            <div className="border border-slate-500 rounded-3xl w-10/12 p-3 h-fit z-50 relative flex gap-5 flex-wrap">
            {features.map((card, index) => {
                const Icon = iconMap[card.icon];
               return ( <div key={index} className="h-[250px] w-[400px] hover:p-0 p-2 duration-200 bg-gradient-to-l from-orange-500 to-red-500 rounded-3xl">
                    <div className=" border h-full w-full bg-neutral-800 rounded-2xl p-4 bg-[url()]">
                        <div className="flex gap-3 ">
                        <Icon/>
                        <h3 className='text-white font-semibold text-xl mb-5'>{card.title}</h3>
                        </div>
                        <p className="text-white ">{card.description}</p>
                    </div>
                </div>)
})}
            </div>
        </div>
    )
}

export default Features