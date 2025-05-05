import {userModel} from '../Models/user.js'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const cookieOptions = { 
    httpOnly : true,
    secure : false,
    sameSite : 'Lax'
}

export const signUp = async(req,res) =>{
  try{
      const {channelName, userName, about, profilePic, password } = req.body;
      const isExit = await userModel.findOne({userName})
      if(isExit){
        res.status(400).json({error : 'UserName already Exists..Please try another UserName'})  
      }else{
        let updatedPassword = await bcrypt.hash(password, 10);
        const user = new userModel( {channelName, userName, about, profilePic, password : updatedPassword })
        await user.save();
        res.status(201).json({Message : "User Registered Successfully", success : "yes", data : user})
      }
  }catch(error){
    res.status(500).json({ error :"Server Error"})
  }
}

export const signIn = async (req,res) => {
       try{
         const {userName, password} = req.body;
         const user = await userModel.findOne({userName});

         if(user && await bcrypt.compare(password, user.password)){
            
            // generating token
            const token = jwt.sign({userId : user._id}, "my_secret_key");
            res.cookie('token', token, cookieOptions)

            res.status(200).json({Message:"Logged in Successfully", success : "true", token, user})
         }else{
            res.status(400).json({Error : "Invalid Credentials"})
         }
       }
       catch(error){
        res.status(500).json({ error :"Server Error"})
       }
}

export const logout = async(req,res) => {
   res.clearCookie('token',cookieOptions).json({message:'Logged out successfully'})
}