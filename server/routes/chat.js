const chatController = require("../controllers/chatController");
const router = require("express").Router();


//ADD CHAT
router.post("/", chatController.addChat);

//GET ALL CHAT
router.get("/", chatController.getAllChat);

//GET A CHAT
router.get("/:id", chatController.getAChat);

//UPDATE A CHAT
router.put("/:id", chatController.updateChat);

//DELETE A CHAT
router.delete("/:id", chatController.deleteChat);



module.exports = router;