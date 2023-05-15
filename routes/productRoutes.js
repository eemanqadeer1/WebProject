const express = require('express');
const router = express.Router();
const {
    addProduct,
    getAllProducts,
    getProductByCategory,
    getProductById,
    getProductByName,
  }= require('../controllers/productController');

// const authMiddleware = require('../middleware/authMiddleware');

// Get all products
router.get('/products', getAllProducts);

// Get products by category
router.get('/category/:category', getProductByCategory);

// Get a product by ID
router.get('/productId/:productId',getProductById);

// Get products by name
router.get('/name/:name', getProductByName);
router.post('/add', addProduct);
module.exports = router;

// Get products by category
// router.get('/category/:category', productController.getProductsByCategory);

// Create a new product
// router.post('/', addProduct);

// Update a product by ID
// router.put('/:productId', ProductById);

// // Delete a product by ID
// router.delete('/:productId', deleteProductById);

// module.exports = router;
