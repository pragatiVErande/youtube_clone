import React, { useEffect, useState } from 'react'
import './Navbar.css'
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { data, Link, useNavigate } from 'react-router-dom'
import Login from '../Login/Login';
import axios from 'axios';
import Search from '../Search/Search';

function Navbar({ setSideNavbarFunc, sideNavbar }) {

  const [userPic, setUserPic] = useState('https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg')

  const [navbarModal, setNavbarModal] = useState(false);

  const [login, setLogin] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);


  const navigate = useNavigate()

  const handleProfile = () => {
    let userId = localStorage.getItem('userId')
    navigate(`/user/${userId}`)
    setNavbarModal(false)
  }

  const handleModal = () => {
    setNavbarModal(!navbarModal)
  }

  const sideNavbarFunc = () => {
    setSideNavbarFunc(!sideNavbar)
  }

  const setLoginModal = () => {
    setLogin(false)
  }

  const onClickOfPopUpOption = (button) => {
    setNavbarModal(false)
    if (button === 'login') {
      setLogin(true)
    } else {
      localStorage.clear();
      getLogoutFunc();
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 2000)
    }
  }

  // implementaning logout functionaity
  const getLogoutFunc = async () => {
    try {
      const response = await axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true })
      console.log("logout")
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    let userProfilePic = localStorage.getItem("userProfilePic");
    setLoggedIn(localStorage.getItem('userId') !== null ? true : false);
    if (userProfilePic !== null) {
      setUserPic(userProfilePic)
    }
  }, [])

// log to searched video 
  const getFilteredVideo = (Searchedvideo) => {
    console.log(Searchedvideo)
}

  return (
    <>
      <div className='navbar'>

        <div className="navbar-left">
          <div className="navbarMenu" onClick={sideNavbarFunc}>
            <MenuIcon />
          </div>

          <Link to={'/'} className="navbar-youtubeImg">
            <YouTubeIcon className='navbar_youtubeImage' />
            <div className='navbar_youTubeTitle'>YouTube</div>
          </Link>
        </div>

        <div className="navbar-center">
          <Search filterFunction={getFilteredVideo}/>
        </div>

        <div className="navbar-right">
          <Link to={'/12334/upload'}><VideoCallIcon sx={{ color: 'white', cursor: 'pointer' }} /></Link>
          <img onClick={handleModal} src={userPic} className='navbar-person' alt='logo' />

          {navbarModal &&
            <div className="navbar-modal">
              {loggedIn && <div className="navbar-modal-option" onClick={handleProfile}>Profile</div>}

              {!loggedIn && <div className="navbar-modal-option" onClick={() => { onClickOfPopUpOption('login') }}>Login</div>}
              {loggedIn && <div className="navbar-modal-option" onClick={() => { onClickOfPopUpOption('logout') }}>Logout</div>}
            </div>
          }
        </div>
        {
          login && <Login setLoginModal={setLoginModal} />
          
        }
      </div>
    </>
  )
}

export default Navbar