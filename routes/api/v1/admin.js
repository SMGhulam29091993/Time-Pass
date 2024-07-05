const express = require("express");
const adminController = require("../../../controllers/adminController.js");
const { adminLoginValidator, validateHandler } = require("../../../lib/validator.js");
const { adminAuthenticated } = require("../../../middlewares/authentication.js");


const router = express.Router();


// get admin data
router.get("/", adminAuthenticated, adminController.getAdminData);


// admin verify
router.post("/admin-login", adminLoginValidator(), validateHandler,adminController.adminCreateSession)

// adminlogout
router.post("/admin-log-out", adminController.destroyAdminSession);


// get users data
router.get("/allUsers",adminAuthenticated, adminController.getAllUsers);


// get chats data
router.get("/getChats", adminAuthenticated, adminController.getAllChats);

// get messages data
router.get("/getAllMessages",adminAuthenticated, adminController.getAllMessages);

// get stats
router.get("/getStats",adminAuthenticated, adminController.getStats);

module.exports = router;