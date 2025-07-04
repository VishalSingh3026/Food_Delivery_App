import React, { useContext, useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import { StoreContext } from '../../components/context/StoreContext';

const Home = () => {

    const [category, setCategory] = useState('All');
    const { food_list } = useContext(StoreContext);

    return (
        <div className='w-11/12 mx-auto py-2 text-gray-800 dark:text-gray-200'>
            <Header />
            <ExploreMenu category={category} setCategory={setCategory} />
            <FoodDisplay category={category} food_list={food_list} slice={true} />
        </div>
    )
}

export default Home;