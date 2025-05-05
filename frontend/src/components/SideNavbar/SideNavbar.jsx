import React from 'react'
import './SideNavbar.css'
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import HistoryIcon from '@mui/icons-material/History';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { Link } from 'react-router-dom';

function SideNavbar({sideNavbar}) {
    return (
        <div className={sideNavbar?"home-sideNavbar":"home-sideNavbarHide"}>

            <div className="home-sideNavBarTop">

                <Link to = {'/'} className={`home-sideNavBarTopOption`}>
                    <HomeIcon />
                    <div className="home-sideNavBarTopOptionTitle">Home</div>
                </Link>

                <div className={`home-sideNavBarTopOption`}>
                    <VideocamIcon />
                    <div className="home-sideNavBarTopOptionTitle">Shorts</div>
                </div>

                <div className={`home-sideNavBarTopOption`}>
                    <SubscriptionsIcon />
                    <div className="home-sideNavBarTopOptionTitle">Subscription</div>
                </div>

            </div>

            <div className="home-sideNavBarMiddle">

                <div className={`home-sideNavBarTopOption`}>
                    <div className="home-sideNavBarTopOptionTitle">You</div>
                    <KeyboardArrowRightIcon/>
                </div>

                <div className={`home-sideNavBarTopOption`}>
                    <div className="home-sideNavBarTopOptionTitle">Your Channel</div>
                    <RecentActorsIcon/>
                </div>

                <div className={`home-sideNavBarTopOption`}>
                    <div className="home-sideNavBarTopOptionTitle">History</div>
                    <HistoryIcon/>
                </div>

                <div className={`home-sideNavBarTopOption`}>
                    <div className="home-sideNavBarTopOptionTitle">Play List</div>
                    <QueueMusicIcon/>
                </div>

                <div className={`home-sideNavBarTopOption`}>
                    <div className="home-sideNavBarTopOptionTitle">Watch Later</div>
                    <WatchLaterIcon/>
                </div>

                <div className={`home-sideNavBarTopOption`}>
                    <div className="home-sideNavBarTopOptionTitle">Liked Videos</div>
                    <ThumbUpIcon/>
                </div>

                <div className={`home-sideNavBarTopOption`}>
                    <div className="home-sideNavBarTopOptionTitle">Your Courses</div>
                    <LocalLibraryIcon/>
                </div>

                <div className={`home-sideNavBarTopOption`}>
                    <div className="home-sideNavBarTopOptionTitle">Download</div>
                    <DownloadForOfflineIcon/>
                </div>

            </div>
             
             <div className="home-sideNavBarMiddle">

             <div className='home-sideNavBarTopOption'>
                    <div className="home-sideNavBarTopOptionTitleHeader">Subscription</div>
             </div>

             <div className='home-sideNavBarTopOption'>
                <img className='home-sideNavBar-imgLogo' src="https://media.licdn.com/dms/image/v2/C4D0BAQFCJgcvjvHrkw/company-logo_200_200/company-logo_200_200/0/1630527418864/internshala_trainings_logo?e=2147483647&v=beta&t=tfLq-n3TOl_HUcP35OdAVho8gJ8IvF9M4r8l0KyCeDo" alt="" />
                    <div className="home-sideNavBarTopOptionTitleHeader">Internshala</div>
             </div>

             <div className='home-sideNavBarTopOption'>
                <img className='home-sideNavBar-imgLogo' src="https://play-lh.googleusercontent.com/wKwW77zj6Gd-llTDakdjSDnWUPKSMDGXhnZSXel3A3qQSiM1cbDvuspBpQk15tiT9ik" alt="" />
                    <div className="home-sideNavBarTopOptionTitleHeader">Udemy</div>
             </div>

             <div className='home-sideNavBarTopOption'>
                <img className='home-sideNavBar-imgLogo' src="https://www.langoly.com/wp-content/uploads/2021/09/coursera-logo.png" alt="" />
                    <div className="home-sideNavBarTopOptionTitleHeader">Coursera</div>
             </div>

             </div>

        </div>
    )
}

export default SideNavbar