const Order = require('../models/Order.js');
const User = require('../models/User.js');
const Stripe = require('stripe');
require('dotenv').config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Placing user order for frontend
exports.placeOrder = async (req, res) => {

    try {
        const { userId, items, amount, address } = req.body;
        const frontend_url = 'http://localhost:5173';

        const newOrder = new Order({
            userId: userId,
            items: items,
            amount: amount,
            address: address
        });

        await newOrder.save();
        await User.findByIdAndUpdate(userId, { cartData: {} });

        // Calculate total quantity (if items have quantities)
        const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

        // Calculate unit_amount based on the total amount for all items
        const line_items = items.map((item) => ({
            price_data: {
                currency: "INR",
                product_data: {
                    name: item.name
                },
                unit_amount: Math.round((amount / totalQuantity) * 100) // Divide total amount by total quantity and convert to paise
            },
            quantity: item.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })

        return res.status(200).json({
            success: true,
            session_url: session.url
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Verify order
exports.verifyOrder = async (req, res) => {
    try {
        const { orderId, success } = req.body;

        console.log(orderId, success)

        if (success == 'true') {
            await Order.findByIdAndUpdate(orderId, { payment: true });
            return res.status(200).json({
                success: true,
                message: "Payment Done Successfully."
            });
        } else {
            await Order.findByIdAndDelete(orderId);
            return res.status(403).json({
                success: false,
                message: "Not Paid"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// user orders for frontend
exports.userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await Order.find({ userId });

        return res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// listing orders for admin panel
exports.listOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });;

        return res.status(200).json({
            success: true,
            data: orders
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// api for updating order status
exports.updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        await Order.findByIdAndUpdate(orderId, { status: status });

        return res.status(200).json({
            success: true,
            message: "Status Updated"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}