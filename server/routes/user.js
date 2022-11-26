const middlewareController = require('../controllers/middlewareController');
const userController = require('../controllers/userController');
const router = require('express').Router();

//ADD USER
router.post('/', userController.addUser);

//GET A USER
//router.get('/:id', middlewareController.verifyTokenAndAdminAuth, userController.getAUsers);

//GET ALL USER
//router.get('/', middlewareController.verifyTokenAndAdminAuth, userController.getAllUsers);

//DELETE A USER
//router.delete('/:id', middlewareController.verifyTokenAndAdminAuth, userController.deleteUser);

//update user
router.put('/:id', middlewareController.verifyTokenAndUserAuth, userController.updateUser);

//SEARCH USER
router.get('/search', middlewareController.verifyTokenAndUserAuth, userController.searchUser);

//CHANGE USER PASSWORD
router.post('/changePassword', userController.changePasswordWithPhoneNumber);

//GET ALL NUMBER
router.get('/phones', userController.getAllNumber);

module.exports = router;
