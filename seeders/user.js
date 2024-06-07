const User = require("../model/userModel.js");
const { faker } = require('@faker-js/faker');

module.exports.createUser = async (num)=>{
    try {
        const userPromise = [];

        for (let i = 0; i<num; i++){
            const user = User.create({
                name : faker.person.fullName(),
                email : faker.internet.email(),
                username : faker.internet.userName(),
                bio : faker.lorem.sentence(),
                password : "password",
                avatar : {
                    url: faker.image.avatar(),
                    public_id: faker.datatype.uuid(),
                }
            })
            userPromise.push(user);
        }
        await Promise.all(userPromise);

        console.log("User Created : ", num);
        process.exit(0);
        
    } catch (error) {
        console.log("Error in seeder user.js:", error);
        process.exit(1);
    }
}

