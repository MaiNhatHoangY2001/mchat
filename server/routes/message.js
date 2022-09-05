const messageController = require("../controllers/messageController");
const middlewareController = require("../controllers/middlewareController");
const router = require("express").Router();

//ADD MESSAGE
router.post("/", messageController.addMessage);

//GET ALL MESSAGE
router.get("/", middlewareController.verifyTokenAndAdminAuth, messageController.getAllMessage);

module.exports = router;