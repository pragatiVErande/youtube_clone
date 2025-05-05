import React, { Suspense, useEffect, useState } from 'react'
import './App.css'
import {Route, Routes} from 'react-router-dom'
const Navbar = React.lazy(()=>import("./components/Navbar/Navbar"))
const Home = React.lazy(()=> import("./pages/Home/Home"))
const Video = React.lazy(()=>import("./pages/Video/Video"))
const Profile = React.lazy(()=>import("./pages/Profile/Profile"))
const SignUp = React.lazy(()=>import("./pages/SignUp/SignUp"))
const VideoUpload = React.lazy(()=>import("./pages/videoUpload/VideoUpload"))

function App() {

const [sideNavbar, setSideNavbar] = useState(true);

const setSideNavbarFunc = (value) => {
  setSideNavbar(value)
}
  return (
    <>
    <Suspense fallback={<div>Loading</div>}>
    <Navbar setSideNavbarFunc={setSideNavbarFunc} sideNavbar={sideNavbar}/>
     <Routes>
      <Route path='/' element={<Home sideNavbar={sideNavbar}/>}/>
      <Route path='/watch/:id' element={<Video/>}/>
      <Route path='/user/:id' element={<Profile sideNavbar={sideNavbar}/>}/>
      <Route path='/:id/upload' element= {<VideoUpload/>}/>
      <Route path='/signup' element={<SignUp/>}/>
     </Routes>
     </Suspense>
    </>
  )
}

export default App
