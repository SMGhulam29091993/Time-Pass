const bcryptjs = require("bcryptjs");
const User = require("../model/userModel.js");
const Chat = require("../model/chatModel.js");
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


// user login controller
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


// get user profile controller
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

// logout controller
module.exports.destroySession = async (req,res,next)=>{
    try {
        return res.status(201)
                    .cookie("timepass-token", "", cookieOptions)
                    .send({message:"User has logged out successfully...", success : true})
    }catch(error){
        next(error)
    }
}

// search user controller
module.exports.searchUser = async (req,res,next)=>{
    const {name} = req.query;
    try {
        const myChats = await Chat.find({groupChat: false, members : req.userID});

        // below function will return my friends or whom I have chatted with
        const myFriends = myChats.map((chat)=>chat.members).flat()//we can also use flatMap() the output will be same, it will flatten the subarray within the array to a single array

        // below will give list of people who are not friends or never chatted with
        const notFriendListUser = await User.find({_id: {$nin: myFriends},name : {$regex:name, $options :"i"}});

        // modified the response
        const unknownUsers = notFriendListUser.map(({_id,name,avatar})=>({_id,name ,avatar: avatar.url}))

        return res.status(200).send({message:"Here are your chats lists...", success : true, unknownUsers})
        
    } catch (error) {
        next(error);
    }
}