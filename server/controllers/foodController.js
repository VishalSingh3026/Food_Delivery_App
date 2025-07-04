const Food = require('../models/Food');
const cloudinary = require('cloudinary').v2;
const uploadPicture = require('../config/cloudinary.js');

// Add food item
const addFood = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        // Validate required fields
        if (!name || !description || !price || !category) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Validate file upload
        if (!req.files || !req.files.image) {
            return res.status(400).json({
                success: false,
                message: 'Image file is required'
            });
        }

        const file = req.files.image;
        const uploadResult = await uploadPicture(file);

        const food = new Food({
            name,
            description,
            price,
            category,
            image: uploadResult.secure_url
        });

        await food.save();
        return res.status(200).json({
            success: true,
            message: 'Food Added',
            data: food
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// All food list
const listFood = async (req, res) => {
    try {

        const foods = await Food.find();

        return res.status(200).json({
            success: true,
            data: foods
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching food list',
            error: error.message
        });
    }
};

const removeFood = async (req, res) => {
    try {
        const { id } = req.body;

        // Validate required fields
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Food ID is required'
            });
        }

        // Find the food item by ID
        const food = await Food.findById(id);
        if (!food) {
            return res.status(404).json({
                success: false,
                message: 'Food not found'
            });
        }

        // Remove the image from Cloudinary
        const imagePublicId = food.image.split('/').pop().split('.')[0]; // Extract the public ID from the URL
        await cloudinary.uploader.destroy(imagePublicId);  // Remove the image from Cloudinary

        // Delete the food from the database
        await Food.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Food removed successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error removing food',
            error: error.message
        });
    }
};

module.exports = {
    addFood,
    listFood,
    removeFood
};