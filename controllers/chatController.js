const { ALERT, REFETCH_CHAT } = require("../constants/event.js");
const Chat = require("../model/chatModel.js");
const { emitEvent } = require("../utils/features.js");


module.exports.newGroupChat = async (req,res,next)=>{
    const {name, members} = req.body;
    try {
        if(members.length < 2){
            return res.status(400).send({message :"Members must have ateast 3 members...", success : false});
        }

        const allMembers = [...members,req.userID];
        const chat = await Chat.create({name, groupChat : true, creator : req.userID, members : allMembers});

        emitEvent(req, ALERT, allMembers, `Welcome to ${name} group chat...`);
        emitEvent(req, REFETCH_CHAT, members);

        if(!chat){
            return res.status(404).send({message :"Problem in creating Group...", success : false});
        }
        return res.status(201).send({message: "Group created...", success: true, chat});

    } catch (error) {
        next(error);
    }
}

// get chat list of members for the user

module.exports.getChats = async (req,res,next)=>{
    try {
        const chats = await Chat.find().populate("members", "name avatar");

        const transformedChats = chats.map(({_id,members, name, groupChat})=>{
            
            const otherMembers = members.find((member)=>member._id.toString() !== req.userID.toString());
            
            return {
                _id, groupChat,
                avatar : groupChat?members.slice(0,3).map(({avatar})=>avatar.url) : [otherMembers.avatar.url],
                name : groupChat?name : otherMembers.name,
                members: members.reduce((prev,curr)=>{
                    if(curr._id.toString() !== req.userID.toString()){
                        prev.push(curr._id)
                    }
                    return prev;
                },[])
            }
        });

        return res.status(200).send({message : "Your chat list", success: true, transformedChats})

    } catch (error) {
        next(error);
    }
}


// get the groupChat List that user has created in group page

module.exports.getGroupChat = async (req,res,next)=>{
    try {
        const chats = await Chat.find({groupChat : true, creator : req.userID}).populate("members","name avatar");

        const groups = chats.map(({members, _id, groupChat, name})=>(
            {
                _id,
                name,
                groupChat,
                avatar : members.slice(0,3).map(({avatar})=>avatar.url),
            }
        ));

        return res.status(200).send({message : "The group chat list...", success: true, groups})
    } catch (error) {
        next(error);
    }
}