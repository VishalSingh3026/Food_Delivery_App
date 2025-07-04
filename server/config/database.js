const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Database Connected Successfully!');
    } catch (error) {
        console.error("Database Connection Failed: ", error.message);
        process.exit(1);
    }
};

module.exports = dbConnect;