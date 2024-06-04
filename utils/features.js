const jwt = require("jsonwebtoken");
const { cookieOptions } = require("../constants/constants.js");



module.exports.sendToken = (res, user, code, message)=>{
    const token = jwt.sign({_id : user._id},process.env.JWT_SECRET);

    return res.status(code)
                .cookie("timepass-token", token, cookieOptions)
                .send({message, success : true, user, token })
}


