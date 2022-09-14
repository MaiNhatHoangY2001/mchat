const individualChatController = require('../controllers/individualChatController');
const middlewareController = require('../controllers/middlewareController');
const router = require('express').Router();

// ADD INDIVIDUAL CHAT
router.post('/', middlewareController.verifyTokenAndUserAuth, individualChatController.addIndividualChat);

// GET MESSAGE
router.get('/:id', middlewareController.verifyTokenAndUserAuth, individualChatController.getListIndividualChat);

// GET
router.get('/', middlewareController.verifyTokenAndUserAuth, individualChatController.getListChat);

//GET A INDIVIDUAL CHAT
router.get('/a/chat', middlewareController.verifyTokenAndUserAuth, individualChatController.getIndividualChat);

module.exports = router;
