import React, { useState } from 'react'
import './Login.css'
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';


function Login({ setLoginModal }) {

    const [loginField, setLoginField] = useState({ userName: '', password: '' });

    const [loader, setLoader] = useState(false)

    const handleInput = (event, name) => {
        setLoginField({
            ...loginField, [name]: event.target.value
        })
    }

    const handleLoginFunc = async () => {
        try {
            setLoader(true)
            const response = await axios.post("http://localhost:5000/auth/login",loginField,{withCredentials:true} )
            setLoader(false)
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.user._id);
            localStorage.setItem('userProfilePic', response.data.user.profilePic);
            window.location.reload();
        }
        catch (err) {
            toast.error("Invalid Credentials")
            setLoader(false)
        }
    }
    return (
        <div className='login'>
            <div className="login-card">
                <div className="login-title">
                    <YouTubeIcon sx={{ fontSize: '54px' }} className='login-youtube-img' />
                    login
                </div>

                <div className="login-cred">
                    <div className="user-name">
                        <input type="text" className="user-name-input" placeholder='UserName' value={loginField.userName} onChange={(e) => { handleInput(e, 'userName') }} />
                    </div>
                    <div className="user-name">
                        <input type="password" className="user-name-input" placeholder='Password' value={loginField.password} onChange={(e) => { handleInput(e, 'password') }} />
                    </div>
                </div>

                <div className="login-btns">
                    <div className="login-btn" onClick={handleLoginFunc}>Login</div>
                    <Link to={'/signup'} onClick={() => { setLoginModal() }} className="login-btn">SignUp</Link>
                    <div className="login-btn" onClick={() => { setLoginModal() }}>Cancel</div>
                </div>

                {loader && <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
                }

            </div>
            <ToastContainer />
        </div>
    )
}

export default Login