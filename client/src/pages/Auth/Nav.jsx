/* eslint-disable no-unused-vars */
import React from 'react'
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Nav.css";
import { useSelector, useDispatch } from "react-redux";
const Nav = () => {
  // hooks for dropdown menu
  const [dropdownOpen, setDropdownOpen] = usestate(false)
  const [showSidebar, setShowsidebar] =  usestate(false)

  // toggle the dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen (!dropdownOpen)
  }

  // open the sidebar
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  // close the side bar...set to false
  const closeSidebar =() => {
    setShowSidebar(false)
  }
  return (
    <div id='nav-container' style={{zIndex: 999}} className={`${showSidebar ? "hidden" : 'flex'} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`}>
      <div className='flex flex-col justify-centre space-y-4'>
        <Link to='/' className='flex items-centre transition-transform transform hover: translate-x-2'>
        <AiOutlineHome className='mr-2 mt'/>
        </Link>
      </div>
    </div>
  )
}

export default Nav
