const express = require("express");
const userController = require("../../../controllers/userController.js");
const { singleAvatar } = require("../../../middlewares/multer.js");

const router = express.Router();


router.post("/register", singleAvatar, userController.registerUser);
router.post("/login-user", userController.createSession);
router.get("/getProfile/:userID", userController.getProfile);

module.exports = router;