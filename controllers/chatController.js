const { ALERT, REFETCH_CHAT } = require("../constants/event.js");
const Chat = require("../model/chatModel.js");
const User = require("../model/userModel.js");
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
};


module.exports.addMembers = async (req,res,next)=>{
    const {chatID, members} = req.body;
    try {
        if(!members || members.length < 1) return res.status(400)
                                                        .send({message:"Please provide members...", success: false})

        const chat = await Chat.findById(chatID);
        if (!chat){
            return res.status(404).send({message: "Chat not found...", success : false});
        }
        if(!chat.groupChat){
            return res.status(400).send({message :"This is not a group chat...", success : false});
        }
        if(chat.creator.toString() !== req.userID.toString() ){
            return res.status(403).send({message :"You cannot add members...", success : false});
        }

        const allNewMembersPromise = members.filter((i)=>!chat.members.includes(i) ).map((i)=>User.findById(i, "name"));

        const allNewMembers = await Promise.all(allNewMembersPromise);

        chat.members.push(...allNewMembers.map((i)=>i._id));

        if (chat.members.length > 100){
            return res.status(400).send({message : "Group limit reachedtoadd members...", success: false});
        }
        await chat.save();

        const allUserName = allNewMembers.map((i)=>i.name).join(",");

        emitEvent(req,ALERT,chat.members, `${allUserName} has been added to the group...`);

        emitEvent(req, REFETCH_CHAT, chat.members);

        return res.status(200).send({message :"Members added to the group", success : true, })
    } catch (error) {
        next(error);
    }
}


// remove members from group chat...

module.exports.removeMembers = async (req, res, next) => {
    const { chatID, userID } = req.body;
    
    try {
        const [chat, userToRemove] = await Promise.all([
            Chat.findById(chatID),
            User.findById(userID, "name")
        ]);

        if (!chat) {
            return res.status(404).send({ message: "Chat not found...", success: false });
        }

        if (!chat.groupChat) {
            return res.status(400).send({ message: "This is not a group chat...", success: false });
        }

        if (chat.creator.toString() !== req.userID.toString()) {
            return res.status(403).send({ message: "You do not have permission to remove members...", success: false });
        }

        if (chat.members.length <= 3) {
            return res.status(400).send({ message: "Group must have at least 3 members.", success: false });
        }

        chat.members = chat.members.filter(member => member.toString() !== userID.toString());

        await chat.save();

        emitEvent(req, ALERT, chat.members, `${userToRemove.name} has been removed from the group.`);
        emitEvent(req, REFETCH_CHAT, chat.members);

        return res.status(200).send({ message: "Member removed successfully...", success: true });

    } catch (error) {
       next(error);
    }
};
