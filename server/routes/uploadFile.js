const controller = require('../controllers/uploadFileController');
const router = require('express').Router();

router.post('/upload', controller.upload);
router.get('/', controller.getListFiles);
router.get('/:name', controller.download);

module.exports = router;
