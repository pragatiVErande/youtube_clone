
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    channelName : {
        type : String,
        required : true
    },
    userName : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    about : {
        type : String,
    },
    profilePic : {
        type : String,
        required : true
    }
},{timeStamps : true});

export const userModel = mongoose.model("user",userSchema)