const express = require("express");
const adminController = require("../../../controllers/adminController.js");


const router = express.Router();


// get admin data

// admin verify

// adminlogout

// get users data
router.get("/allUsers", adminController.getAllUsers);


// get chats data
router.get("/getChats", adminController.getAllChats);

// get messages data

// get stats


module.exports = router;