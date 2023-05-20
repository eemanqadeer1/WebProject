const Order = require('../models/order');

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get orders' });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  const { userId, productId, quantity, totalPrice, status } = req.body;
  
  try {
    const order = await Order.create({
      userId,
      productId,
      quantity,
      totalPrice,
      status
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create order' });
  }
};

module.exports = {
  getOrders,
  createOrder
};
