import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaListCheck } from "react-icons/fa6";
import { MdAddCircleOutline } from "react-icons/md";
import { MdOutlineFormatListBulleted } from "react-icons/md";

const Sidebar = () => {

    return (
        <div className='min-w-[60px] max-w-[300px] w-[16%] md:w-[8%] lg:w-[16%] xl:w-[14%] bg-white dark:bg-slate-900 p-4 shadow-md'>

            <div className="flex flex-col gap-2 py-5">
                <NavLink
                    to='/'
                    className="flex gap-2 items-center justify-between bg-gray-200 dark:bg-gray-700 dark:text-gray-400 p-2 rounded-[6px]"
                >
                    <MdAddCircleOutline className="w-[20px] h-[20px]" />
                    <span className='hidden lg:block'>Add Items</span>
                </NavLink>
                <NavLink
                    to='/category'
                    className="flex gap-2 items-center justify-between bg-gray-200 dark:bg-gray-700 dark:text-gray-400 p-2 rounded-[6px]"
                >
                    <MdAddCircleOutline className="w-[20px] h-[20px]" />
                    <span className='hidden lg:block'>Add Category</span>
                </NavLink>
                <NavLink
                    to='/list/items'
                    className="flex gap-2 items-center justify-between bg-gray-200 dark:bg-gray-700 dark:text-gray-400 p-2 rounded-[6px]"
                >
                    <MdOutlineFormatListBulleted className="w-[20px] h-[20px]" />
                    <span className='hidden lg:block'>List Items</span>
                </NavLink>
                <NavLink
                    to='/promocode'
                    className="flex gap-2 items-center justify-between bg-gray-200 dark:bg-gray-700 dark:text-gray-400 p-2 rounded-[6px]"
                >
                    <MdOutlineFormatListBulleted className="w-[20px] h-[20px]" />
                    <span className='hidden lg:block'>Promo Code</span>
                </NavLink>
                <NavLink
                    to='/orders'
                    className="flex gap-2 items-center justify-between bg-gray-200 dark:bg-gray-700 dark:text-gray-400 p-2 rounded-[6px]"
                >
                    <MdOutlineFormatListBulleted className="w-[20px] h-[20px]" />
                    <span className='hidden lg:block'>Orders</span>
                </NavLink>
                <NavLink
                    to='/contact'
                    className="flex gap-2 items-center justify-between bg-gray-200 dark:bg-gray-700 dark:text-gray-400 p-2 rounded-[6px]"
                >
                    <MdOutlineFormatListBulleted className="w-[20px] h-[20px]" />
                    <span className='hidden lg:block'>Contact List</span>
                </NavLink>
            </div>

        </div>
    )
}

export default Sidebar