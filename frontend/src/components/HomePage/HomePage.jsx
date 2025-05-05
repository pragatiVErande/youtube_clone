
import React, { useState, useEffect } from 'react'
import './HomePage.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

function HomePage({ sideNavbar }) {

  const options = ['All', 'Gaming', 'News', 'Coding', 'Share Market', 'Live', 'Cricket', 'Democracy', 'Comedy', 'TV-channels', 'Enginnering', 'Medical', 'Finance', 'Bussiness', 'Agriculture','Teaching']

  const [data, setData] = useState([]);

  // calling api to show all videos using axios
  useEffect(() => {
    axios.get("http://localhost:5000/api/allvideos")
      .then((res) => {
        console.log(res.data.videos)
        setData(res.data.videos)
      })
      .catch((err) => {
        console.log(err)
      })
  }, []);

    // Displaying all videos on UI && Conditionary rendering homepage
  return (
    <div className={sideNavbar ? 'homepage' : 'fullhomepage'}>

      <div className="homepage-options">
        {
          options.map((item, index) => {
            return (
              <div key={index} className="homepage-option">
                {item}
              </div>
            )
          })
        }
      </div>

      <div className={sideNavbar ? "home-mainpage" : "full"}>
       
        {
          data?.map((item, id) => {
            return (
              <Link to={`watch/${item._id}`} className="youtube-video" key={id}>

                <div className="youtube-thumbnailBox">
                  <img src={item.thumbnail} alt='thumbnail' className="youtube-thumbnailPic" />
                  <div className="youtube-timingThumbnail">10:35</div>
                </div>

                <div className="youtube-titleBox">
                  <div className="youtube-profilePic">
                    <img src={item?.user?.profilePic} alt="profile" className="youtube-thumbnail-profile" />
                  </div>

                  <div className="youtube-titleBox-title">
                    <div className="youtube-videoTitle">{item?.title}</div>
                    <div className="youtube-channelname">{item?.user?.channelName}</div>
                    <div className="youtube-views">{item?.likes} likes</div>
                  </div>
                </div>
                
              </Link>
            )
          })
        }

      </div>


    </div>
  )
}

export default HomePage