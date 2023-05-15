const Cart = require('../models/cart');
const Product = require('../models/product');

// Add a product to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.body.productId;
    const quantity = req.body.quantity;

    const cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      // Create a new cart for the user if it doesn't exist
      const newCart = new Cart({
        userId: userId,
        products: [{ productId: productId, quantity: quantity }],
      });
      await newCart.save();
      res.status(201).send(newCart);
    } else {
      // Add the product to the existing cart
      const productIndex = cart.products.findIndex((p) => p.productId == productId);
      if (productIndex !== -1) {
        // If the product already exists in the cart, update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // If the product doesn't exist in the cart, add it
        cart.products.push({ productId: productId, quantity: quantity });
      }
      await cart.save();
      res.status(200).send(cart);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Remove a product from cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;

    const cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      return res.status(404).send({ error: 'Cart not found' });
    }

    const productIndex = cart.products.findIndex((p) => p.productId == productId);
    if (productIndex !== -1) {
      cart.products.splice(productIndex, 1);
      await cart.save();
      res.status(200).send(cart);
    } else {
      res.status(404).send({ error: 'Product not found in cart' });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get user's cart
const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId: userId }).populate('products.productId');
    if (!cart) {
      return res.status(404).send({ error: 'Cart not found' });
    }
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Remove user's cart
const removeCart = async (req, res) => {
  try {
    const userId = req.user._id;
    await Cart.deleteOne({ userId: userId });
    res.status(200).send({ message: 'Cart deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
  removeCart,
};
