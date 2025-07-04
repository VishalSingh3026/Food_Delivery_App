import React from 'react';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category, food_list, slice = false }) => {

    const foodItems = slice ? food_list.slice(0, 10) : food_list;

    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-3xl capitalize font-semibold dark:text-gray-100'>Top dishes near you</h1>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-8 row-gap-12">
                {foodItems.map((item) => (
                    (category === 'All' || category === item.category) &&
                    <FoodItem
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.image}
                    />
                ))}
            </div>
        </div>
    )
}

export default FoodDisplay