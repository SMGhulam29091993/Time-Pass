const User = require("../model/userModel.js");
const Message = require("../model/messageModel.js");
const Chat = require("../model/chatModel.js");
const Request = require("../model/requestModel.js");


// get all users data for admin dashboard
module.exports.getAllUsers = async (req,res,next)=>{
    try {
        const allUsers = await User.find({});

        const transformUser = await Promise.all(allUsers.map(async ({_id,name,email, username,avatar })=>{
            const [groups,friends ] = await Promise.all([
                Chat.countDocuments({groupChat : true, members : _id}), 
                Chat.countDocuments({groupChat: false, members : _id}),])
            return {
                _id,
                name,
                username,
                email,
                avatar: avatar.url,
                groups, 
                friends,
            }
        }));

        return res.status(200).send({message : "Here are your users list...", success : true, users : transformUser})
    } catch (error) {
        next(error);
    }
}

// get all chats data for admin dashboard
module.exports.getAllChats = async (req,res,next)=>{
    try {
        const chats = await Chat.find({}).populate("members", "name avatar").populate("creator","name avatar");

        const transformChats = await Promise.all(chats.map(async ({_id, name,members, groupChat, creator})=>{
            const totalMessages = await Message.countDocuments({chat : _id})
            return {
                _id, 
                name,
                groupChat,
                avatar : members.slice(0,3).map((member)=>member.avatar.url),
                members : members.map(({_id,name,avatar})=>({
                    _id, name, avatar : avatar.url,
                })),
                creator : {
                    name : creator?.name || "None",
                    avatar : creator?.avatar.url || "None",
                },
                totalMembers: members.length,
                totalMessages,
            }
        }))


        return res.status(200).send({message :"All chats data are received...", success : true, chats: transformChats});
    } catch (error) {
        next(error);
    }
}