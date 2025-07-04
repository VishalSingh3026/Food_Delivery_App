import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from './../../components/context/StoreContext';
import axios from 'axios';
import { assets } from './../../assets/assets';

const MyOrders = () => {

    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(
            url + '/api/order/userorders',
            { token },
            { headers: { token } }
        );
        setData(response.data.data);
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className="w-11/12 mx-auto py-6 text-gray-800 dark:text-gray-200">
            {/* Title */}
            <h2 className="text-2xl font-semibold text-center mb-6 dark:text-gray-100">
                My Orders
            </h2>

            {/* Orders Container */}
            <div className="flex flex-col gap-6">
                {data.map((order, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4"
                    >
                        {/* Icon */}
                        <img
                            src={assets.parcel_icon}
                            alt="Parcel Icon"
                            className="w-12 h-12 sm:w-16 sm:h-16"
                        />

                        {/* Order Details */}
                        <div className="flex-1 flex flex-col gap-2">
                            <p className="text-sm sm:text-base dark:text-gray-300 capitalize">
                                {order.items.map((item, i) =>
                                    i === order.items.length - 1
                                        ? `${item.name} x ${item.quantity}`
                                        : `${item.name} x ${item.quantity}, `
                                )}
                            </p>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                                Items: {order.items.length}
                            </p>
                            <p className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200">
                                <span className="text-green-500 dark:text-green-400">
                                    &#x25cf;
                                </span>{' '}
                                <b>{order.status}</b>
                            </p>
                        </div>

                        {/* Order Amount */}
                        <div className="flex flex-col items-center sm:items-end">
                            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                Rs.{order.amount}
                            </p>
                            <button
                                onClick={fetchOrders}
                                className="mt-2 px-4 py-2 bg-[#FF6347] text-white text-sm rounded-md hover:bg-blue-600"
                            >
                                Track Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;