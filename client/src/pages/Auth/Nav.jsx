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
    <div>Nav</div>
  )
}

export default Nav
