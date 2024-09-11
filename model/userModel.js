const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
    },
    email : {
        type: String,
        required : true,
        unique : true,
    },
    username : {
        type: String,
        required : true,
        unique : true,
    },
    password : {
        type: String,
        required : true,
        select : false,
    },
    bio : {
        type: String,
        required : true,
    },
    avatar : {
        public_id : {
            type : String,
            required :true,
        },
        url :{
            type : String,
            required :true,
        }
    },
    qrCode : {
        type : String,
    },
    otp: {
        type: String,
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User;