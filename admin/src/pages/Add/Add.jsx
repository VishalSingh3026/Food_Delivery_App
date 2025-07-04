import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { RiUploadCloud2Line } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define Zod validation schema
const schema = z.object({
    name: z.string().min(3, { message: 'Food Name must be at least 3 characters long.' }),
    description: z.string().min(10, { message: 'Food Description must be at least 10 characters long.' }),
    price: z.string().min(1, { message: 'Food Price must be greater than 0.' }),
    category: z.string().nonempty({ message: 'Please select a category.' }),
    image: z
        .any()
        .refine((file) => file && file[0], {
            message: 'Please upload a valid image file.',
        })
        .refine((file) => ['image/jpeg', 'image/png', 'image/gif'].includes(file[0]?.type), {
            message: 'Only JPG, PNG, and GIF files are allowed.',
        })
        .refine((file) => file[0]?.size > 0, {
            message: 'Image is required.',
        }),
});

const Add = ({ url }) => {
    const [category, setCategory] = useState([]);

    // Fetch categories
    const fetchCategory = useMemo(() => async () => {
        try {
            const response = await axios.get(`${url}/api/category/all`);
            if (response?.data.success) {
                setCategory(response?.data?.data);
            } else {
                toast.error('Error fetching categories.');
            }
        } catch (error) {
            toast.error('Error fetching categories.');
        }
    }, [url]);

    // Set up React Hook Form with Zod validation
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(schema),
    });

    // Handle form submission
    const onSubmitHandler = async (formData) => {
        const form = new FormData();
        form.append('name', formData.name);
        form.append('description', formData.description);
        form.append('price', Number(formData.price));
        form.append('category', formData.category);
        form.append('image', formData.image[0]); // Accessing the file directly from the form data

        try {
            const loadingToast = toast.loading('Adding item...');
            const response = await axios.post(`${url}/api/food/add`, form);
            if (response?.data.success) {
                reset();
                toast.dismiss(loadingToast);
                toast.success(response?.data.message);
            } else {
                toast.dismiss(loadingToast);
                toast.error(response?.data.message);
            }
        } catch (error) {
            toast.error('Error adding item');
        }
    };

    useEffect(() => {
        fetchCategory();
    }, [fetchCategory]);

    return (
        <div className="max-w-xl w-full flex flex-col gap-8 shadow-lg bg-white dark:bg-slate-900 rounded-lg p-6 sm:p-8 mx-auto">
            <p className="text-xl sm:text-2xl font-medium dark:text-gray-400 text-center">Add Item</p>
            <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit(onSubmitHandler)}>
                {/* Image Upload */}
                <div className="w-full flex flex-col gap-2">
                    <p className="text-sm sm:text-base dark:text-gray-400">Food Image</p>
                    <label htmlFor="image">
                        {getValues('image')?.length > 0 ? (
                            <img
                                className="w-full aspect-video border-[1.8px] border-gray-200 dark:border-gray-400 rounded-lg"
                                src={URL.createObjectURL(getValues('image')[0])}
                                alt="Food Preview"
                            />
                        ) : (
                            <div className="w-full aspect-video dark:bg-slate-800 border-[1.8px] border-gray-200 dark:border-gray-400 rounded-lg flex flex-col items-center justify-center">
                                <div className="bg-gray-300 dark:bg-slate-900 rounded-full p-2 text-gray-500 dark:text-gray-600">
                                    <RiUploadCloud2Line fontSize={25} />
                                </div>
                                <p className="text-gray-400 dark:text-gray-600 text-sm">Upload Image</p>
                                <p className="text-gray-400 dark:text-gray-600 text-sm">No Image Selected</p>
                            </div>
                        )}
                    </label>
                    <input
                        {...register('image')}
                        type="file"
                        id="image"
                        hidden
                    />
                    {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
                </div>

                {/* Food Name */}
                <div className="flex flex-col gap-2">
                    <p className="text-sm sm:text-base dark:text-gray-400">Food Name</p>
                    <input
                        {...register('name')}
                        type="text"
                        className="w-full outline-none px-3 py-2 sm:py-3 dark:text-gray-200 dark:bg-slate-800 border-[1.8px] border-gray-200 dark:border-gray-400 rounded-lg"
                        placeholder="Food Name"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* Food Description */}
                <div className="flex flex-col gap-2">
                    <p className="text-sm sm:text-base dark:text-gray-400">Food Description</p>
                    <textarea
                        {...register('description')}
                        className="w-full outline-none px-3 py-2 sm:py-3 dark:text-gray-200 dark:bg-slate-800 border-[1.8px] border-gray-200 dark:border-gray-400 rounded-lg"
                        placeholder="Write content here"
                        rows="4"
                    />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>

                {/* Food Category */}
                <div className="flex flex-col gap-2">
                    <p className="text-sm sm:text-base dark:text-gray-400">Food Category</p>
                    <select {...register('category')} className="w-full outline-none px-3 py-2 sm:py-3 dark:text-gray-200 dark:bg-slate-800 border-[1.8px] border-gray-200 dark:border-gray-400 rounded-lg">
                        <option value="">Please Select</option>
                        {category.map((item, index) => (
                            <option key={index} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                </div>

                {/* Food Price */}
                <div className="flex flex-col gap-2">
                    <p className="text-sm sm:text-base dark:text-gray-400">Food Price</p>
                    <input
                        {...register('price')}
                        type="number"
                        className="w-full outline-none px-3 py-2 sm:py-3 dark:text-gray-200 dark:bg-slate-800 border-[1.8px] border-gray-200 dark:border-gray-400 rounded-lg no-spin"
                        placeholder="Food Price"
                    />
                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="mt-6 w-full sm:w-40 text-center py-3 bg-gray-400 dark:bg-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-500 dark:hover:bg-gray-700"
                >
                    ADD
                </button>
            </form>
        </div>
    );
};

export default Add;