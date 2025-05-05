import React, { useState } from 'react'
import './signUp.css'
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';


function SignUp() {

    const [uploadImage, setUploadImage] = useState('https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg')

    const [signUp, setSignUp] = useState({ 'channelName': '', 'userName': '', 'password': '', 'about': '', 'profilePic': 'uploadImage' });

    const [progressBar, setProgressBar] = useState(false);

    const navigate = useNavigate()

    const handleSignUp = (event, name) => {
        setSignUp({
            ...signUp, [name]: event.target.value
        })
    }
    console.log(signUp)

    // Uploading image using cloudinary
    const handleUploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'youtube-clone')
        try {
            //cloudname : djvcizvs4
            setProgressBar(true)
            const response = await axios.post("https://api.cloudinary.com/v1_1/djvcizvs4/image/upload", data)
                setProgressBar(false)
            const imageUrl = response.data.url;
            setUploadImage(imageUrl)
            setSignUp({
                ...signUp, "profilePic": imageUrl
            })

        } catch (err) {
            console.log(err)
        }
    }

    // Fetching signUp user api using axios
    const handleSignUpBtn = async () => {
        try {
            setProgressBar(true)
            const response = await axios.post("http://localhost:5000/auth/signup", signUp)
            console.log(response)
            toast.success(response.data.message)
            setProgressBar(false)
            navigate('/')
        }
        catch (err) {
            setProgressBar(false)
            toast.error(err)
        }
    }

    return (
        <div className='signUp'>
            <div className="signup-card">
                <div className="signup-title">
                    <YouTubeIcon sx={{ fontSize: '54px' }} className='login-youtube-img' />
                    SignUp
                </div>

                <div className="signup-inputs">
                    <input type="text" className='signup-inp' placeholder='Channel Name' value={signUp.channelName} onChange={(e) => handleSignUp(e, 'channelName')} />
                    <input type="text" className='signup-inp' placeholder='User Name' value={signUp.userName} onChange={(e) => handleSignUp(e, 'userName')} />
                    <input type="password" className='signup-inp' placeholder='Password' value={signUp.password} onChange={(e) => handleSignUp(e, 'password')} />
                    <input type="text" className='signup-inp' placeholder='About your Channel' value={signUp.about} onChange={(e) => handleSignUp(e, 'about')} />

                    <div className="image-upload-signUp">
                        <input type="file" onChange={(e) => handleUploadImage(e)} />
                        <div className="image-upload-signUp-div">
                            <img src={uploadImage} alt="" className="image-default-signUp" />
                        </div>
                    </div>


                    <div className="signup-btns">
                        <div className="signup-btn" onClick={handleSignUpBtn}>SignUp</div>
                        <Link to={'/'} className="signup-btn">HomePage</Link>
                    </div>
                    {
                        progressBar &&                     <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                    }

                </div>
            </div>

            <ToastContainer />
        </div>
    )
}

export default SignUp