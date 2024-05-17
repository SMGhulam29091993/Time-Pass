const mongoose = require("mongoose");
require("dotenv").config();


mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error in connecting with the db".bgMagenta));

db.once("open", ()=>console.log("Connection with db established".bgCyan));

module.exports =  db;