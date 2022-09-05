const individualChatController = require('../controllers/individualChatController');
const middlewareController = require('../controllers/middlewareController');
const router = require('express').Router();

// ADD INDIVIDUAL CHAT
router.post('/', middlewareController.verifyTokenAndAdminAuth, individualChatController.addIndividualChat);

// GET ALL INDIVIDUAL CHAT
router.get('/', middlewareController.verifyTokenAndAdminAuth, individualChatController.getListIndividualChat);

module.exports = router;
