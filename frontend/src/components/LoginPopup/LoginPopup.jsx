import { z } from 'zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { RxCross2 } from 'react-icons/rx';
import React, { useContext, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { StoreContext } from './../context/StoreContext';
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeOff } from "react-icons/hi";
import toast from 'react-hot-toast';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});

const signUpSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});

const LoginPopup = ({ setShowLogin }) => {

    const { url, setToken } = useContext(StoreContext);
    const [currentState, setCurrentState] = useState('Login');
    const schema = currentState === 'Login' ? loginSchema : signUpSchema;

    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        let newUrl = url;
        if (currentState === 'Login') {
            newUrl += '/api/user/login';
        } else {
            newUrl += '/api/user/register';
        }

        try {
            const response = await axios.post(newUrl, data);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem('token', response?.data.token);
                setShowLogin(false);
                if (currentState === 'Login') {
                    toast.success('Logged in successfully');
                } else {
                    toast.success('Account created successfully');
                }
            } else {
                toast.error(response?.data.message);
            }
        } catch (error) {
            console.error('Error during submission:', error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="absolute z-10 w-full h-full bg-black/90 grid">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="place-self-center max-w-[280px] sm:max-w-[40vw] md:max-w-[500px] text-gray-500 bg-white dark:bg-slate-900 flex flex-col gap-4 p-6 rounded-lg text-sm animate-fadeIn"
            >
                <div className="flex justify-between items-center text-gray-800 dark:text-gray-200">
                    <h2 className="text-2xl font-medium">{currentState}</h2>
                    <RxCross2
                        fontSize={25}
                        className="cursor-pointer"
                        onClick={() => setShowLogin(false)}
                    />
                </div>
                <div className="flex flex-col gap-[20px]">
                    {currentState === 'Sign Up' && (
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="name"
                                className="block text-sm text-gray-800 dark:text-gray-200 font-medium"
                            >
                                Name
                            </label>
                            <input
                                {...register('name')}
                                type="text"
                                placeholder="Your Name"
                                className="w-full outline-none text-gray-800 dark:text-gray-300 dark:bg-slate-800 border-[1.5px] border-gray-500 dark:border-gray-600 p-2 rounded-[6px]"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>
                    )}

                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="email"
                            className="block text-sm text-gray-800 dark:text-gray-200 font-medium"
                        >
                            Email
                        </label>
                        <input
                            {...register('email')}
                            type="email"
                            placeholder="Your Email"
                            className="w-full outline-none text-gray-800 dark:text-gray-300 dark:bg-slate-800 border-[1.5px] border-gray-500 dark:border-gray-600 p-2 rounded-[6px]"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="relative flex flex-col gap-1">
                        <label
                            htmlFor="password"
                            className="block text-sm text-gray-800 dark:text-gray-200 font-medium"
                        >
                            Password
                        </label>
                        <input
                            {...register('password')}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Your Password"
                            className="w-full outline-none pr-9 text-gray-800 dark:text-gray-300 dark:bg-slate-800 border-[1.5px] border-gray-500 dark:border-gray-600 p-2 rounded-[6px]"
                        />
                        <div className='absolute top-1/2 right-2 text-gray-500 dark:text-gray-200 text-2xl cursor-pointer'>
                            {
                                showPassword
                                    ? <HiOutlineEyeOff
                                        onClick={() => setShowPassword(false)}
                                    />
                                    : <HiOutlineEye
                                        onClick={() => setShowPassword(true)}
                                    />
                            }
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-[#F56424] text-white p-2 rounded-[6px] mt-4"
                >
                    {currentState === 'Sign Up' ? 'Create account' : 'Login'}
                </button>

                {currentState === 'Login' ? (
                    <p className="text-gray-800 dark:text-gray-200">
                        Create a new account?{' '}
                        <span
                            onClick={() => setCurrentState('Sign Up')}
                            className="cursor-pointer"
                        >
                            Click here
                        </span>
                    </p>
                ) : (
                    <p className='text-gray-800 dark:text-gray-200'>
                        Already have an account?{' '}
                        <span
                            onClick={() => setCurrentState('Login')}
                            className="cursor-pointer"
                        >
                            Login here
                        </span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginPopup;