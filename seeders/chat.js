const User = require("../model/userModel.js");
const Chat = require("../model/chatModel.js");
const { faker, simpleFaker } = require('@faker-js/faker');

module.exports.createSampleChats = async (numChats)=>{
    try {
        const users = await User.find().select("_id");

        const chatPromise = [];

        for(let i = 0; i<users.length; i++){
            for(let j =i+1; j < users.length; j++ ){
                chatPromise.push(
                    Chat.create({
                        name : faker.lorem.word(2),
                        members : [users[i], users[j]]
                    })
                )
            }
        }
        await Promise.all(chatPromise);
        console.log("Chat has been created");
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}


module.exports.createSampleGroupChats = async (numChats)=>{
    try {
        const users = await User.find().select("_id");
        const chatPromise = [];
        
        for(let i =0; i < numChats; i++){
            const numMembers = simpleFaker.number.int({min : 3, max : users.length});
            const members = [];

            for(let j = 0; j<numMembers ; j++){
                const randomIndex = Math.floor(Math.random() * users.length);
                const randomUsers = users[randomIndex];

                if(!members.includes(randomUsers)){
                    members.push(randomUsers);
                }
            }
            const chat = Chat.create({
                groupChat : true,
                name : faker.lorem.words(1),
                creator : members[0],
                members,
            })

            chatPromise.push(chat);
        }

        await Promise.all(chatPromise);

        console.log("Group chat created...");

        process.exit(0);

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}