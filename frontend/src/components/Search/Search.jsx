import React from 'react'
import "./Search.css"
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

function Search(props) {

      const [searcheText, setSearchText] = useState("");

      // Search functionality
      const handleSearch = async () => {    
        await axios.get("http://localhost:5000/api/allvideos")
          .then((res) => {
            const filteredVideo = res.data.videos.filter((video) => video.title.toLowerCase().includes(searcheText.toLowerCase()))
            props.filterFunction(filteredVideo)
          })
          .catch((err) => {
            console.log(err)
          })

      }

    return (
        <>
            <div className="navbar-searchBox">
                <input className='navbar_searchBoxInput' type="text" placeholder='serach' onChange={(e) => setSearchText(e.target.value)} />
                <div className="navbar_searchIconBox" onClick={handleSearch} ><SearchIcon /></div>
            </div>
        </>
    )
}

export default Search