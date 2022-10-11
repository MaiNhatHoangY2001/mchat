const groupChatController = require('../controllers/groupChatController');
const middlewareController = require('../controllers/middlewareController');
const router = require('express').Router();

// ADD GROUP CHAT
router.post('/', middlewareController.verifyTokenAndUserAuth, groupChatController.addGroupChat);
// GET ALL GROUP CHAT
router.get('/:id', middlewareController.verifyTokenAndUserAuth, groupChatController.getListGroupChat);

// GET CHAT IN GROUP CHAT
router.get('/', middlewareController.verifyTokenAndUserAuth, groupChatController.getListChat);
module.exports = router;
