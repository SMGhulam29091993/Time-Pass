const bcryptjs = require("bcryptjs");
const User = require("../model/userModel.js");
const Chat = require("../model/chatModel.js");
const Request = require("../model/requestModel.js");
const {sendToken, emitEvent} = require("../utils/features.js");
const { cookieOptions } = require("../constants/constants.js");
const { NEW_REQUEST, REFETCH_CHAT } = require("../constants/event.js");
const QRCode = require("qrcode");

// user register
module.exports.registerUser = async (req, res, next) => {
    const { email, password, ...rest } = req.body;
    try {

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ message: "User already exists!", success: false });
        }
        const file = req.file;

        if(!file)return res.status(400).send({message : "Please upload avatar...", success : false})

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);



        // Create a new user with the hashed password
        const user = await User.create({ ...rest, email, password: hashedPassword });

        // Send a success response
        if (user) {

            // below code will generate user profile qr URL and store it db
            const userProfileURL = `https://timepass.com/myProfile/${user._id}`;
            const qrDetailURL = await QRCode.toDataURL(userProfileURL);
            user.qrCode = qrDetailURL;
            await user.save();

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
        const notFriendListUser = await User.find({_id: {$nin: myFriends},
                                                  $or: [{ name : {$regex:name, $options :"i"}},
                                                      {username : {$regex:name, $options :"i"}}]});
    

        // modified the response
        const unknownUsers = notFriendListUser.map(({_id,name,avatar})=>({_id,name ,avatar: avatar.url}))

        return res.status(200).send({message:"Here are your chats lists...", success : true, unknownUsers})
        
    } catch (error) {
        next(error);
    }
}

// send friend request controller
module.exports.sendFriendRequst = async (req,res,next)=>{
    const {receiverID} = req.body;
    try {
        const request = await Request.findOne({
            $or :[
                {sender: req.userID, receiver : receiverID},
                {sender : receiverID, receiver : req.userID}
            ]
        });

        if(request) return res.status(400).send({message:"Request already sent...", success : false});

        await Request.create({
            sender: req.userID,
            receiver : receiverID,
        })

        emitEvent(req, NEW_REQUEST, [receiverID]);

        return res.status(200).send({message: "Friend request sent successfully...", success : true});

    } catch (error) {
        next(error);
    }

}


// accept friend Request
module.exports.acceptsFriendRequest = async (req,res,next)=>{
    const {requestID,accept} = req.body;
    try {
        // find request 
        const request = await Request.findById(requestID).populate("sender","name").populate("receiver","name");

        if(!request) return res.status(404).send({message: "Request not found!!!",success: false});

        if(request.receiver._id.toString() !== req.userID.toString())return res.status(400).send({message:"You are not authorized to accept this request...", success: false})
        
        if(!accept){
            await request.deleteOne();
            return res.status(200).send({message: "Friend Request Rejected...",success : true});
        } 

        const members = [request.sender._id,request.receiver._id];

        let name = req.userID.toString() === request.receiver._id.toString() ? request.sender.name : request.receiver.name;

        await Promise.all([Chat.create({members, name}), request.deleteOne()])

        emitEvent(req, REFETCH_CHAT, members);

        return res.status(200).send({message:"Friend Request Accepted...", success : true, senderID : request.sender._id})

    } catch (error) {
        next(error);
    }
}


// get notifications...
module.exports.getNotifications = async (req,res,next)=>{
    try {
        const request = await Request.find({receiver : req.userID}).populate("sender","name avatar");

        const allRequest = request.map(({_id,sender})=>(
                            {
                                _id, 
                                sender:{_id : sender._id, name : sender.name, avatar : sender.avatar.url}
                            }));
        return res.status(200).send({message : "You have notifications...", success:true, allRequest})
    } catch (error) {
        next(error);
    }
}


// get my friends
module.exports.getMyFriends = async (req,res,next)=>{
    const chatID = req.query.chatID;
    try {
        const chats = await Chat.find({members : req.userID, groupChat : false}).populate("members","name avatar");
        
        const myFriends = chats.map(({members})=>{
            const otherUser = members.find((member)=>member._id.toString() !== req.userID.toString());
            
            return {
                _id: otherUser._id,
                name : otherUser.name,
                avatar : otherUser.avatar.url,
            }
        });

        if(chatID){
            const chat = await Chat.findById(chatID);

            // the below code will filter out all the other firends available except the one in chat
            const availableFriends = myFriends.filter((friend)=>!chat.members.includes(friend._id));

            return res.status(200).send({message : "Your availale friend list...",success : true, friends : availableFriends});
        }else{
            return res.status(200).send({message: "Your friend List...", success: true, friends : myFriends})
        }
    } catch (error) {
        next(error);
    }
}