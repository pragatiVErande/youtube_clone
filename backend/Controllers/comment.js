import { commentModel } from "../Models/comment.js";

export const addComment = async(req,res) => {
    try{
       const {video, message} = req.body;
       const comment = new commentModel({user:req.user._id, video, message});
       await comment.save();

       res.status(201).json({message:"success", comment});
    }
    catch(error){
        res.status(500).json({ error: "Server Error" })
      }
}

export const getCommentByVideoId = async(req,res) => {
    try{
         const {videoId} = req.params;
         const comments = await commentModel.find({video: videoId}).populate('user','channelName profilePic userName createdAt');

         res.status(201).json({message:"success", comments});
    }
    catch(error){
        res.status(500).json({ error: "Server Error" })
      }
}