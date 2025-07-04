const JWT = require('jsonwebtoken');
require('dotenv').config();

const isAuth = async (req, res, next) => {
    try {
        const { token } = req.body ||
            req.header;

        if (!token) {
            console.log(token);
            return res.status(400).json({
                success: false,
                message: 'Toke is missing!'
            })
        }

        const decode = JWT.verify(token, process.env.JWT_SECRET);

        req.body.userId = decode.id;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(5000).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = isAuth;