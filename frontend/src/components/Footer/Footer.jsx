import React from 'react';
import { Link } from 'react-router-dom';
import { FaMeta } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import { BsLinkedin, BsInstagram } from "react-icons/bs";

const Footer = () => {

    return (
        <div className='bg-slate-500 text-white dark:bg-slate-800 dark:text-gray-200 flex flex-col items-center gap-[20px] py-10' id='footer'>
            <div className="w-11/12 mx-auto flex max-[600px]:flex-col gap-8 justify-between">
                <div className="flex flex-col gap-4 max-w-[50%] max-[600px]:max-w-full">
                    <p className='text-4xl font-semibold'>DineDash</p>
                    <p className='text-base text-justify'>FoodieDelivery brings delicious meals to your door, from comfort food to healthy options and late-night snacks. Explore top restaurants, order in clicks, and let us handle the rest. Delivering happiness, one meal at a time—thank you for choosing FoodieDelivery!</p>
                    <div className="flex gap-6 items-center">
                        <Link to={'https://facebook.com/'} target='_blank'><FaMeta fontSize={24} /></Link>
                        <Link to={'https://x.com/'} target='_blank'><RiTwitterXFill fontSize={24} /></Link>
                        <Link to={'https://linkedin.com/'} target='_blank'><BsLinkedin fontSize={24} /></Link>
                        <Link to={'https://instagram.com/'} target='_blank'><BsInstagram fontSize={24} /></Link>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className='text-lg font-medium'>Company</h2>
                    <div className='text-base flex flex-col gap-2'>
                        <Link to={'/'}>Home</Link>
                        <Link to={'/about'}>About Us</Link>
                        <Link to={'/contact-us'}>Contact Us</Link>
                        <Link to={'/refund-policy'}>Refund Policy</Link>
                        <Link to={'/privacy-policy'}>Privacy Policy</Link>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className='text-lg font-medium capitalize'>Get in touch</h2>
                    <div className='text-base flex flex-col gap-2'>
                        <a href="tel:+917654897359">+91 941261****</a>
                        <a href="mailto:contact@fooddelivery.com">vishalsingh****@gmail.com</a>
                    </div>
                </div>
            </div>
            <div className='w-10/12 h-[0.8px] my-2 bg-gray-800 dark:bg-gray-200 flex items-center justify-center' />
            <p className="text-sm">
                Copyright &copy; {new Date().getFullYear()} - All Right Reserved.
            </p>
        </div>
    )
}

export default Footer
