
import jwt from "jsonwebtoken";
import { userModel } from "../Models/user.js";

export const auth = async(req,res,next) => {
    
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({error:"No token, authentication denied"})
    }else{
        try{
            //verify token
              const decode = jwt.verify(token, "my_secret_key");
              req.user = await userModel.findById(decode.userId).select("-password");
              next();
        }
        catch(error){
            res.status(500).json({ error :"token is not valid"})
           }
    }
} 