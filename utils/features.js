const jwt = require("jsonwebtoken");

const cookieOptions = {
    maxAge : 15*24*60*60*1000,
    sameSite :"none",
    httpOnly : true,
    secure : true
}

module.exports.sendToken = (res, user, code, message)=>{
    const token = jwt.sign({_id : user._id},process.env.JWT_SECRET);

    return res.status(code)
                .cookie("timepass-token", token, cookieOptions)
                .send({message, success : true, user, token })
}