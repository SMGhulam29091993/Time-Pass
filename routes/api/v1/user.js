const express = require("express");
const userController = require("../../../controllers/userController.js");
const { singleAvatar } = require("../../../middlewares/multer.js");
const { isAuthenticated } = require("../../../middlewares/authentication.js");
const { registerValidator, validateHandler, loginValidator } = require("../../../lib/validator.js");

const router = express.Router();


router.post("/register", singleAvatar,registerValidator(),validateHandler, userController.registerUser);
router.post("/login-user",loginValidator(),validateHandler,userController.createSession);
router.get("/getProfile/:userID",isAuthenticated, userController.getProfile);
router.post("/logout", userController.destroySession);
router.get("/search", isAuthenticated, userController.searchUser);

module.exports = router;