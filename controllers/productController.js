const Product = require('../models/product');

// Add a new product
const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get product by category
const getProductByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category: category });
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get product by id
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get product by name
const getProductByName = async (req, res) => {
  try {
    const name = req.params.name;
    const products = await Product.find({ name: { $regex: name, $options: 'i' } });
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductByCategory,
  getProductById,
  getProductByName,
};
