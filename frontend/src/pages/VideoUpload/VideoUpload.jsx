import React, { useEffect, useState } from 'react'
import './videoUpload.css'
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function VideoUpload() {

  const [inputField, setInputField] = useState({ 'title': '', 'description': '', 'videoLink': '', 'thumbnail': '', 'videoType': '' });

  const navigate = useNavigate();

  const [loader, setLoader] = useState(false)

  const handleInput = (event, name) => {
    setInputField({
      ...inputField, [name]: event.target.value
    })
  }

   // Uploading image using cloudinary
  const handleUploadImage = async (e, type) => {
    setLoader(true)
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'youtube-clone')
    try {
      //cloudname : djvcizvs4
      const response = await axios.post(`https://api.cloudinary.com/v1_1/djvcizvs4/${type}/upload`, data)
      const url = response.data.url;
      setLoader(false)
      let val = type === "image" ? "thumbnail" : "videoLink"
      setInputField({
        ...inputField, [val]: url
      })

    } catch (err) {
      setLoader(false)
      console.log(err)
    }
  }

  console.log(inputField)

  // checks user is logged-in or not
  useEffect(()=>{
    let isLogin = localStorage.getItem('userId');
    if(isLogin == null){
        navigate('/')
    }
  },[])

  // implementation for posting video by user 
  const handleSubmitFunc = async() => {
      try{
        setLoader(true)
         const response = await axios.post("http://localhost:5000/api/video",inputField,{ withCredentials: true})
         console.log(response)
         setLoader(false)
         navigate('/')
      }
      catch(err){
        console.log(err.message)
        setLoader(false)
      }
  }

  return (
    <div className='videoUpload'>
      <div className="upload-box">
        <div className="upload-video-title">
          <YouTubeIcon sx={{ fontSize: '54px', color: 'red' }} />
          Upload Video
        </div>

        <div className="upload-form">

          <input type="text" className="upload-form-input" placeholder='Title of video' value={inputField.title} onChange={(e) => handleInput(e, 'title')} />

          <input type="text" className="upload-form-input" placeholder='Description' value={inputField.description} onChange={(e) => handleInput(e, 'description')} />

          <input type="text" className="upload-form-input" placeholder='catagory' value={inputField.videoType} onChange={(e) => handleInput(e, 'videoType')} />

          <div>Thumbnail <input type="file" accept='image/*' onChange={(e) => handleUploadImage(e, "image")} /></div>

          <div>Video <input type="file" accept='video/mp4,video/webm, video/*' onChange={(e) => handleUploadImage(e, 'video')} /></div>
          {
            loader && <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          }
        </div>

        <div className="upload-btn">
          <div className="upload-btn-form" onClick={handleSubmitFunc}>Upload</div>
          <Link to={'/'} className="upload-btn-form">Home</Link>
        </div>
      </div>
    </div>
  )
}

export default VideoUpload;