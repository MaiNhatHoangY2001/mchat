const individualChatController = require('../controllers/individualChatController');
const middlewareController = require('../controllers/middlewareController');
const router = require('express').Router();

// ADD INDIVIDUAL CHAT
router.post('/', middlewareController.verifyTokenAndUserAuth, individualChatController.addIndividualChat);

// GET MESSAGE
router.get('/:id', middlewareController.verifyTokenAndUserAuth, individualChatController.getListChat);

// GET
router.get('/', middlewareController.verifyTokenAndUserAuth, individualChatController.getListIndividualChat);

module.exports = router;
