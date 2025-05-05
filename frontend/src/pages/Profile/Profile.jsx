
import React, { useEffect, useState } from 'react'
import './Profile.css'
import SideNavbar from '../../Components/SideNavbar/SideNavbar'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

function Profile({ sideNavbar }) {

    const [data, setData] = useState([]);

    const { id } = useParams();

    const [user, setUser] = useState(null)

    // fetching user profile api using axios
    const fetchProfileData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/${id}/channel`)
            setData(response?.data?.video);
            setUser(response?.data?.video[0]?.user);
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchProfileData()
    }, [])
    return (
        <div className='profile'>
            <SideNavbar sideNavbar={sideNavbar} />

            <div className={sideNavbar ? "profile-page" : 'profile-page-inactive'}>

                <div className="profile-top-section">
                    <div className="profile-top-section-profile">
                        <img src={user?.profilePic} alt="profile" className="profile-top-section-image" />
                    </div>
                    <div className="profile-top-section-about">
                        <div className="profile-top-section-name">{user?.channelName}</div>
                        <div className="profile-top-section-info">
                            {user?.userName}  .  {data?.length} videos
                        </div>
                        <div className="profile-top-section-info">
                            {user?.about}
                        </div>
                    </div>
                </div>

                <div className="profile-videos">
                    <div className="profile-videos-title">Videos : </div>

                    <div className="profile-videos-list">
                        {
                            data && data.map((item, index) => {
                                return (
                                    <Link to={`/watch/${item._id}`} className="profile-video-block">
                                        <div className="profile-thumbnail" key={item._id}>
                                            <img src={item?.thumbnail} alt="" className="profile-thumbnail-img" />
                                        </div>
                                        <div className="profile-block-detail">
                                            <div className="profile-block-detail-name">{item?.title}</div>
                                            <div className="profile-block-detail-about">Catagory : {item?.videoType}</div>
                                        </div>
                                    </Link>
                                )
                            })
                        }


                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile