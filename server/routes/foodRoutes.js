const express = require('express');
const { addFood, listFood, removeFood } = require('../controllers/foodController.js');
const multer = require('multer');
const isAuth = require('../middleware/Auth.js');

const router = express.Router();

router.post('/add', addFood);
router.get('/list', listFood);
router.post('/remove', removeFood);

module.exports = router;