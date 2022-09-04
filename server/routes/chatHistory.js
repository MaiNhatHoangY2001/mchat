const chatHistoryController = require("../controllers/chatHistoryController");
const router = require("express").Router();

// GET LIST MASSAGE
router.get("/", chatHistoryController.getMsgList);

// ADD A MESSAGE
router.post("/", chatHistoryController.addMesg);

module.exports = router;