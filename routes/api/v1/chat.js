const express = require("express");
const { isAuthenticated } = require("../../../middlewares/authentication");
const chatController = require("../../../controllers/chatController.js");



const router = express.Router();


router.post("/new-groupChat", isAuthenticated, chatController.newGroupChat );


module.exports = router;