import { z } from 'zod';
import axios from 'axios';
import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';

const PromoCode = ({ url }) => {

    // Zod schema for promo code validation
    const schema = z.object({
        code: z.string().min(3, { message: 'Promo code must be at least 3 characters long' }),
        discount: z.string().min(1, { message: 'Discount must be greater than 0' }),
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const [promoCodes, setPromoCodes] = useState([]);

    // Fetch promo codes from the server
    const fetchPromoCodes = useMemo(() => async () => {
        try {
            const response = await axios.get(`${url}/api/promocode/all`);
            if (response?.data.success) {
                setPromoCodes(response?.data?.data);
                toast.success(response?.data?.message);
            } else {
                toast.error('Error fetching promo codes.');
            }
        } catch (error) {
            toast.error('Error fetching promo codes.');
        }
    }, [url]);

    // Handle promo code creation
    const onSubmit = async (data) => {
        const response = await axios.post(`${url}/api/promocode/create`, data);
        if (response?.data?.success) {
            reset();  // Reset the form fields
            toast.success(response?.data?.message);
            // Refetch all promo codes after creating a new one
            fetchPromoCodes();
        } else {
            toast.error(response?.data?.message);
        }
    };

    // Handle promo code removal
    const removePromoCode = async (id) => {
        try {
            const response = await axios.delete(`${url}/api/promocode/delete/${id}`);
            if (response?.data?.success) {
                toast.success(response?.data?.message);
                setPromoCodes(promoCodes.filter((code) => code._id !== id));
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            toast.error('Error deleting promo code.');
        }
    };

    useEffect(() => {
        fetchPromoCodes();
        console.log('Promo Codes:', promoCodes);
    }, []);

    return (
        <div className="w-11/12 max-w-[900px] flex flex-col md:flex-row gap-6 justify-between bg-white dark:bg-slate-900 shadow-lg rounded-lg p-4 sm:p-6">
            {/* Promo Code Creation Form */}
            <div className="w-full md:w-1/2 flex flex-col gap-4">
                <p className="text-lg sm:text-2xl font-medium text-gray-800 dark:text-gray-300">Create Promo Code</p>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-3 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-gray-500 p-3 rounded-[6px]"
                >
                    <div className="flex flex-col gap-1">
                        <label htmlFor="code" className="dark:text-gray-400">Promo Code</label>
                        <input
                            type="text"
                            id="code"
                            {...register('code')}
                            className={`w-full outline-none px-3 py-2 dark:text-gray-200 dark:bg-slate-900 border-[1.8px] ${errors.code
                                ? 'border-red-500 dark:border-red-500'
                                : 'border-gray-200 dark:border-gray-500'
                                } rounded-lg`}
                            placeholder="Enter promo code"
                        />
                        {errors.code && <p className="text-sm text-red-500 mt-1">{errors.code.message}</p>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="discount" className="dark:text-gray-400">Discount (%)</label>
                        <input
                            type="number"
                            id="discount"
                            {...register('discount')}
                            className={`w-full outline-none px-3 py-2 dark:text-gray-200 dark:bg-slate-900 border-[1.8px] ${errors.discount
                                ? 'border-red-500 dark:border-red-500'
                                : 'border-gray-200 dark:border-gray-500'
                                } rounded-lg`}
                            placeholder="Enter discount percentage"
                        />
                        {errors.discount && <p className="text-sm text-red-500 mt-1">{errors.discount.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full sm:w-40 text-center py-3 bg-gray-400 dark:bg-gray-900 dark:text-gray-200 rounded-lg hover:bg-gray-500 dark:hover:bg-gray-700"
                    >
                        Create
                    </button>
                </form>
            </div>

            {/* Promo Code List */}
            <div className="w-full md:w-1/2 flex flex-col gap-3 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-gray-500 p-3 rounded-[6px] dark:text-gray-400 text-center">
                <div className="grid grid-cols-4 text-sm font-medium">
                    <p className="text-gray-700 dark:text-gray-300">S. No.</p>
                    <p className="text-gray-700 dark:text-gray-300">Promo Code</p>
                    <p className="text-gray-700 dark:text-gray-300">Discount (%)</p>
                    <p className="text-gray-700 dark:text-gray-300">Action</p>
                </div>
                <div className="overflow-auto h-fit">
                    {promoCodes?.length > 0 ? (
                        promoCodes?.map((item, index) => (
                            <div
                                className="grid grid-cols-4 border-b border-gray-200 dark:border-gray-700 py-3 text-sm"
                                key={item._id}
                            >
                                <p>{index + 1}</p>
                                <p>{item.code}</p>
                                <p>{item.discount}%</p>
                                <span className="flex items-center justify-center">
                                    <button
                                        onClick={() => removePromoCode(item._id)}
                                        className="w-fit flex justify-center items-center bg-pink-700 hover:bg-pink-800 text-white p-2 rounded-full mx-auto sm:mx-0"
                                    >
                                        <RiDeleteBin6Line fontSize={20} />
                                    </button>
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">No promo codes available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PromoCode;