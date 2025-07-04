const cloudinary = require('cloudinary').v2;
const Category = require('../models/Category');
const uploadPicture = require('../config/cloudinary');

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const file = req.files?.image;

        if (!name || !file) {
            return res.status(400).json({
                success: false,
                message: 'Category name and image are required'
            });
        }

        // Check if the category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: 'Category name already exists'
            });
        }

        // Upload image to Cloudinary
        const uploadedImage = await uploadPicture(file);

        const category = new Category({
            name,
            image: uploadedImage.secure_url,  // Cloudinary URL
        });

        await category.save();

        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating category',
            error: error.message
        });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        // Optionally delete image from Cloudinary if necessary
        const imagePublicId = deletedCategory.image.split('/').pop().split('.')[0]; // Extract the public ID from the URL
        await cloudinary.uploader.destroy(imagePublicId); // Delete the image from Cloudinary

        res.status(200).json({
            success: true,
            message: 'Category deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting category',
            error: error.message
        });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: categories,
            mesage: 'All category fetched successfully.'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching categories',
            error: error.message
        });
    }
};
