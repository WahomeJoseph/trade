/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import {logout} from "../../redux/features/auth/AuthSlice.js";
import {useLogoutMutation} from "../../redux/api/UsersApi.js";
import { useSelector, useDispatch } from "react-redux";
export const Navigation = () => {
  // hooks for dropdown menu
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutApiCall = useLogoutMutation();

  // toggle the dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // open the sidebar
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // close the side bar...set to false
  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout)
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div id="nav-container" style={{ zIndex: 999 }} className={`${showSidebar ? "hidden" : "flex-col"} xl:flex lg:flex md:hidden sm:hidden flex-col px-2 py-8 justify-between text-white bg-black w-[4%] hidden shadow-sm shadow-[#7231ff] hover:border-r-[#7231ff] hover:w-[15%] h-[100vh] fixed`}>
      <div className="flex flex-col justify-centre space-y-2">
        <Link
          to="/"
          className="flex items-centre transition-transform transform hover:text-[#7231ff] hover:translate-x-2">
          <AiOutlineHome className="mr-2 mt-[3rem]" size={24} />
          <span className="hidden nav-item-name mt-[3rem] ">HOME</span>
        </Link>

        <Link
          to="/shop"
          className="flex items-centre transition-transform transform hover:text-[#7231ff] hover:translate-x-2">
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={24} />
          <span className="hidden nav-item-name mt-[3rem] ">SHOP</span>
        </Link>

        <Link
          to="/favourites"
          className="flex items-centre transition-transform transform hover:text-[#7231ff] hover:translate-x-2">
          <FaHeart className="mr-2 mt-[3rem]" size={24} />
          <span className="hidden nav-item-name mt-[3rem] ">FAVS</span>
        </Link>

        <Link
          to="/cart"
          className="flex items-centre transition-transform transform hover:text-[#7231ff] hover:translate-x-2">
          <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={24} />
          <span className="hidden nav-item-name mt-[3rem] ">CART</span>
        </Link>
      </div>

      <div className="relative">
        <button onClick={toggleDropdown} className="flex items-center text-gray-800 focus:outline-none">
          {userInfo ? (
            <span className="text-white">{userInfo.username}</span>
          ) : (
            <></>
          )}
          {userInfo && <IoMdArrowDropdown />}
        </button>

        {dropdownOpen && userInfo && (
          <ul className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-black ${!userInfo.isAdmin ? '-top-20' : '-top-80'}`}>
            {userInfo.isAdmin && (
              <>
              <li><Link to='/admin/dashboard' className="block px-4 py-2 hover:bg-gray">Dashboard</Link></li>
              <li><Link to='/admin/orders' className="block px-4 py-2 hover:bg-gray">Orders</Link></li>
              <li><Link to='/admin/products' className="block px-4 py-2 hover:bg-gray">Products</Link></li>
              <li><Link to='/admin/category' className="block px-4 py-2 hover:bg-gray">Category</Link></li>
              <li><Link to='/admin/duser' className="block px-4 py-2 hover:bg-gray">Users</Link></li>
              </>
              )}
              <li><Link to='/admin/profile' className="block px-4 py-2 hover:bg-gray">Profile</Link></li>
              <li><Link to='/admin/logout' onClick={logoutHandler} className="block px-4 py-2 hover:bg-gray">Logout</Link></li>
          </ul>
        )}
      </div>

      {/* when user is logged in hide the login and register button */}
      {!userInfo && (
        <ul>
        {/* sign in */}
        <li>
          <Link
            to="/login"
            className="flex items-centre transition-transform transform hover:translate-x-2">
            <AiOutlineLogin className="mr-2 mt-[2rem]" size={24} />
            <span className="hidden nav-item-name mt-[2rem]">Sign in</span>
          </Link>
        </li>
        {/* sign up */}
        <li className="flex gap-4">
          <Link
            to="/register"
            className="flex items-centre transition-transform transform mb-4 hover:translate-x-2">
            <AiOutlineUserAdd className="mr-2 mt-[2rem]" size={24} />
            <span className="hidden nav-item-name mt-[2rem]">Sign up</span>
          </Link>
        </li>
      </ul>
      )}
      
    </div>
  );
};
