const mongoose = require('mongoose');

const promoCodeSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        },
        discount: {
            type: Number,
            required: true,
            min: 1
        },
    },
    { timestamps: true }
);

const PromoCode = mongoose.model('PromoCode', promoCodeSchema);

module.exports = PromoCode;