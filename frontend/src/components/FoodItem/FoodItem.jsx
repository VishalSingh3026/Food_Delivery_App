import React, { useContext } from 'react';
import { assets } from '../../assets/assets'
import { StoreContext } from '../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {

    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

    return (
        <div className='w-full mx-auto rounded-[6px] bg-white dark:bg-slate-800 shadow-[0px_0px_30px_0px_#00000024] hover:scale-110 hover:shadow-xl transition-all duration-500 animate-fadeIn'>
            <div className="relative">
                <img className='w-full rounded-[6px]' src={image} alt="" />
                {
                    !cartItems[id] ?
                        <img
                            className='w-[35px] absolute bottom-4 right-4 cursor-pointer rounded-full'
                            onClick={() => addToCart(id)}
                            src={assets.add_icon_white}
                        />
                        : <div
                            className="absolute bottom-[15px] right-[15px] flex items-center gap-2 p-1.5 rounded-full bg-white"
                        >
                            <img
                                className='w-[30px] cursor-pointer'
                                onClick={() => removeFromCart(id)}
                                src={assets.remove_icon_red}
                                alt=""
                            />
                            <p className='text-gray-800'>{cartItems[id]}</p>
                            <img
                                className='cursor-pointer'
                                onClick={() => addToCart(id)}
                                src={assets.add_icon_green}
                                alt=""
                            />
                        </div>
                }
            </div>
            <div className="p-5">
                <div className="flex justify-between gap-2 items-center mb-2.5">
                    <p className='text-xl font-medium overflow-hidden whitespace-nowrap text-ellipsis'>{name}</p>
                    <img src={assets.rating_starts} alt="" className='w-[70px]' />
                </div>
                <p className="text-[#676767] text-[12px]">{description}</p>
                <p className="text-[#FF6347] text-[22px] font-medium my-2.5">Rs.{price}</p>
            </div>
        </div>
    )
}

export default FoodItem