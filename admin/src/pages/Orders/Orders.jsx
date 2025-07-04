import axios from 'axios';
import { toast } from 'react-hot-toast';
import React, { useState, useEffect } from 'react';
import { assets } from './../../../../frontend/src/assets/assets';

const Orders = ({ url }) => {

    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        const response = await axios.get(url + '/api/order/list');
        if (response.data.success) {
            setOrders(response.data.data);
        } else {
            toast.error('Error');
        }
    };

    const statusHandler = async (event, orderId) => {
        try {
            const response = await axios.post(url + '/api/order/status', {
                orderId,
                status: event.target.value,
            });

            if (response.data.success) {
                toast.success('Status updated successfully.');
                fetchAllOrders();
            } else {
                toast.error(response.data.message || 'Failed to update status.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error updating status.');
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <div className="flex flex-col gap-6 bg-white dark:bg-slate-900 shadow-lg rounded-lg p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-semibold dark:text-gray-300 text-gray-700">Orders Page</h3>

            <div className="space-y-6">
                {orders.map((order, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr] gap-4 items-center border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-slate-800"
                    >
                        <img
                            src={assets.parcel_icon}
                            alt="Order Icon"
                            className="w-12 h-12 sm:w-14 sm:h-14 mx-auto sm:mx-0"
                        />
                        <div className="space-y-2 text-center sm:text-left">
                            <p className="font-bold text-gray-800 dark:text-gray-300 capitalize">
                                {order.items.map((item, idx) =>
                                    idx === order.items.length - 1
                                        ? `${item.name} x ${item.quantity}`
                                        : `${item.name} x ${item.quantity}, `
                                )}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{`${order.address.firstName} ${order.address.lastName}`}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {order.address.state}, {order.address.city}, {order.address.country}, {order.address.zipcode}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{order.address.phone}</p>
                        </div>
                        <div className="text-center sm:text-left">
                            <p className="font-semibold text-gray-800 dark:text-gray-300">Items: {order.items.length}</p>
                            <p className="font-bold text-lg text-green-600 dark:text-green-400">Rs.{order.amount}</p>
                        </div>
                        <select
                            onChange={(event) => statusHandler(event, order._id)}
                            value={order.status}
                            className="bg-gray-100 dark:bg-gray-700 border border-tomato dark:border-gray-500 rounded-md px-4 py-2 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all mx-auto sm:mx-0"
                        >
                            <option value="Food Processing">Food Processing</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;