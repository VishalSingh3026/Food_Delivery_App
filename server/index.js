const express = require('express');
const dbConnect = require('./config/database');
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const foodRouters = require('./routes/foodRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const promoCodeRoutes = require('./routes/promoCodeRoutes');
const contactRoutes = require('./routes/contactRoutes');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// database connection
dbConnect();

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// API endpoints
app.use('/api/user', userRoutes);
app.use('/api/food', foodRouters);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/promocode', promoCodeRoutes);
app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
    res.send("This is Homepage.");
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});