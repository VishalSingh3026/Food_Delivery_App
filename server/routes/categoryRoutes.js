const express = require('express');
const {
    createCategory,
    getAllCategories,
    deleteCategory
} = require('../controllers/categoryController');

const router = express.Router();

router.post('/create', createCategory);
router.get('/all', getAllCategories);
router.delete('/delete/:id', deleteCategory);

module.exports = router;