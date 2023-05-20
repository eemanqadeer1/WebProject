const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Add a product to the user's cart
router.post('/cart/add',  cartController.addToCart);

// Get the user's cart
router.get('/cart', cartController.getCart);

// Remove a product from the user's cart
router.delete('/cart/remove', cartController.removeFromCart);


module.exports = router;
