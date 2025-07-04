import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../components/context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { toast } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const promoCodeSchema = z.object({
    promoCode: z.string().nonempty({ message: 'Promo code is required!' })
});

const Cart = () => {
    const {
        cartItems,
        food_list,
        removeFromCart,
        getTotalCartAmount,
        setDiscountedAmount,
    } = useContext(StoreContext);

    const url = 'http://localhost:4000';
    const navigate = useNavigate();
    const [promoCodes, setPromoCodes] = useState([]);
    const [appliedPromoCode, setAppliedPromoCode] = useState(null);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(promoCodeSchema),
    });

    const fetchAllPromoCodes = async () => {
        try {
            const response = await axios.get(`${url}/api/promocode/all`);
            if (response?.data?.success) {
                setPromoCodes(response.data.data);
            } else {
                toast.error(response.data.message || 'Failed to load promo codes.');
            }
        } catch (error) {
            toast.error('An error occurred while fetching promo codes.');
            console.error(error);
        }
    };

    const getDiscountedAmount = () => {
        let totalAmount = getTotalCartAmount();
        let discountAmount = 0;

        if (appliedPromoCode) {
            const promo = promoCodes.find((code) => code.code === appliedPromoCode);
            if (promo) {
                discountAmount = (promo.discount / 100) * totalAmount;
            }
        }
        const finalAmount = Math.max(totalAmount - discountAmount, 0);
        return finalAmount;
    };

    const getDeliveryFee = () => {
        const totalAmount = getDiscountedAmount();
        return totalAmount > 0 && totalAmount < 100 ? 50 : 0;
    };

    const checkoutHandler = () => {
        if (Object.keys(cartItems).length === 0) {
            toast.error('Your cart is empty!');
        } else {
            navigate('/order');
        }
    };

    const finalAmount = () => {
        return getDiscountedAmount() + getDeliveryFee();
    };

    useEffect(() => {
        const amount = getDiscountedAmount() + getDeliveryFee();
        setDiscountedAmount(amount);
    }, [cartItems, promoCodes, appliedPromoCode]);

    const onSubmit = (data) => {
        const promo = promoCodes.find((code) => code.code === data.promoCode);
        if (promo) {
            setAppliedPromoCode(data.promoCode);
            toast.success('Promo code applied successfully!');
        } else {
            toast.error('Invalid promo code!');
        }
    };

    useEffect(() => {
        fetchAllPromoCodes();
    }, []);

    return (
        <div className="flex flex-col gap-6 bg-white dark:bg-slate-900 rounded-lg p-4 sm:p-6">
            <p className="text-lg sm:text-2xl font-medium text-gray-800 dark:text-gray-300">Your Cart</p>

            {/* Cart Items Table */}
            <div className="shadow-[0px_0px_30px_5px_#00000024] dark:bg-slate-800 rounded-lg">
                <div className="grid grid-cols-[2fr_0.5fr_0.5fr] sm:grid-cols-[1fr_2fr_1fr_0.5fr] md:grid-cols-[1fr_2fr_1fr_1fr_0.5fr] lg:grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr] items-center gap-4 p-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    <p className="hidden sm:block">Image</p>
                    <p>Title</p>
                    <p className="hidden md:block">Price</p>
                    <p className="hidden lg:block">Quantity</p>
                    <p>Total</p>
                    <p>Action</p>
                </div>

                {food_list?.map((item) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div
                                key={item._id}
                                className="grid grid-cols-[2fr_0.5fr_0.5fr] sm:grid-cols-[1fr_2fr_1fr_0.5fr] md:grid-cols-[1fr_2fr_1fr_1fr_0.5fr] lg:grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr] items-center gap-4 p-4 text-sm bg-gray-50 dark:bg-gray-800 even:bg-gray-100 dark:even:bg-gray-700 hover:bg-purple-50 dark:hover:bg-gray-700 rounded-lg"
                            >
                                <img
                                    src={item.image}
                                    alt="Food Item"
                                    className="hidden sm:block w-16 sm:w-20 rounded-md mx-auto sm:mx-0"
                                />
                                <p className="sm:text-left font-medium text-gray-800 dark:text-gray-300 capitalize overflow-hidden whitespace-nowrap text-ellipsis">
                                    {item.name}
                                </p>
                                <p className="hidden md:block text-gray-600 dark:text-gray-400">Rs. {item.price}</p>
                                <p className="hidden lg:block text-gray-600 dark:text-gray-400">{cartItems[item._id]}</p>
                                <p className="text-gray-800 dark:text-gray-300">Rs. {item.price * cartItems[item._id]}</p>
                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    className="w-fit flex justify-center items-center bg-pink-700 hover:bg-pink-800 text-white p-2 rounded-full mx-auto sm:mx-0"
                                >
                                    <RiDeleteBin6Line fontSize={20} />
                                </button>
                            </div>
                        );
                    }
                })}
            </div>

            <div className="w-full flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-2/3 flex flex-col gap-4 dark:bg-slate-800 shadow-[0px_0px_30px_0px_#00000024] rounded-lg p-4">
                    <p className="text-lg sm:text-2xl font-medium text-gray-800 dark:text-gray-300">Cart Total</p>
                    <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400">
                        <p>Subtotal</p>
                        <p>Rs. {getDiscountedAmount()}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400">
                        <p>Delivery Fee</p>
                        <p>Rs. {getDeliveryFee()}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between text-lg font-semibold text-gray-800 dark:text-gray-300">
                        <p>Total</p>
                        <p>Rs. {finalAmount()}</p>
                    </div>
                    <button
                        onClick={checkoutHandler}
                        className="w-full bg-[#FF6347] text-white py-2 px-4 rounded-md text-lg hover:bg-[#FF4C3B] overflow-hidden whitespace-nowrap text-ellipsis"
                    >
                        Proceed to Checkout
                    </button>
                </div>

                <div className="w-full sm:w-1/3 h-fit flex flex-col gap-4 dark:bg-slate-800 shadow-[0px_0px_30px_0px_#00000024] rounded-lg p-4">
                    <p className="text-gray-800 dark:text-gray-300 text-lg">Have a promo code?</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-2">
                        <input
                            type="text"
                            {...register('promoCode')}
                            placeholder="Promo Code"
                            className="min-w-[150px] w-full flex-1 outline-none border-[2px] dark:border-gray-700 text-gray-800 dark:text-gray-300 dark:bg-gray-800 py-2 px-4 rounded-md"
                        />
                        {errors.promoCode && (
                            <p className="text-red-500 text-sm">{errors.promoCode.message}</p>
                        )}
                        <button
                            className="w-full flex-1 bg-[#FF6347] text-white py-2 px-4 rounded-md text-lg hover:bg-[#FF4C3B]"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Cart;