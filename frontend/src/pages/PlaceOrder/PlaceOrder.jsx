import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import './PlaceOrder.css';
import { StoreContext } from '../../components/context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Define the schema using zod
const orderSchema = z.object({
    firstName: z.string().min(1, "First name is required").max(50, "First name is too long"),
    lastName: z.string().min(1, "Last name is required").max(50, "Last name is too long"),
    email: z.string().email("Invalid email address"),
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipcode: z.string().regex(/^\d{6}$/, "Invalid zip code"),
    country: z.string().min(1, "Country is required"),
    phone: z.string().regex(/^\d{10,12}$/, "Phone number must be 10-12 digits"),
});

const PlaceOrder = () => {

    const { discountedAmount, token, food_list, cartItems, url } = useContext(StoreContext);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(orderSchema),
    });

    const placeOrder = async (formData) => {
        let orderItems = [];
        food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = { ...item, quantity: cartItems[item._id] };
                orderItems.push(itemInfo);
            }
        });

        const orderData = {
            address: formData,
            items: orderItems,
            amount: discountedAmount,
            token
        };

        try {
            const response = await axios.post(url + '/api/order/place', orderData, { headers: { token } });
            if (response?.data?.success) {
                toast.success('Order placed successfully.');
                const { session_url } = response?.data;
                window.location.replace(session_url);
            } else {
                toast.error('Error placing order.');
            }
        } catch (error) {
            console.error("Order placement error:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/cart');
        }
    }, [token]);

    return (
        <div className='w-11/12 mx-auto my-10 text-gray-800 dark:text-gray-200 flex flex-col gap-6'>
            <form onSubmit={handleSubmit(placeOrder)} className='flex gap-6 justify-between dark:bg-slate-800 shadow-[0px_0px_30px_0px_#00000024] rounded-[6px] p-5'>

                <div className="w-full md:w-2/3 flex flex-col gap-4">
                    <p className="text-2xl font-medium">Delivery Information</p>
                    <div className='w-full flex flex-col gap-2'>
                        <div className="flex gap-2 justify-between">
                            <div className='w-full'>
                                <input
                                    type="text"
                                    placeholder='First Name'
                                    {...register('firstName')}
                                    className="w-full outline-none text-gray-800 dark:text-gray-300 dark:bg-slate-800 border-[1.5px] border-gray-500 dark:border-gray-600 p-2 rounded-[6px]"
                                />
                                {errors.firstName && <p className="text-red-500 text-sm py-2">{errors.firstName.message}</p>}
                            </div>
                            <div className='w-full'>
                                <input
                                    type="text"
                                    placeholder='Last Name'
                                    {...register('lastName')}
                                    className="w-full outline-none text-gray-800 dark:text-gray-300 dark:bg-slate-800 border-[1.5px] border-gray-500 dark:border-gray-600 p-2 rounded-[6px]"
                                />
                                {errors.lastName && <p className="text-red-500 text-sm py-2">{errors.lastName.message}</p>}
                            </div>
                        </div>

                        <div className='flex gap-2 justify-between'>
                            <div className='w-full'>
                                <input
                                    type="email"
                                    placeholder='Enter Email'
                                    {...register('email')}
                                    className="w-full outline-none text-gray-800 dark:text-gray-300 dark:bg-slate-800 border-[1.5px] border-gray-500 dark:border-gray-600 p-2 rounded-[6px]"
                                />
                                {errors.email && <p className="text-red-500 text-sm py-2">{errors.email.message}</p>}
                            </div>
                            <div className='w-full'>
                                <input
                                    type="text"
                                    placeholder='Street'
                                    {...register('street')}
                                    className="w-full outline-none text-gray-800 dark:text-gray-300 dark:bg-slate-800 border-[1.5px] border-gray-500 dark:border-gray-600 p-2 rounded-[6px]"
                                />
                                {errors.street && <p className="text-red-500 text-sm py-2">{errors.street.message}</p>}
                            </div>
                        </div>

                        <div className='flex gap-2 justify-between'>
                            <div className='w-full'>
                                <input
                                    type="text"
                                    placeholder='City'
                                    {...register('city')}
                                    className="w-full outline-none text-gray-800 dark:text-gray-300 dark:bg-slate-800 border-[1.5px] border-gray-500 dark:border-gray-600 p-2 rounded-[6px]"
                                />
                                {errors.city && <p className="text-red-500 text-sm py-2">{errors.city.message}</p>}
                            </div>
                            <div className='w-full'>
                                <input
                                    type="text"
                                    placeholder='State'
                                    {...register('state')}
                                    className="w-full outline-none text-gray-800 dark:text-gray-300 dark:bg-slate-800 border-[1.5px] border-gray-500 dark:border-gray-600 p-2 rounded-[6px]"
                                />
                                {errors.state && <p className="text-red-500 text-sm py-2">{errors.state.message}</p>}
                            </div>
                        </div>

                        <div className='flex gap-2 justify-between'>
                            <div className='w-full'>
                                <input
                                    type="text"
                                    placeholder='Zip code'
                                    {...register('zipcode')}
                                    className="w-full outline-none text-gray-800 dark:text-gray-300 dark:bg-slate-800 border-[1.5px] border-gray-500 dark:border-gray-600 p-2 rounded-[6px]"
                                />
                                {errors.zipcode && <p className="text-red-500 text-sm py-2">{errors.zipcode.message}</p>}
                            </div>
                            <div className='w-full'>
                                <input
                                    type="text"
                                    placeholder='Country'
                                    {...register('country')}
                                    className="w-full outline-none text-gray-800 dark:text-gray-300 dark:bg-slate-800 border-[1.5px] border-gray-500 dark:border-gray-600 p-2 rounded-[6px]"
                                />
                                {errors.country && <p className="text-red-500 text-sm py-2">{errors.country.message}</p>}
                            </div>
                        </div>

                        <div className='w-full'>
                            <input
                                type="number"
                                placeholder='Phone'
                                {...register('phone')}
                                className="w-full outline-none text-gray-800 dark:text-gray-300 dark:bg-slate-800 border-[1.5px] border-gray-500 dark:border-gray-600 p-2 rounded-[6px] no-spin"
                            />
                            {errors.phone && <p className="text-red-500 text-sm py-2">{errors.phone.message}</p>}
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/3">
                    <div className="w-full flex flex-col gap-4">
                        <h2 className='text-2xl font-medium'>Cart Total</h2>
                        <div className='flex flex-col gap-3'>
                            <div className="flex justify-between">
                                <b>Total</b>
                                <b>Rs.{discountedAmount}</b>
                            </div>
                        </div>
                        <button type='submit' className='bg-[#FF6347] p-[10px] text-white rounded-[6px]'>PROCEED TO PAYMENT</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PlaceOrder;