import express from 'express'
import mongoose from 'mongoose';
import { router } from './Routes/user.js';
import { videoRoutes } from './Routes/video.js';
import cookieParser from "cookie-parser"
import { commentRoutes } from './Routes/comment.js';
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin : 'http://localhost:3000',  // React app Url
    credentials : true
}))

const port = 5000;

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/myYoutubeDb")
.then(()=>{
    console.log("Database connected successfully..!")
})
.catch(()=>{
    console.log("Unable to connect..Please try again")
});

// routes
app.use('/auth', router);
app.use('/api', videoRoutes)
app.use('/commentApi',commentRoutes)

app.get('/', (req, res) => {
    res.send('API is working');
  });


// Creating a Server
app.listen(port,()=>{
    console.log('Server is running on port number:5000');
})