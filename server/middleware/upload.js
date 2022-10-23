const util = require('util');
const multer = require('multer');
const maxSize = 2 * 1024 * 1024;

//CONFIG UPLOAD FILE
//middleware
let processFile = multer({
	storage: multer.memoryStorage(),
    //limits:{fileSize: maxSize}
}).array('file', 10);

let processFileMiddleware = util.promisify(processFile);
module.exports = processFileMiddleware;
