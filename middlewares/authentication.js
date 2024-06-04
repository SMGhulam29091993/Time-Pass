const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = async (req,res,next)=>{
    // console.log(`Cookies: ${req.cookies['timepass-token']}`);
    try {
        const token = req.cookies['timepass-token'];
        // console.log(token);
        if(!token){
            return res.status(402).send({message :"User not authenticated...", success : false});
        }
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("DecodeUser : ", decodedUser);
        req.userID = decodedUser._id;

        next();
    } catch (error) {
        next(error);
    }
}