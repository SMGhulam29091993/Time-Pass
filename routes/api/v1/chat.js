const express = require("express");
const { isAuthenticated } = require("../../../middlewares/authentication");
const chatController = require("../../../controllers/chatController.js");
const { attachmentsMulter } = require("../../../middlewares/multer.js");
const { validateHandler, newGroupValidator, addMemberValidator } = require("../../../lib/validator.js");



const router = express.Router();


router.post("/new-groupChat",newGroupValidator(),validateHandler, isAuthenticated,  chatController.newGroupChat);
router.get("/getChat", isAuthenticated, chatController.getChats);
router.get("/getGroupChat", isAuthenticated, chatController.getGroupChat);
router.put("/addMembers",addMemberValidator(),validateHandler, isAuthenticated, chatController.addMembers);  
router.put("/removeMembers", isAuthenticated, chatController.removeMembers);
router.delete("/leaveGroup/:chatID", isAuthenticated, chatController.leaveGroup);




// Messages
router.get("/messages/:chatID", isAuthenticated,chatController.getMessages);




// Attechments
router.post("/message-attachments", isAuthenticated, attachmentsMulter, chatController.sendAttachments)



// get chat details,rename,delete
router.route("/:chatID").all(isAuthenticated).get(chatController.getChatDetails)
                                            .put(chatController.renameGroup).delete(chatController.deleteChat);

module.exports = router;