
import { videoModel } from '../Models/video.js'

export const uploadVideo = async (req, res) => {
  try {
    const { title, description, videoLink, thumbnail, videoType } = req.body;

    const videoUpload = new videoModel({ user: req.user._id, title, description, videoLink, thumbnail, videoType });
    await videoUpload.save();

    res.status(201).json({ success: "true", videoUpload });
  }
   catch (error) {
    res.status(500).json({ error: "Server Error" })
  }
}

export const getVideos = async (req, res) => {
  try {
      const videos = await videoModel.find().populate('user','channelName profilePic userName createdAt');
      res.status(200).json({success:'true', "videos":videos})
  }
   catch (error) {
    res.status(500).json({ error: "Server Error" })
  }
}

export const getVideoById = async(req,res) => {
  try{
      const {id}= req.params;
      const video = await videoModel.findById(id).populate('user','channelName profilePic userName createdAt likes dislikes');

      res.status(200).json({success:'true','video':video})
  }
  catch(error){
    res.status(500).json({ error: "Server Error" })
  }
}

export const getVideoByUserId = async(req,res) => {
  try{
       const {userId} = req.params;
       const video = await videoModel.find({user:userId}).populate('user','channelName profilePic userName createdAt about');

       res.status(201).json({success:'true', 'video':video});
  }
  catch(error){
    res.status(500).json({ error: "Server Error" })
  }
}

export const updateLikes = async(req,res) => {
  try{
    const video = await videoModel.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!video) return res.status(404).send("Video not found");
    res.status(200).json({success:'true','likes':video.likes})
  }
  catch(error){
    res.status(500).json({ error: "Server Error" })
  }
}

export const updateDislikes = async(req,res) => {
  try{
    const video = await videoModel.findByIdAndUpdate(
      req.params.id,
      { $inc: { dislikes: 1 } },
      { new: true }
    );
    if (!video) return res.status(404).send("Video not found");
    res.status(200).json({success:'true','dislikes':video.dislikes})
  }
  catch(error){
    res.status(500).json({ error: "Server Error" })
  }
}