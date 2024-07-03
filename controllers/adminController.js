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

// get all messages data for admin dashboard
module.exports.getAllMessages = async (req,res,next)=>{
    try {
        const messages = await Message.find({}).populate("sender","name avatar").populate("chat", "name groupChat");
        
        const transformedMessages = messages.map(({_id, sender, attachments, content, createdAt, chat})=>{
            return {
                _id, attachments,content,createdAt,
                sender : {
                    _id: sender._id,
                    name: sender.name,
                    avatar : sender.avatar.url,
                },
                chat : {
                    _id : chat._id,
                    groupChat : chat.groupChat,
                }
            }
        });
        
        return res.status(200).send({message: "Here are all the messages...", success: true, messages : transformedMessages});
    } catch (error) {
        next(error);
    }
}

// get all stats number for the admin dashboard
module.exports.getStats = async (req,res,next)=>{
    try {
        const [groupChatsCount, usersCount, messagesCount, totalChatsCount] = await Promise.all(
            [
                Chat.countDocuments({groupChat : true}),
                User.countDocuments(),
                Message.countDocuments(),
                Chat.countDocuments()
            ]
        );
        const today = new Date();

        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate()-7);

        const last7DaysMessages = await Message.find({createdAt : {$gte : last7Days, $lte : today}}).select("createdAt");
        const dayInMillisecond = 1000*60*60*24;

        const messagesArray = new Array(7).fill(0);
        
        last7DaysMessages.forEach(message=>{
            const index = Math.floor((today.getTime() - message.createdAt.getTime()) / dayInMillisecond);
            if (index < 7){
                messagesArray[6-index]++;
            }
            
        })

        const stats = {
            groupChatsCount,
            usersCount,
            messagesCount,
            totalChatsCount,
            messageChart : messagesArray,
        };

        return res.status(200).send({message :"Here are your app stats...", success : true, stats});
    } catch (error) {
        next(error);
    }
}