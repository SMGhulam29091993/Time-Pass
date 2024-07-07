const jwt = require("jsonwebtoken");
const { cookieOptions } = require("../constants/constants.js");



module.exports.sendToken = (res, user, code, message)=>{
    const token = jwt.sign({_id : user._id},process.env.JWT_SECRET);

    return res.status(code)
                .cookie("timepass-token", token, cookieOptions)
                .send({message, success : true, user, token })
}

module.exports.emitEvent = (req,event,users,data)=>{console.log("Emitting event", event);}

module.exports.deleteFilesFromCloudinary = async (public_id)=>{
    // this function files or attachments from cloudinary
}


// get Socket ID that are connected with userID in userSocketIDs map
module.exports.getSocket = (users=[])=>{
    const socketID = users.map(user=>userSocketIDs.get(user._id.toString()));

    return socketID;
}