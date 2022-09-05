const chatHistoryController = require("../controllers/chatHistoryController");
const middlewareController = require("../controllers/middlewareController");
const router = require("express").Router();

// GET LIST MASSAGE
router.get("/",middlewareController.verifyTokenAndAdminAuth, chatHistoryController.getMsgList);

// ADD A MESSAGE
router.post("/",middlewareController.verifyTokenAndAdminAuth, chatHistoryController.addMesg);

module.exports = router;