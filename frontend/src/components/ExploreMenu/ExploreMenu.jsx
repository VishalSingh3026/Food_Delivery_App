import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const ExploreMenu = ({ category, setCategory }) => {

    const url = 'http://localhost:4000';
    const [categories, setCategories] = useState([]);

    const fetchAllCategories = async () => {
        try {
            const response = await axios.get(`${url}/api/category/all`);
            if (response?.data?.success) {
                setCategories(response?.data?.data);
            } else {
                toast.error(response.data.message || 'Failed to load categories.');
            }
        } catch (error) {
            toast.error('An error occurred while fetching categories.');
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAllCategories();
    }, []);

    return (
        <div className='flex flex-col gap-4 py-6' id='explore-menu'>
            <div className='flex flex-col gap-3'>
                <h1 className='text-3xl font-semibold dark:text-gray-100'>Explore Our Menu</h1>
                <p className='text-base text-justify'>From fresh salads and rolls to indulgent desserts and hearty sandwiches, our menu offers something for everyone. Whether you're craving pure veg dishes, delightful cakes, creamy pasta, or flavorful noodles, we've got you covered!</p>
            </div>
            <div className="flex items-center gap-[30px] text-center my-[20px] overflow-scroll scrollbar-none">
                {categories?.map((item) => {
                    return (
                        <div
                            key={item._id}
                            className='flex flex-col gap-7'
                            onClick={() => setCategory(prev => prev === item.name ? 'All' : item.name)}
                        >
                            <img
                                className={`w-[7.5vw] aspect-square object-cover min-w-[60px] rounded-full transition-all duration-200 ${category === item.name && 'border-[4px] border-[#ff6347] p-[2px]'}`}
                                src={item.image}
                                alt=""
                            />
                            <p className='text-gray-800 dark:text-gray-200 '>{item.name}</p>
                        </div>
                    )
                })}
            </div>
            <hr className='my-3 h-[2px] bg-[#e2e2e2] border-none' />
        </div>
    )
}

export default ExploreMenu