const express = require("express");
require("dotenv").config();
require("colors");
const morgan =  require("morgan");
const PORT = 8000;
const cors = require("cors");
const cookieParser = require("cookie-parser");

// const { createUser } = require("./seeders/user.js");
// const { createSampleChats, createSampleGroupChats } = require("./seeders/chat.js");
// const { createMessageInAChat } = require("./seeders/message.js");   


const db = require("./config/mongoose.js"); //connecting with database

// createUser(10);
// createSampleChats(10);
// createSampleGroupChats(10);
// createMessageInAChat("667095050ede9d0afa1c19a2",50);

const app = express();
const errorHandler = require("./middlewares/errorHandlermiddleware.js");





// middleware for the app
app.use(cors())
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(errorHandler)


// router
app.use("/", require("./routes/api/v1/index.js"));


app.listen(PORT, (err)=>{
    if(err){
        console.log("Error in running the server : ".bgRed, err);
    }
    console.log(`The server is up and running on port: ${PORT}`.bgGreen);
})