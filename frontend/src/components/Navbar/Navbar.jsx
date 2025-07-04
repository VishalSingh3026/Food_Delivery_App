import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { StoreContext } from './../context/StoreContext';
import { CgProfile } from 'react-icons/cg';
import { IoMdLogOut } from "react-icons/io";
import { CiLight, CiDark } from "react-icons/ci";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ThemeContext } from '../../utils/ThemeContext';
import toast from 'react-hot-toast';

const Navbar = ({ setShowLogin }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);

    const { cartItems, token, setToken } = useContext(StoreContext);

    const matchRoute = (path) => {
        if (path === 'home') {
            return location.pathname.at(-1) === '/';
        }
        return location.pathname.split('/').at(-1) === path;
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
        toast.success('Logged out successfully');
    };

    return (
        <div className='shadow-md dark:bg-gray-800 py-2'>
            <div className='w-11/12 mx-auto flex gap-4 justify-between items-center py-3 text-gray-800 dark:text-gray-200 bg'>
                <Link to='/' className='text-3xl font-bold'>
                    DineDash
                </Link>
                <div className="flex items-center gap-6 text-lg font-medium">
                    <Link to='/' className={matchRoute('home') ? 'border-b-2 border-orange-600 dark:border-gray-300 rounded-sm' : ''}>
                        Home
                    </Link>
                    <Link to={'/menu'} className={matchRoute('menu') ? 'border-b-2 border-orange-600 dark:border-gray-300 rounded-sm' : ''}>
                        Menu
                    </Link>
                    <Link to='/about' className={matchRoute('about') ? 'border-b-2 border-orange-600 dark:border-gray-300 rounded-sm' : ''}>
                        About Us
                    </Link>
                    <Link to={'/contact-us'} className={matchRoute('contact-us') ? 'border-b-2 border-orange-600 dark:border-gray-300 rounded-sm' : ''}>
                        Contact us
                    </Link>
                </div>
                <div className="relative flex items-center gap-3 text-lg font-medium">
                    <div className='cursor-pointer font-bold' onClick={() => toggleDarkMode(darkMode)}>
                        {
                            darkMode ? <CiLight fontSize={25} fontWeight={1000} /> : <CiDark fontSize={25} fontWeight={1000} />
                        }
                    </div>
                    <Link to='/cart' className='relative'>
                        <AiOutlineShoppingCart fontSize={25} />
                        <span
                            className='absolute -top-3 -right-1 text-sm text-white bg-[#F56424] rounded-full aspect-square px-1 text-center flex items-center'
                        >
                            {Object.keys(cartItems).filter(key => cartItems[key] > 0).length}
                        </span>
                    </Link>

                    <div className='relative'>
                        {!token ? <button onClick={() => setShowLogin(true)}>sign in</button>
                            : <>
                                <CgProfile
                                    fontSize={25}
                                    className='cursor-pointer'
                                    onClick={() => setShowDropdown(prev => !prev)}
                                />
                                {
                                    showDropdown &&
                                    <div className="absolute right-0 top-9 min-w-[150px] rounded-[6px] border-[1px] border-gray-500 dark:border-gray-200 shadow-lg bg-white dark:bg-slate-900 z-20 flex flex-col gap-1">
                                        <div
                                            onClick={() => { navigate('/myorders'); setShowDropdown(false) }}
                                            className='flex gap-2 items-center cursor-pointer p-2 text-base'
                                        >
                                            <LiaShoppingBagSolid fontSize={24} />
                                            <p>Orders</p>
                                        </div>
                                        <hr />
                                        <div
                                            onClick={() => { logout(); setShowDropdown(false) }}
                                            className='flex gap-2 items-center cursor-pointer p-2 text-base'
                                        >
                                            <IoMdLogOut fontSize={24} />
                                            <p>Logout</p></div>
                                    </div>
                                }
                            </>
                        }
                    </div>
                </div>
            </div >
        </div>
    )
}

export default Navbar;