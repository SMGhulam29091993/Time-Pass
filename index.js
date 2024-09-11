const express = require("express");
require("dotenv").config();
require("colors");
const morgan =  require("morgan");
const PORT = 8000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandlermiddleware.js");
const {createServer} = require("http");
const {Server} = require("socket.io");
const { v4: uuidv4 } = require('uuid');
const { NEW_MESSAGE, NEW_MESSAGE_ALERT } = require("./constants/event.js");
const { getSocket } = require("./utils/features.js");
const {v2 : cloudinary}  = require("cloudinary");

const Message = require("./model/messageModel.js");

// below created fakedata
// const { createUser } = require("./seeders/user.js");
// const { createSampleChats, createSampleGroupChats } = require("./seeders/chat.js");
// const { createMessageInAChat } = require("./seeders/message.js");   


const db = require("./config/mongoose.js"); //connecting with database

// below created fakedata
// createUser(10);
// createSampleChats(10);
// createSampleGroupChats(10);
// createMessageInAChat("667095050ede9d0afa1c19a2",50);


// cloudinary initialization
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
});

const app = express();
const server = createServer(app);
const io = new Server(server,{});



const userSocketIDs = new Map();





// middleware for the app

const allowOrigin = ["http://localhost:5173","http://localhost:4173",process.env.CLIENT_URL];

const corsOptions = {
    origin : (origin,callback)=>{
        if(allowOrigin.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        }else{
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials : true,
};

app.use(cors(corsOptions));


app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(errorHandler)


// creating a middleware for socket to get user from front end
io.use((socket,next)=>{});

io.on("connection",(socket)=>{
    const tempUser = {
        _id : "jkdac64dv6s4vd8486ds",
        name : "rohan"
    }

    // an object that will store which userID is connected to which particular socketID
    userSocketIDs.set(tempUser._id.toString(), socket.id);

    console.log("User Connected : ",userSocketIDs);

    // this socket will get triggered when user will send message from client side
    socket.on(NEW_MESSAGE, async ({chatID, members, message})=>{
        
        // this will create message to send or emit
        const messageForRealTime = {
            content : message,
            _id : uuidv4(),
            sender : {_id : tempUser._id, name : tempUser.name},
            chat : chatID,
            createdAt : new Date().toISOString(),
        };

        // this will store message in db
        const messageForDB = {
            content : message,
            sender : tempUser._id,
            chat : chatID,
            attachments: [],
        };

        // other members of chat connected to socket or online
        const membersSockets = getSocket(members);

        io.to(membersSockets).emit(NEW_MESSAGE, {chatID, message : messageForRealTime} ) //to send message 
        io.to(membersSockets).emit(NEW_MESSAGE_ALERT, {chatID} ) //to send message alert showing 1 new message

        try{
            await Message.create(messageForDB);
        }catch(error){
            next(error);
        }
    })

    


    socket.on("disconnect",()=>{
        console.log("User disconnected...");
        userSocketIDs.delete(tempUser._id.toString())
    })
})

// router
app.use("/", require("./routes/index.js"));


server.listen(PORT, (err)=>{
    if(err){
        console.log("Error in running the server : ".bgRed, err);
    }
    console.log(`The server is up and running on port: ${PORT} in ${process.env.NODE_ENV.trim()} mode`.bgYellow);
})