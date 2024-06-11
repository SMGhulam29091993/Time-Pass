const express = require("express");
const { isAuthenticated } = require("../../../middlewares/authentication");
const chatController = require("../../../controllers/chatController.js");



const router = express.Router();


router.post("/new-groupChat", isAuthenticated, chatController.newGroupChat);
router.get("/getChat", isAuthenticated, chatController.getChats);
router.get("/getGroupChat", isAuthenticated, chatController.getGroupChat);
router.put("/addMembers", isAuthenticated, chatController.addMembers);  
router.put("/removeMembers", isAuthenticated, chatController.removeMembers);

module.exports = router;