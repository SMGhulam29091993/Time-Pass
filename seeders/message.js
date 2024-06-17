const User = require("../model/userModel.js");
const Chat = require("../model/chatModel.js");
const Message = require("../model/messageModel.js");
const { faker } = require('@faker-js/faker');

module.exports.createSampleMessage = async (numMessages)=>{
    try {
        const users = await User.find().select("_id");
        const chats = await Chat.find().select("_id");

        const messagePromise = [];

        for(let i = 0; i < numMessages; i++){
            const randomUsers = users[Math.floor(Math.random()*users.length)];
            const randomChats = chats[Math.floor(Math.random()*chats.length)];

            messagePromise.push(
                Message.create({
                    sender : randomUsers,
                    chat : randomChats,
                    content : faker.lorem.sentence()
                })
            )
        }

        await Promise.all(messagePromise);

        console.log("Messages has been created...");

        process.exit(0);
        
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports.createMessageInAChat = async (chatID, numMessages)=>{
    try {
        const users = await User.find().select("_id");

        const messagePromise = [];

        for(let i = 0; i < numMessages; i++){
            const randomUsers = users[Math.floor(Math.random()*users.length)];

            messagePromise.push(
                Message.create({
                    chat: chatID,
                    sender : randomUsers,
                    content : faker.lorem.sentence()
                })
            )
        }

        await Promise.all(messagePromise);

        console.log("Message in a chat created...");

        process.exit(0);
        
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}