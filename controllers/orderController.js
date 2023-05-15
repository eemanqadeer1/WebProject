const Order = require('../models/order');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const products = req.body.products;
    const totalPrice = req.body.totalPrice;

    const newOrder = new Order({
      userId: userId,
      products: products,
      totalPrice: totalPrice,
      status: 'Pending',
    });
    await newOrder.save();
    res.status(201).send(newOrder);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get user's orders
const getOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId: userId });
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get an order by ID
const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).send({ error: 'Order not found' });
    }
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Update the status of an order
const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const status = req.body.status;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).send({ error: 'Order not found' });
    }
    order.status = status;
    await order.save();
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Cancel an order
const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).send({ error: 'Order not found' });
    }
    if (order.status !== 'Pending') {
      return res.status(400).send({ error: 'Cannot cancel order with status other than Pending' });
    }
    await order.delete();
    res.status(200).send({ message: 'Order canceled successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
};
