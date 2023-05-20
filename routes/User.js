const express = require('express');
const router = express.Router();

const authMiddleware = require("../middleware/Auth");


module.exports = router;

const {
    registerUser,
    loginUser,
    getAllUsers,
  } = require('../controllers/UserController');


// Get all users
router.get("/users", authMiddleware, getAllUsers);

  // Register a new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

module.exports = router;


