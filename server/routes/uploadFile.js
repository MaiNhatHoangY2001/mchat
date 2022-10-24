const controller = require('../controllers/uploadFileController');
const middlewareController = require('../controllers/middlewareController');
const router = require('express').Router();

router.post('/upload', middlewareController.verifyTokenAndUserAuth, controller.upload);
router.get('/', middlewareController.verifyTokenAndUserAuth, controller.getListFiles);
router.get('/:name', middlewareController.verifyTokenAndUserAuth, controller.download);

module.exports = router;
