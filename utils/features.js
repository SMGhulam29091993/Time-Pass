const jwt = require("jsonwebtoken");
const { cookieOptions } = require("../constants/constants.js");
const {v4 : uuidv4} = require("uuid");
const {v2 : cloudinary} = require("cloudinary");
const { base64 } = require("../lib/helper.js");
const {generate}  = require("otp-generator");


module.exports.sendToken = (res, user, code, message)=>{
    const token = jwt.sign({_id : user._id},process.env.JWT_SECRET);

    return res.status(code)
                .cookie("timepass-token", token, cookieOptions)
                .send({message, success : true, user, token })
}

module.exports.emitEvent = (req,event,users,data)=>{console.log("Emitting event", event);}

// upload from cloudinary
module.exports.uploadFilesToCloudiary = async (files=[])=>{
    if(!Array.isArray(files)){
        files = [files];
    }
    
    const uploadPromises = files.map((file)=>{
        return new Promise((resolve, reject)=>{
            cloudinary.uploader.upload(base64(file),{
                resource_type : "auto",
                public_id : uuidv4(),
            } , (error,result)=>{   
                if(error)return reject(error);
                resolve(result);
            })
        })
    })

    try {
        const results = await Promise.all(uploadPromises);
        const formatedResut = results.map((result)=>(
            {
                public_id : result.public_id,
                url : result.secure_url,
            }
        ));
        
        return formatedResut;
    } catch (error) {
        throw new Error("Error in uploading files to cloudinary.", error)
    }
}

module.exports.deleteFilesFromCloudinary = async (public_id)=>{
    // this function files or attachments from cloudinary
}


// get Socket ID that are connected with userID in userSocketIDs map
module.exports.getSocket = (users=[])=>{
    const socketID = users.map(user=>userSocketIDs.get(user._id.toString()));

    return socketID;
}

module.exports.otpGenerator = generate(6,{digits: true, specialChars: true,lowerCaseAlphabets:true})