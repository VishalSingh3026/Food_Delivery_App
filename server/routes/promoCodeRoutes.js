const express = require('express');
const { createPromoCode,
    getAllPromoCodes,
    deletePromoCodeById,
    updatePromoCodeById
} = require('../controllers/promoCodeController');

const router = express.Router();

router.post('/create', createPromoCode);
router.get('/all', getAllPromoCodes);
router.delete('/delete/:id', deletePromoCodeById);
router.put('/update', updatePromoCodeById);

module.exports = router;