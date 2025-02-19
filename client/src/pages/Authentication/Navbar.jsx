/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import { logout } from "../../redux/features/auth/AuthSlice.js";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../../redux/api/UsersApi.js";
import { useSelector, useDispatch } from "react-redux";

export const Navigation = () => {
  // hooks for dropdown menu and sidebar
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

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
      dispatch(logout())
      toast.success('Logging Out Successful')
      navigate('/login')
    } catch (error) {
      console.error(error);
      toast.error('Logout Failed!')
    }
  }
  
  return (
    <div id="nav-container" style={{ zIndex: 999 }} className={`${showSidebar ? "visible" : "flex-col"} xl:flex lg:flex visible flex-col px-2 py-8 justify-between text-gray-100 bg-black hover:w-[20%] h-[100vh] fixed`}>
      <div className="flex flex-col justify-center sm:w-full sm:max-w-[12rem] space-y-2">
        <Link
          to="/"
          className="flex items-center p-2 transition-transform hover:text-[#7231ff] hover:translate-x-2">
          <AiOutlineHome className="mr-2 mt-[3rem]" size={24} />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>
        </Link>

        <Link
          to="/shop"
          className="flex items-center p-2 transition-transform hover:text-[#7231ff] hover:translate-x-2">
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={24} />
          <span className="hidden nav-item-name mt-[3rem] ">SHOP</span>
        </Link>

        <Link
          to="/favourites"
          className="flex items-center p-2 transition-transform hover:text-[#7231ff] hover:translate-x-2">
          <FaHeart className="mr-2 mt-[3rem]" size={24} />
          <span className="hidden nav-item-name mt-[3rem] ">FAVS</span>
        </Link>

        <Link
          to="/cart"
          className="flex items-center p-2 transition-transform hover:text-[#7231ff] hover:translate-x-2">
          <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={24} />
          <span className="hidden nav-item-name mt-[3rem] ">CART</span>
        </Link>
      </div>

      <div className="relative">
        <button onClick={toggleDropdown} className="flex sm:mt-[18rem] sm:p-1 md:mt-0 md:p-0 items-center text-xl text-gray-300 focus:outline-none">
          {userInfo ? (
            <span className="text-white">{userInfo.username}</span>
          ) : (
            <></>
          )}
          {userInfo && <IoMdArrowDropdown />}
        </button>

        {dropdownOpen && userInfo && (
          <ul className={`absolute right-0 mt-2 mr-14 rounded-sm space-y-2 bg-white border border-[#7231ff] text-black ${!userInfo.isAdmin ? '-top-20' : '-top-80'}`}>
            {userInfo.isAdmin && (
              <>
                <li><Link to='/admin/dashboard' className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link></li>
                <li><Link to='/admin/orders' className="block px-4 py-2 hover:bg-gray-100">Orders</Link></li>
                <li><Link to='/admin/products' className="block px-4 py-2 hover:bg-gray-100">Products</Link></li>
                <li><Link to='/admin/category' className="block px-4 py-2 hover:bg-gray-100">Category</Link></li>
                <li><Link to='/admin/users' className="block px-4 py-2 hover:bg-gray-100">Users</Link></li>
              </>
            )}
            <li><Link to='/admin/profile' className="block px-4 py-2 hover:bg-gray-100">Profile</Link></li>
            <li><Link to='/login' onClick={logoutHandler} className="block px-4 py-2 hover:bg-gray-100">Logout</Link></li>
          </ul>
        )}
      </div>

      {/* when user even admin is logged in hide the login and register button */}
      {!userInfo && (
        <ul>
          {/* sign in */}
          <li>
            <Link
              to="/login"
              className="flex items-center transition-transform transform hover:translate-x-2">
              <AiOutlineLogin className="mr-2 mt-[2rem]" size={24} />
              <span className="hidden nav-item-name mt-[2rem]">Sign In</span>
            </Link>
          </li>
          {/* sign up */}
          <li className="flex gap-4">
            <Link
              to="/register"
              className="flex items-center transition-transform transform mb-4 hover:translate-x-2">
              <AiOutlineUserAdd className="mr-2 mt-[2rem]" size={24} />
              <span className="hidden nav-item-name mt-[2rem]">Sign Up</span>
            </Link>
          </li>
        </ul>
      )}

    </div>
  );
};
