const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const middlewareController = require('../controllers/middlewareController');

const router = require('express').Router();

//REGISTER
router.post("/register", userController.addUser);

//LOGIN
router.post("/login", authController.loginUser);

//REFRESH
router.post("/refresh", authController.requestRefreshToken);

//LOGOUT
router.post("/logout",middlewareController.verifyToken, authController.userLogout);

module.exports = router;