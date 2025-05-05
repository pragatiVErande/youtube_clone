import express from "express";
import { auth } from "../Middleware/authentication.js";
import { addComment, getCommentByVideoId } from "../Controllers/comment.js";

export const commentRoutes = express.Router();

commentRoutes.post('/comment',auth, addComment);
commentRoutes.get('/comment/:videoId',getCommentByVideoId);