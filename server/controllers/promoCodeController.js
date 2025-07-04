const PromoCode = require('../models/PromoCode');

// Function to create a new promo code
exports.createPromoCode = async (req, res) => {
    try {

        const { code, discount } = req.body;

        if (!code || !discount) {
            return res.status(400).json({
                success: false,
                message: 'Please provide promo code and discount'
            });
        }

        const promoCode = new PromoCode({
            code,
            discount
        });

        await promoCode.save();

        return res.status(200).json({
            success: true,
            data: promoCode,
            message: 'Promo code created successfully',
        });
    } catch (error) {
        console.log('Error creating promo code:', error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Function to get all promo codes
exports.getAllPromoCodes = async (req, res) => {
    try {
        const promoCodes = await PromoCode.find();

        return res.status(200).json({
            success: true,
            message: 'Promo codes fetched successfully',
            data: promoCodes
        });
    } catch (error) {
        console.log('Error fetching promo code:', error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Function to delete a promo code by ID
exports.deletePromoCodeById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Invalid promo code ID'
            });
        }

        const promoCode = await PromoCode.findByIdAndDelete(id);

        if (!promoCode) {
            throw new Error('Promo code not found');
        }

        return res.status(200).json({
            success: true,
            message: 'Promo code deleted successfully'
        });
    } catch (error) {
        console.log('Error deleting promo code:', error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Function to update a promo code by ID
exports.updatePromoCodeById = async (req, res) => {
    try {
        const { id, code, discount } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Invalid promo code ID'
            });
        }

        const promoCode = await PromoCode.findByIdAndUpdate(id,
            { code, discount },
            { new: true });

        if (!promoCode) {
            throw new Error('Promo code not found');
        }

        return res.status(200).json({
            success: true,
            data: promoCode,
            message: 'Promo code updated successfully'
        });
    } catch (error) {
        console.log('Error updating promo code:', error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}