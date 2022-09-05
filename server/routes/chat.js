const chatController = require('../controllers/chatController');
const middlewareController = require('../controllers/middlewareController');
const router = require('express').Router();

//ADD CHAT
router.post('/', chatController.addChat);

//GET ALL CHAT
router.get('/', middlewareController.verifyTokenAndAdminAuth, chatController.getAllChat);

//GET A CHAT
router.get('/:id', middlewareController.verifyTokenAndAdminAuth, chatController.getAChat);

//UPDATE A CHAT
router.put('/:id', middlewareController.verifyTokenAndAdminAuth, chatController.updateChat);

//DELETE A CHAT
router.delete('/:id', middlewareController.verifyTokenAndAdminAuth, chatController.deleteChat);

module.exports = router;
