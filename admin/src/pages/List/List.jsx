import axios from 'axios';
import { toast } from 'react-hot-toast';
import { RiDeleteBin6Line } from 'react-icons/ri';
import React, { useEffect, useMemo, useState } from 'react';

const List = ({ url }) => {

    const [list, setList] = useState([]);

    const fetchList = useMemo(() => async () => {
        const response = await axios.get(`${url}/api/food/list`);
        if (response?.data?.success) {
            setList(response?.data.data);
            console.log(response?.data.data);
        } else {
            toast.error('Error');
        }
    }, [url]);

    const removeFood = async (foodId) => {
        try {
            const loadingToast = toast.loading('Removing food item...');
            const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
            if (response?.data?.success) {
                toast.dismiss(loadingToast);
                toast.success(response?.data?.message);
                setList(list.filter((item) => item._id !== foodId));
            } else {
                toast.dismiss(loadingToast);
                toast.error('Error removing food item.');
            }
        } catch (error) {
            toast.error('Error removing food item.');
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="flex flex-col gap-6 bg-white dark:bg-slate-900 shadow-lg rounded-lg p-4 sm:p-6">
            <p className="text-lg sm:text-2xl font-medium text-gray-800 dark:text-gray-300">All Foods</p>

            <div className="dark:bg-slate-800 rounded-lg">
                {/* Title Row */}
                <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-4 p-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    <p>Image</p>
                    <p>Name</p>
                    <p>Category</p>
                    <p>Price</p>
                    <p>Action</p>
                </div>

                {/* Food List */}
                {list.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 sm:grid-cols-[1fr_3fr_1fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-4 p-4 text-sm bg-gray-50 dark:bg-gray-800 even:bg-gray-100 dark:even:bg-gray-700 hover:bg-purple-50 dark:hover:bg-gray-700 rounded-lg"
                    >
                        {/* Image */}
                        <img
                            src={item.image}
                            alt="Food Item"
                            className="w-16 sm:w-20 rounded-md mx-auto sm:mx-0"
                        />

                        {/* Name */}
                        <p className="text-center sm:text-left font-medium text-gray-800 dark:text-gray-300 capitalize">{item.name}</p>

                        {/* Category */}
                        <p className="text-center sm:text-left text-gray-600 dark:text-gray-400">{item.category}</p>

                        {/* Price */}
                        <p className="hidden md:block text-gray-600 dark:text-gray-400">Rs.{item.price}</p>

                        {/* Action Button */}
                        <button
                            onClick={() => removeFood(item._id)}
                            className="w-fit flex justify-center items-center bg-pink-700 hover:bg-pink-800 text-white p-2 rounded-full mx-auto sm:mx-0"
                        >
                            <RiDeleteBin6Line fontSize={20} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default List;