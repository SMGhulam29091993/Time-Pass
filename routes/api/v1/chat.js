const express = require("express");
const { isAuthenticated } = require("../../../middlewares/authentication");
const chatController = require("../../../controllers/chatController.js");
const { attachmentsMulter } = require("../../../middlewares/multer.js");
const { validateHandler, newGroupValidator, addMemberValidator, 
        removeMemberValidator, leaveGroupValidator, sendAttachmentvalidator, getChatIDValidator, 
        renameGroupValidator} = require("../../../lib/validator.js");



const router = express.Router();


router.post("/new-groupChat", isAuthenticated,newGroupValidator(),validateHandler, chatController.newGroupChat);
router.get("/getChat", isAuthenticated, chatController.getChats);
router.get("/getGroupChat", isAuthenticated, chatController.getGroupChat);
router.put("/addMembers", isAuthenticated,addMemberValidator(),validateHandler, chatController.addMembers);  
router.put("/removeMembers", isAuthenticated,removeMemberValidator(),validateHandler, chatController.removeMembers);
router.delete("/leaveGroup/:chatID", isAuthenticated,leaveGroupValidator(), validateHandler, chatController.leaveGroup);




// Messages
router.get("/messages/:chatID", isAuthenticated,getChatIDValidator(),validateHandler, chatController.getMessages);




// Attechments
router.post("/message-attachments", isAuthenticated, attachmentsMulter,sendAttachmentvalidator(),validateHandler, chatController.sendAttachments)



// get chat details,rename,delete
router.route("/:chatID").all(isAuthenticated).get(getChatIDValidator(),validateHandler,chatController.getChatDetails)
                                            .put(renameGroupValidator(),validateHandler, chatController.renameGroup)
                                            .delete(getChatIDValidator(),validateHandler,chatController.deleteChat);

module.exports = router;