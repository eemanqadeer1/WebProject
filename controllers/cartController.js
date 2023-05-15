const Cart = require('../models/cart');

// Add a product to the cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOneAndUpdate(
      { productId },
      { $inc: { quantity } },
      { upsert: true, new: true }
    );

    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get the user's cart
const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.find({ userId }).populate('productId');

    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Remove a product from the user's cart
const removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { products: { productId } } },
      { new: true }
    );

    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
};

