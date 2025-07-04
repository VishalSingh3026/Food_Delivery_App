import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    
    return (
        <div className="w-full h-[34vw] my-2 aspect-video mx-auto bg-[url('/image.jpg')] bg-no-repeat bg-cover relative rounded-[6px]">
            <div className="absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw] animate-fadeIn">
                <h2 className='font-semibold text-white text-dynamic'>
                    Order your favourite food here
                </h2>
                <p className='text-white text-[1.4vw]'>
                    Craving your favorite meals? Get them delivered hot and fresh to your doorstep in minutes!
                </p>
                <Link to={'/menu'} className='w-fit border-none text-gray-800 dark:text-gray-200 font-medium px-8 py-2 bg-white dark:bg-slate-900 text-[1.3vw] rounded-full'>View Menu</Link>
            </div>
        </div>
    )
}

export default Header;