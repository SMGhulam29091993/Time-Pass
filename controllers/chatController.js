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