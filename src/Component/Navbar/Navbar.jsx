import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import profile_icon from '../../assets/jack.png'

const Navbar = ({setSidebar}) => {
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  return (
    <div className='fixed z-50 w-full'>
      <nav className="flex-div
       py-[6px] justify-between">
        <div className="nav-left flex-div pl-5">

        <i onClick={() => setShowRightSidebar(!showRightSidebar)} 
        className="fa-solid fa-bars text-xl lg:hidden cursor-pointer
        hover:text-gray-800"></i>

            <img className='menu-icon max-xl:hidden' onClick={() => setSidebar(prev => prev===false? true: false)}
             src={menu_icon} alt="" />

           <Link to='/'> <img className='logo
            ' src={logo} alt="" /> </Link>
        </div>

        <div className="nav-middle flex-div w-[40%] flex flex-row justify-center
        py-1 max-lg:hidden">
            <input type="text" placeholder='search'
            className='search-input-nav w-[90%]' />
            <img src={search_icon} alt=""
            className='h-5' />
        </div>

        <div className="nav-right flex-div pr-3">
            <div className="flex flex-row max-lg:hidden">
            <img src={upload_icon} alt="" />
            <img src={more_icon} alt="" />
            <img src={notification_icon} alt="" />
            </div>
            <img src={profile_icon} alt=""
            className='profile' />
        </div>
      </nav>

      {showRightSidebar && (

        <div id="right-sidebar"
        className="bg-white border-gray-100 border-solid flex flex-col justify-start lg:hidden 
        h-[100vh] absolute right-0 top-[57px] border-l-2 px-8 py-7">
  
  
          <div className="nav-middle flex-div w-[100%] flex flex-row justify-center
          py-1">
              <input type="text" placeholder='search'
              className='bg-transparent px-4' />
              <img src={search_icon} alt=""
              className='h-5 pr-3' />
          </div>
  
          <div className="flex flex-row justify-center mt-3 gap-2" id='sidebar-logos'>
              <img src={upload_icon} alt="" />
              <img src={more_icon} alt="" />
              <img src={notification_icon} alt="" />
              </div>
  
        </div>
      )}
    </div>
  )
}

export default Navbar
