
import React, { useState } from 'react'
import './Home.css'
import SideNavbar from '../../Components/SideNavbar/SideNavbar'
import HomePage from '../../Components/HomePage/HomePage'

function Home({sideNavbar}) {

  return (
    <div className='home'>
        <SideNavbar sideNavbar={sideNavbar}/>
        <HomePage sideNavbar={sideNavbar}/>
    </div>
  )
}

export default Home;