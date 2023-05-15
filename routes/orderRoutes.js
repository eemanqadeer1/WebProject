const express = require('express');
const router = express.Router();
const {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    cancelOrder,
  }= require('../controllers/orderController');
// const orderController = require('../controllers/orderController');
// const authMiddleware = require('../middleware/authMiddleware');

 
  
// Create a new order
router.post('/',  createOrder);

// Get the user's orders
router.get('/',getOrders);

// Get an order by ID
router.get('/:orderId', getOrderById);

// Update the status of an order
router.put('/:orderId',  updateOrderStatus);

// Cancel an order
router.delete('/:orderId', cancelOrder);

module.exports = router;
