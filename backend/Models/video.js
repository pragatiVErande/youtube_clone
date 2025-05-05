
import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    title:{
        type : String,
        required : true
    },
    description:{
        type : String,
    },
    videoLink:{
        type : String,
        required : true
    },
    thumbnail:{
        type : String,
        required : true
    },
    videoType:{
        type : String,
        default : "All"
    },
    likes:{
        type : Number,
        default : 0
    },
    dislikes:{
        type : Number,
        default : 0
    }
},{timeStamps : true});

export const videoModel = mongoose.model("video",videoSchema);