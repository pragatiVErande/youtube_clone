
import express from "express";
import { logout, signIn, signUp } from "../Controllers/user.js";

export const router = express.Router();

router.post("/signup", signUp);
router.post("/login", signIn);
router.post("/logout", logout);


