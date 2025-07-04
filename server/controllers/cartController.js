const User = require('../models/User.js');

// add items to user cart
exports.addToCart = async (req, res) => {
    try {
        const { userId } = req.body;

        let userData = await User.findById(userId);

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        let cartData = userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        }
        else {
            cartData[req.body.itemId] += 1;
        }

        await User.findByIdAndUpdate(userId, { cartData });

        return res.status(200).json({
            success: true,
            message: 'Added to cart'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// remove items to user cart
exports.removeFromCart = async (req, res) => {
    try {
        const { userId } = req.body;

        let userData = await User.findById(userId);
        let cartData = await userData.cartData;

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        await User.findByIdAndUpdate(userId, { cartData });

        return res.status(200).json({
            success: true,
            message: 'Removed from cart'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// fetch user cart data
exports.getCart = async (req, res) => {
    try {
        const { userId } = req.body;

        // Find the user by ID
        let userData = await User.findById(userId);

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Access the cartData directly from userData (no need for await here)
        let cartData = userData.cartData;

        return res.json({
            success: true,
            cartData
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};