const individualChatController = require("../controllers/individualChatController");
const router = require("express").Router();

// ADD INDIVIDUAL CHAT
router.post("/", individualChatController.addIndividualChat);

// GET ALL INDIVIDUAL CHAT
router.get("/", individualChatController.getListIndividualChat);

module.exports = router;