const express = require('express');
const router = express.Router();

const authMiddleware = require("../middleware/Auth");
const { getAllUsers } = require("../controllers/UserController");

// Get all users
router.get("/users", authMiddleware, getAllUsers);

module.exports = router;

const {
    registerUser,
    loginUser,
    editUser,
    getAllUsers,
  } = require('../controllers/UserController');

// const authMiddleware = require('../Middleware/Auth');

  // Register a new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);
module.exports = router;
//Edit a user
// router.patch('/edit/:userId', authMiddleware(['student']), editUser);



// Get all users
// router.get('/', authMiddleware(['employee']), getAllUsers);

// module.exports = router;
  