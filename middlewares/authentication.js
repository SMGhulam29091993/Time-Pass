const jwt = require("jsonwebtoken");


// user Athentication
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



// admin Authentication
module.exports.adminAuthenticated = async (req,res,next)=>{
    try {
        const adminToken = req.cookies["timepass-admin-token"];
        if(!adminToken)return res.status(402).send({message :"User not authenticated...", success : false});
       
        const secretKey = jwt.verify(adminToken, process.env.JWT_SECRET);
    

        if(secretKey !== process.env.ADMIN_SECRETKEY)return res.status(401).send({message :"User not authenticated...", success : false});

        next();

    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).send({ message: "Invalid or expired token...", success: false });
        }
        next(error);
    }
}