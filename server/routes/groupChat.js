const groupChatController = require("../controllers/groupChatController");
const router = require("express").Router();

// ADD GROUP CHAT
router.post("/", groupChatController.addGroupChat);
// GET ALL GROUP CHAT
router.get("/", groupChatController.getAllGroupChat);
// GET A GROUP CHAT
router.get("/:id", groupChatController.getGroupChat);
// UPDATE A GROUP CHAT
router.put("/:id", groupChatController.updateGroupChat);
// DELETE A GROUP CHAT
router.delete("/:id", groupChatController.deleteGroupChat);

module.exports = router;