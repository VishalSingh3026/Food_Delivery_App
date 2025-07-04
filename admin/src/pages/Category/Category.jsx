import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { RiDeleteBin6Line, RiUploadCloud2Line } from 'react-icons/ri';
import { z } from 'zod';
import { useEffect, useMemo, useState } from 'react';

const schema = z.object({
    name: z.string().min(2, { message: 'Category must be at least 2 characters long' }),
    image: z
        .any()
        .refine((file) => file && file[0], {
            message: 'Please upload an image file.',
        })
        .refine((file) => ['image/jpeg', 'image/png', 'image/gif'].includes(file[0]?.type), {
            message: 'Only JPG, PNG, and GIF files are allowed.',
        })
        .refine((file) => file[0]?.size > 0, {
            message: 'Image file is required.',
        }),
});

const Category = ({ url }) => {

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
        resolver: zodResolver(schema),
    });

    const [category, setCategory] = useState([]);
    const [image, setImage] = useState(null);

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

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        if (data.image[0]) formData.append('image', data.image[0]);

        const loadingToast = toast.loading('Creating category...');
        try {
            const response = await axios.post(`${url}/api/category/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response?.data?.success) {
                reset();
                setImage(null);
                toast.dismiss(loadingToast);
                toast.success(response?.data?.message);
                setCategory([...category, response?.data?.category]);
                fetchCategory();
            } else {
                toast.dismiss(loadingToast);
                toast.error(response?.data?.message);
            }
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error('Error creating category.');
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    return (
        <div className="w-11/12 max-w-[900px] flex flex-col md:flex-row gap-6 justify-between bg-white dark:bg-slate-900 shadow-lg rounded-lg p-4 sm:p-6">
            <div className="w-full md:w-1/2 flex flex-col gap-4">
                <p className="text-lg sm:text-2xl font-medium text-gray-800 dark:text-gray-300">Create Category</p>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-3 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-gray-500 p-3 rounded-[6px]"
                >
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="dark:text-gray-400">Category</label>
                        <input
                            type="text"
                            id="name"
                            {...register('name')}
                            className={`w-full outline-none px-3 py-2 dark:text-gray-200 dark:bg-slate-900 border-[1.8px] ${errors.name
                                ? 'border-red-500 dark:border-red-500'
                                : 'border-gray-200 dark:border-gray-500'
                                } rounded-lg`}
                            placeholder="Enter category name"
                        />
                        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Image Upload */}
                    <div className="w-full flex flex-col gap-2">
                        <p className="text-sm sm:text-base dark:text-gray-400">Product Image</p>
                        <label htmlFor="image">
                            {watch('image') && watch('image')[0] ? (
                                <img
                                    className="w-full aspect-video border-[1.8px] border-gray-200 dark:border-gray-400 rounded-lg"
                                    src={URL.createObjectURL(watch('image')[0])}
                                    alt="Product Preview"
                                />
                            ) : (
                                <div className="w-full aspect-video dark:bg-slate-900 border-[1.8px] border-gray-200 dark:border-gray-400 rounded-lg flex flex-col items-center justify-center">
                                    <div className='bg-gray-300 dark:bg-slate-800 rounded-full p-2 text-gray-500 dark:text-gray-600'>
                                        <RiUploadCloud2Line fontSize={25} />
                                    </div>
                                    <p className="text-gray-400 dark:text-gray-600 text-sm">Upload Image</p>
                                    <p className="text-gray-400 dark:text-gray-600 text-sm">No Image Selected</p>
                                </div>
                            )}
                        </label>
                        <input
                            type="file"
                            id="image"
                            {...register('image')}
                            hidden
                        />
                        {errors.image && <p className="text-sm text-red-500 mt-1">{errors.image.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full sm:w-40 text-center py-3 bg-gray-400 dark:bg-gray-900 dark:text-gray-200 rounded-lg hover:bg-gray-500 dark:hover:bg-gray-700"
                    >
                        Create
                    </button>
                </form>
            </div>

            <div className="w-full md:w-1/2 flex flex-col gap-3 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-gray-500 p-3 rounded-[6px] dark:text-gray-400 text-center">
                <div className="grid grid-cols-4 text-sm font-medium">
                    <p className="text-gray-700 dark:text-gray-300">S. No.</p>
                    <p className="text-gray-700 dark:text-gray-300">Category</p>
                    <p className="text-gray-700 dark:text-gray-300">Image</p>
                    <p className="text-gray-700 dark:text-gray-300">Action</p>
                </div>
                <div className="overflow-auto h-fit">
                    {category?.length > 0 ? (
                        category?.map((item, index) => (
                            <div
                                className="grid grid-cols-4 border-b border-gray-200 dark:border-gray-700 py-3 text-sm items-center"
                                key={item._id}
                            >
                                <p>{index + 1}</p>
                                <p className='capitalize'>{item.name}</p>
                                <div className="flex justify-center items-center">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="aspect-video object-cover rounded-lg"
                                        />
                                    ) : (
                                        <p>No image</p>
                                    )}
                                </div>
                                <span className="flex items-center justify-center">
                                    <button
                                        onClick={() => deleteCategory(item._id)}
                                        className="w-fit bg-pink-700 hover:bg-pink-800 text-white p-2 rounded-full mx-auto sm:mx-0"
                                    >
                                        <RiDeleteBin6Line fontSize={20} />
                                    </button>
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">No categories available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Category;
