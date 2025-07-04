const express = require('express');
const isAuth = require('../middleware/Auth.js');
const {
    addToCart,
    removeFromCart,
    getCart
} = require('../controllers/cartController.js');

const router = express.Router();

router.post("/add", isAuth, addToCart);
router.post("/remove", isAuth, removeFromCart);
router.post("/get", isAuth, getCart);

module.exports = router;