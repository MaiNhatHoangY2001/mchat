const messageController = require('../controllers/messageController');
const middlewareController = require('../controllers/middlewareController');
const router = require('express').Router();

//ADD MESSAGE
router.post('/', middlewareController.verifyTokenAndUserAuth, messageController.addMessage);

//GET ALL MESSAGE
router.get('/:sender', middlewareController.verifyTokenAndUserAuth, messageController.getAllMsgOnePerson);

module.exports = router;
