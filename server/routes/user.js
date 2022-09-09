const middlewareController = require('../controllers/middlewareController');
const userController = require('../controllers/userController');
const router = require('express').Router();

//ADD USER
router.post('/', userController.addUser);

//GET ALL USER
router.get('/', middlewareController.verifyTokenAndAdminAuth, userController.getAllUsers);

//DELETE A USER
router.delete('/:id', middlewareController.verifyTokenAndAdminAuth, userController.deleteUser);

//SEARCH USER
router.get('/search',userController.searchUser);

module.exports = router;
