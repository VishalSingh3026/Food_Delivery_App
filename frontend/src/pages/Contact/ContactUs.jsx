import { z } from 'zod';
import React from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Define the validation schema using Zod
const contactSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    phone: z.string()
        .min(10, 'Phone number should be at least 10 digits')
        .max(12, 'Phone number is too long.')
        .regex(/^\d+$/, 'Phone number should contain only numbers'),
    subject: z.string().min(1, 'Subject is required'),
    message: z.string().min(1, 'Message is required').max(500, 'Message is too long'),
});

const ContactUs = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(contactSchema),
    });

    const url = 'http://localhost:4000';

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await axios.post(url + '/api/contact/create', data);
            if (response.data.success) {
                toast.success("Data Send Successfully!");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
        reset();
    };

    return (
        <div className="w-8/12 mx-auto p-6 my-8 bg-white dark:bg-slate-800 rounded-[6px] shadow-[0px_0px_30px_0px_#00000024]">
            <h2 className="text-3xl font-semibold text-center mb-4 text-gray-800 dark:text-gray-200">Contact Us</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {/* Name Field */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="block text-sm text-gray-800 dark:text-gray-200 font-medium">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder='Enter Name'
                        {...register('name')}
                        className="w-full outline-none text-gray-800 dark:text-gray-300 dark:bg-slate-800 border-[1.5px] border-gray-500 dark:border-gray-600 p-2 rounded-[6px]"
                    />
                    {errors.name && <p className="text-red-500 text-sm py-2">{errors.name.message}</p>}
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="block text-sm text-gray-800 dark:text-gray-200 font-medium">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder='Enter Email'
                        {...register('email')}
                        className="w-full outline-none text-gray-800 dark:text-gray-300 dark:bg-slate-800 border-[1.5px] border-gray-500 dark:border-gray-600 p-2 rounded-[6px]"
                    />
                    {errors.email && <p className="text-red-500 text-sm py-2">{errors.email.message}</p>}
                </div>

                {/* Phone Field */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="phone" className="block text-sm text-gray-800 dark:text-gray-200 font-medium">Phone</label>
                    <input
                        type="number"
                        id="phone"
                        placeholder='Enter Phone'
                        {...register('phone')}
                        className="w-full outline-none text-gray-800 dark:text-gray-300 dark:bg-slate-800 border-[1.5px] border-gray-500 dark:border-gray-600 p-2 rounded-[6px] no-spin"
                    />
                    {errors.phone && <p className="text-red-500 text-sm py-2">{errors.phone.message}</p>}
                </div>

                {/* Subject Field */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="subject" className="block text-sm text-gray-800 dark:text-gray-200 font-medium">Subject</label>
                    <input
                        type="text"
                        id="subject"
                        placeholder='Enter Subject'
                        {...register('subject')}
                        className="w-full outline-none text-gray-800 dark:text-gray-300 dark:bg-slate-800 border-[1.5px] border-gray-500 dark:border-gray-600 p-2 rounded-[6px]"
                    />
                    {errors.subject && <p className="text-red-500 text-sm py-2">{errors.subject.message}</p>}
                </div>

                {/* Message Field */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="message" className="block text-sm text-gray-800 dark:text-gray-200 font-medium">Message</label>
                    <textarea
                        id="message"
                        placeholder='Enter Message'
                        {...register('message')}
                        className="w-full outline-none text-gray-800 dark:text-gray-300 dark:bg-slate-800 border-[1.5px] border-gray-500 dark:border-gray-600 p-2 rounded-[6px]"
                        rows={4}
                    />
                    {errors.message && <p className="text-red-500 text-sm py-2">{errors.message.message}</p>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="bg-[#F56424] text-white p-2 rounded-[6px] mt-4">Submit</button>
            </form>
        </div>
    );
};

export default ContactUs;