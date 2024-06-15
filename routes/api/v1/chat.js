const express = require("express");
const { isAuthenticated } = require("../../../middlewares/authentication");
const chatController = require("../../../controllers/chatController.js");
const { attachmentsMulter } = require("../../../middlewares/multer.js");



const router = express.Router();


router.post("/new-groupChat", isAuthenticated, chatController.newGroupChat);
router.get("/getChat", isAuthenticated, chatController.getChats);
router.get("/getGroupChat", isAuthenticated, chatController.getGroupChat);
router.put("/addMembers", isAuthenticated, chatController.addMembers);  
router.put("/removeMembers", isAuthenticated, chatController.removeMembers);
router.delete("/leaveGroup/:chatID", isAuthenticated, chatController.leaveGroup);


// Attechments
router.post("/message-attachments", isAuthenticated, attachmentsMulter, chatController.sendAttachments)



// get chat details,rename,delete
router.route("/:chatID").all(isAuthenticated).get(chatController.getChatDetails)
                                            .put(chatController.renameGroup).delete(chatController.deleteChat);

module.exports = router;