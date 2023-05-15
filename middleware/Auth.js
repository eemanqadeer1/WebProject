// // const jwt = require('jsonwebtoken');
// // const Product = require('../models/product');
// // const Cart = require('../models/cart');

// // // Middleware function to check if user is authenticated
// // const authMiddleware = (req, res, next) => {
// //   const token = req.header('Authorization');

// //   if (!token) {
// //     return res.status(401).json({ message: 'Authorization denied. No token provided.' });
// //   }

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     req.user = decoded.user;
// //     next();
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(401).json({ message: 'Authorization denied. Invalid token.' });
// //   }
// // };

// // // Example of using the authMiddleware to protect a route
// // router.get('/products', authMiddleware, async (req, res) => {
// //   try {
// //     const products = await Product.find();
// //     res.json(products);
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).json({ message: 'Server Error' });
// //   }
// // });

// // // Example of using the authMiddleware to protect another route
// // router.post('/cart', authMiddleware, async (req, res) => {
// //   try {
// //     const { productId, quantity } = req.body;
// //     const product = await Product.findById(productId);

// //     if (!product) {
// //       return res.status(404).json({ message: 'Product not found.' });
// //     }

// //     let cart = await Cart.findOne({ user: req.user.id });

// //     if (!cart) {
// //       cart = new Cart({ user: req.user.id, items: [] });
// //     }

// //     const existingItemIndex = cart.items.findIndex(item => item.product == productId);

// //     if (existingItemIndex !== -1) {
// //       cart.items[existingItemIndex].quantity += quantity;
// //     } else {
// //       cart.items.push({ product: productId, quantity });
// //     }

// //     cart.total += quantity * product.price;

// //     await cart.save();

// //     res.json(cart);
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).json({ message: 'Server Error' });
// //   }
// // });
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const authMiddleware = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization').replace('Bearer ', '');
//     const decodedToken = jwt.verify(token, 'secret');
//     const user = await User.findOne({ _id: decodedToken._id });

//     if (!user) {
//       throw new Error();
//     }

//     req.user = user;
//     req.token = token;
//     next();
//   } catch (e) {
//     res.status(401).send({ error: 'Please authenticate.' });
//   }
// };

// module.exports = authMiddleware;
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decodedToken._id });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authMiddleware;
