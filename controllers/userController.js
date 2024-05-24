const bcryptjs = require("bcryptjs");
const User = require("../model/userModel.js");

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
