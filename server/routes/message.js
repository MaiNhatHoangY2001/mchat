const messageController = require("../controllers/messageController");
const router = require("express").Router();

//ADD MESSAGE
router.post("/", messageController.addMessage);

//GET ALL MESSAGE
router.get("/", messageController.getAllMessage);

module.exports = router;