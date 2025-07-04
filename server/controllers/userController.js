const User = require('../models/User');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
require('dotenv').config();

//login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User does not exist'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(403).json({
                success: false,
                message: 'Invalid credentials'
            })
        }

        const token = createToken(user._id);

        return res.status(200).json({
            success: true,
            token,
            data: user
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const createToken = (id) => {
    return JWT.sign({ id }, process.env.JWT_SECRET)
}

//register user
exports.registerUser = async (req, res) => {
    try {
        const { name, password, email } = req.body;

        // checking is user already exists
        const exists = await User.findOne({ email });
        if (exists) {
            return res.statu(400).json({
                success: false,
                message: 'User already exists'
            })
        }

        //validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.status(403).json({
                success: false,
                message: 'Please enter a valid email'
            })
        }

        if (password.length < 8) {
            return res.status(403).json({
                success: false,
                message: 'Please enter a strong password'
            })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        })

        // Create user
        const user = await newUser.save();
        const token = createToken(user._id)

        return res.status(200).json({
            success: true,
            token
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};