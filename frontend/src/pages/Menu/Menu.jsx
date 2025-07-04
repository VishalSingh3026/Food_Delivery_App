import { GoSearch } from "react-icons/go";
import { useContext, useEffect, useState } from 'react';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import { StoreContext } from '../../components/context/StoreContext';
import toast from "react-hot-toast";
import axios from "axios";

const Menu = () => {

    const [category, setCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const { food_list } = useContext(StoreContext);

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

    // Filtered food list based on category and search query
    const filteredFoodList = food_list.filter(item =>
        (category === 'All' || item.category === category) &&
        (item.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) || item.description.toLowerCase().includes(searchQuery.toLowerCase().trim()))
    );

    return (
        <div className="w-11/12 mx-auto py-2 text-gray-800 dark:text-gray-200">
            <div className="flex flex-col gap-4 py-4" id="explore-menu">
                {/* Header */}
                <div className="w-full flex flex-col sm:flex-row gap-3 justify-between items-center">
                    <h1 className="text-3xl font-semibold dark:text-gray-100">Explore Our Menu</h1>
                    <div className="flex gap-4 items-center">
                        {/* Category Dropdown */}
                        <select
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full max-w-[150px] outline-none border-[1.2px] border-gray-300 rounded-[6px] py-1 px-2 dark:bg-gray-800 dark:text-gray-200"
                        >
                            <option value="All">All Categories</option>
                            {categories.map((item) => (
                                <option value={item.name} key={item._id}>{item.name}</option>
                            ))}
                        </select>

                        {/* Search Input */}
                        <div className="w-full flex items-center gap-2 px-2 py-[6px] ring-[1.2px] ring-gray-300 rounded-full dark:bg-gray-800 text-sm">
                            <GoSearch className="text-gray-600 dark:text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full max-w-[200px] outline-none bg-transparent text-gray-800 dark:text-gray-200"
                            />
                        </div>
                    </div>
                </div>

                <hr className="my-2 h-[2px] bg-[#e2e2e2] border-none" />
            </div>

            {/* Food Display */}
            <FoodDisplay category={category} food_list={filteredFoodList} />
        </div>
    );
};

export default Menu;