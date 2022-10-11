const util = require('util');
const multer = require('multer');
const maxSize = 2 * 1024 * 1024;

//CONFIG UPLOAD FILE
//middleware
let processFile = multer({
	storage: multer.memoryStorage(),
    limits:{fileSize: maxSize}
}).single('file');

let processFileMiddleware = util.promisify(processFile);
module.exports = processFileMiddleware;
