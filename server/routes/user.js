const middlewareController = require('../controllers/middlewareController');
const userController = require('../controllers/userController');
const router = require('express').Router();

//ADD USER
router.post('/', userController.addUser);

//GET ALL USER
router.get('/', middlewareController.verifyToken, userController.getAllUsers);

//DELETE A USER
router.delete("/:id", middlewareController.verifyTokenAndAdminAuth, userController.deleteUser);

module.exports = router;
