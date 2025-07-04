const express = require('express');
const isAuth = require('../middleware/Auth.js');
const {
    placeOrder,
    verifyOrder,
    userOrders,
    listOrders,
    updateStatus
} = require('../controllers/orderController.js');

const router = express.Router();

router.post("/place", isAuth, placeOrder);
router.post("/verify", verifyOrder);
router.post("/userorders", isAuth, userOrders);
router.get('/list', listOrders);
router.post('/status', updateStatus);

module.exports = router;