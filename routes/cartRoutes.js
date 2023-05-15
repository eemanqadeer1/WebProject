const express = require('express');
const router = express.Router();
const {
    addToCart,
  removeFromCart,
  getCart,
  removeCart,
  }= require('../controllers/cartController');
// const cartController = require('../controllers/cartController');
// const authMiddleware = require('../middleware/authMiddleware');

// Get the user's cart
router.get('/', getCart);

// Add a product to the user's cart
router.post('/addtocart',addToCart);

// Remove a product from the user's cart
router.delete('/:productId', removeFromCart);

// Create a new cart for the user
router.post('/create', removeCart);

// Delete the user's cart
router.delete('/deletecart', removeCart);

module.exports = router;
