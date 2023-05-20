const express = require('express');
const router = express.Router();
const {
    addProduct,
    getAllProducts,
    getProductByCategory,
    getProductById,
    getProductByName,
  }= require('../controllers/productController');



// Get all products
router.get('/products', getAllProducts);

// Get products by category
router.get('/category/:category', getProductByCategory);

// Get a product by ID
router.get('/:id',getProductById);

// Get products by name
router.get('/name/:name', getProductByName);
router.post('/add', addProduct);

module.exports = router;


