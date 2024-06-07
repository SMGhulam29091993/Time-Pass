const express = require("express");
const router = express.Router();


router.use("/user", require("./user.js"));
router.use("/chat", require("./chat.js"));


router.get("/test", (req,res,next)=>{
    return res.status(200).send({message:"The backend is working !!!", success: true })
})

module.exports = router;