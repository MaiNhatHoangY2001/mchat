const groupChatController = require('../controllers/groupChatController');
const middlewareController = require('../controllers/middlewareController');
const router = require('express').Router();

// ADD GROUP CHAT
router.post('/', middlewareController.verifyTokenAndUserAuth, groupChatController.addGroupChat);
// GET ALL GROUP CHAT
router.get('/:id', middlewareController.verifyTokenAndUserAuth, groupChatController.getListGroupChat);

// GET CHAT IN GROUP CHAT
router.get('/', middlewareController.verifyTokenAndUserAuth, groupChatController.getListChat);

router.post('/addUser', middlewareController.verifyTokenAndUserAuth, groupChatController.addUserGroupChat);
router.post('/removeUser', middlewareController.verifyTokenAndUserAuth, groupChatController.removeUserGroupChat);

//update Group chat
router.put('/:id', middlewareController.verifyTokenAndUserAuth, groupChatController.updateGroup);

//update new msgs
router.post('/newMsg', middlewareController.verifyTokenAndUserAuth, groupChatController.updateNewMsg);

//delete group chat
router.delete('/:id', middlewareController.verifyTokenAndUserAuth, groupChatController.deleteGroupChat);

module.exports = router;
