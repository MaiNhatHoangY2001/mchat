const groupChatController = require('../controllers/groupChatController');
const middlewareController = require('../controllers/middlewareController');
const router = require('express').Router();

// ADD GROUP CHAT
router.post('/', groupChatController.addGroupChat);
// GET ALL GROUP CHAT
router.get('/', middlewareController.verifyTokenAndAdminAuth, groupChatController.getAllGroupChat);
// GET A GROUP CHAT
router.get('/:id', middlewareController.verifyTokenAndAdminAuth, groupChatController.getGroupChat);
// UPDATE A GROUP CHAT
router.put('/:id', middlewareController.verifyTokenAndAdminAuth, groupChatController.updateGroupChat);
// DELETE A GROUP CHAT
router.delete('/:id', middlewareController.verifyTokenAndAdminAuth, groupChatController.deleteGroupChat);

module.exports = router;
