const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// GET /orders - Get all orders
router.get('/orders', orderController.getOrders);

// POST /orders - Create a new order
router.post('/orders', orderController.createOrder);

module.exports = router;
