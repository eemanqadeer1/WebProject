const express = require('express');
const router = express.Router();

const authMiddleware = require("../middleware/Auth");
// const { getAllUsers } = require("../controllers/UserController");



module.exports = router;

const {
    registerUser,
    loginUser,
    editUser,
    getAllUsers,
  } = require('../controllers/UserController');

// const authMiddleware = require('../Middleware/Auth');
// Get all users
router.get("/users", authMiddleware, getAllUsers);

  // Register a new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);
module.exports = router;
//Edit a user
// router.patch('/edit/:userId', authMiddleware(['firstorder']), editUser);



// Get all users
// router.get('/', authMiddleware, getAllUsers);

// module.exports = router;
  