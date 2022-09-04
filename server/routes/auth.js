const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = require('express').Router();

//REGISTER
router.post("/register", userController.addUser);

//LOGIN
router.post("/login", authController.loginUser);

module.exports = router;