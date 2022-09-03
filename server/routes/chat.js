const chatController = require("../controllers/chatController");
const router = require("express").Router();


//ADD CHAT
router.post("/", chatController.addChat);

//GET ALL CHAT
router.get("/", chatController.getAllChat);

//GET A BOOK
router.get("/:id", chatController.getAChat);

//UPDATE A BOOK
router.put("/:id", chatController.updateChat);

//DELETE A BOOK
router.delete("/:id", chatController.deleteChat);



module.exports = router;