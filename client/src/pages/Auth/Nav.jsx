/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react';
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import './Nav.css'
import { useLoginMutation } from '../../redux/api/SliceApi.js'
import {logout} from '../../redux/features/auth/AuthSlice.js'
import { useSelector, useDispatch } from 'react-redux';
const Nav = () => {
  // hooks for dropdown menu
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showSidebar, setShowSidebar] =  useState(false)

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
    <div id="nav-container" style={{ zIndex: 999 }} className={`${showSidebar ? "hidden" : 'flex'} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`}>
      <div className='flex flex-col justify-centre space-y-4'>
        <Link to='/' className='flex items-centre transition-transform transform hover: translate-x-2'>
        <AiOutlineHome className='mr-2 mt-[3rem]' size={24}/>
        <span className='hidden nav-item-name mt-[3rem]'>HOME</span>
        </Link>

        <Link to='/shop' className='flex items-centre transition-transform transform hover: translate-x-2'>
        <AiOutlineShopping className='mr-2 mt-[3rem]' size={24}/>
        <span className='hidden nav-item-name mt-[3rem]'>SHOP</span>
        </Link>

        <Link to='/favourites' className='flex items-centre transition-transform transform hover: translate-x-2'>
        <FaHeart className='mr-2 mt-[3rem]' size={24}/>
        <span className='hidden nav-item-name mt-[3rem]'>FAVS</span>
        </Link>

        <Link to='/cart' className='flex items-centre transition-transform transform hover: translate-x-2'>
        <AiOutlineShoppingCart className='mr-2 mt-[3rem]' size={24}/>
        <span className='hidden nav-item-name mt-[3rem]'>CART</span>
        </Link>
      </div>

      <div className="relative"></div>

      <ul>
        {/* sign in */}
        <li>
        <Link to='/login' className='flex items-centre transition-transform transform hover: translate-x-2'>
        <AiOutlineLogin className='mr-2 mt-[3rem]' size={24}/>
        <span className='hidden nav-item-name mt-[3rem]'>Sign in</span>
        </Link>
        </li>
        {/* sign up */}
        <li>
        <Link to='/register' className='flex items-centre transition-transform transform hover: translate-x-2'>
        <AiOutlineUserAdd className='mr-2 mt-[3rem]' size={24}/>
        <span className='hidden nav-item-name mt-[3rem]'>Sign up</span>
        </Link>
        </li>
      </ul>

    </div>
  )
}

export default Nav
