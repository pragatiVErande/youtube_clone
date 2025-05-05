import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user',
            required : true
        },
        video:{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'video',
            required : true
        },
        message : {
            type : String,
            required : true
        }
},{timeStamps : true});

export const commentModel = mongoose.model("comment",commentSchema);