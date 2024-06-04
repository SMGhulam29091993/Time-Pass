const bcryptjs = require("bcryptjs");
const User = require("../model/userModel.js");
const {sendToken} = require("../utils/features.js");
const { cookieOptions } = require("../constants/constants.js");

// user register

module.exports.registerUser = async (req, res, next) => {
    const { email, password, ...rest } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ message: "User already exists!", success: false });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create a new user with the hashed password
        const user = await User.create({ ...rest, email, password: hashedPassword });

        // Send a success response
        if (user) {
            return res.status(201).send({ message: "User registered successfully", success: true, user });
        }
    } catch (error) {
        next(error);
    }
};


// user login

module.exports.createSession = async (req,res,next)=>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email}).select("+password");
        if(!user){
            return res.status(202).send({message:"User not registered.!!!", success: false});
        }
        const isPasswordValid = await bcryptjs.compare(password,user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid email/password.", success: false });
        }
        
        return sendToken(res,user, 200, "User logged in successfuly.!!!");
    } catch (error) {
        next(error);
    }
};

module.exports.getProfile = async (req,res,next)=>{
    const {userID} = req.params;
    try {
        if (userID !== req.userID){
            return res.status(404).send({message: "User not authenticated...", success: false});
        }
        const user = await User.findById(userID);
        if(!user){
            return res.status(404).send({message:"User not found!!!",success:false});
        }
        return res.status(200).send({message :"Here are the user details...", success: true, user});
    } catch (error) {
        next(error);
    }
}


module.exports.destroySession = async (req,res,next)=>{
    try {
        return res.status(201)
                    .cookie("timepass-token", "", cookieOptions)
                    .send({message:"User has logged out successfully...", success : true})
    }catch(error){
        next(error)
    }
}