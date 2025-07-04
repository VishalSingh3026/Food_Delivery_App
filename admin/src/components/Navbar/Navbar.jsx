import { CgProfile } from 'react-icons/cg';
import { IoMdLogOut } from "react-icons/io";
import { NavLink, useNavigate } from 'react-router-dom';
import { CiLight, CiDark } from "react-icons/ci";
import React, { useContext, useState } from 'react';
// import { LiaShoppingBagSolid } from "react-icons/lia";
import { ThemeContext } from '../../utils/ThemeContext';
import { StoreContext } from './../context/StoreContext';

const Navbar = ({ setShowLogin }) => {

    const navigate = useNavigate();

    // const [showDropdown, setShowDropdown] = useState(false);
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);

    // const { token, setToken } = useContext(StoreContext);

    // const logout = () => {
    //     localStorage.removeItem("token");
    //     setToken("");
    //     navigate("/");
    // }

    return (
        <div className='flex justify-between gap-4 bg-white shadow-md dark:bg-gray-900 p-4'>
            <NavLink to='/' className='text-3xl font-bold dark:text-gray-400'>
                DineDash <span className='text-sm hidden sm:inline'>Admin</span>
            </NavLink>

            <div className="relative flex items-center gap-4 text-lg font-medium">
                <div className='cursor-pointer font-bold' onClick={() => toggleDarkMode(darkMode)}>
                    {
                        darkMode ? <CiLight fontSize={25} fontWeight={1000} className='dark:text-gray-400' /> : <CiDark fontSize={25} fontWeight={1000} />
                    }
                </div>

                {/* <div className='relative'>
                    {!token ? <button onClick={() => setShowLogin(true)}>sign in</button>
                        : <>
                            <CgProfile
                                fontSize={25}
                                className='cursor-pointer dark:text-gray-400'
                                onClick={() => setShowDropdown(prev => !prev)}
                            />
                            {
                                showDropdown &&
                                <div className="absolute right-0 top-9 min-w-[150px] rounded-[6px] border-[1px] border-gray-500 dark:border-gray-200 shadow-lg bg-white dark:bg-slate-900 z-20 flex flex-col gap-1">
                                    <div
                                        onClick={() => { navigate('/myorders'); setShowDropdown(false) }}
                                        className='dark:text-gray-400 flex gap-2 items-center cursor-pointer p-2 text-base'
                                    >
                                        <LiaShoppingBagSolid fontSize={24} />
                                        <p>Orders</p>
                                    </div>
                                    <hr />
                                    <div
                                        onClick={() => { logout(); setShowDropdown(false) }}
                                        className='dark:text-gray-400 flex gap-2 items-center cursor-pointer p-2 text-base'
                                    >
                                        <IoMdLogOut fontSize={24} />
                                        <p>Logout</p></div>
                                </div>
                            }
                        </>
                    }
                </div> */}
            </div>
        </div >
    )
}

export default Navbar;