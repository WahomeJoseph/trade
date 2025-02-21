// import React from 'react'

// export const AdminMenu = () => {
//   return (
//     <div className='bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent text-[2rem] text-center tracking-wide uppercase font-bold bg-transparent mt-5 sm:w-full p-1'>Admin Panel</div>
//   )
// }
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { MdOutlineClose } from "react-icons/md";
import { RiMenu2Fill } from "react-icons/ri";

export const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // open and close the menu bar
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <button
        className={`${isMenuOpen ? 'top-7 right-2' : 'top-5 right-10'} bg-transparent fixed rounded-sm`}
        onClick={toggleMenu}>
        {isMenuOpen ? (
          <MdOutlineClose className='text-gray-100 font-bold' size={20} />
        ) : (
          <RiMenu2Fill className='bg-transparent text-gray-100 my-1 animate-bounce shadow-[0px_0px_20px_0px_rgba(165,_39,_255,_0.48)]' size={32} />
        )}
      </button>

      {isMenuOpen && (
        <section className='bg-gray-900 rounded-sm shadow-lg p-4 fixed right-7 top-10'>
          <ul className='space-y-2'>
            <li>
              <NavLink
                className='py-2 px-3 block mb-4 hover:bg-gray-800 rounded-sm'
                to='/admin/dashboard'
                style={({ isActive }) => ({
                  color: isActive ? 'greenyellow' : 'white',
                })}>
                Admin Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                className='py-2 px-3 block mb-4 hover:bg-gray-800 rounded-sm'
                to='/admin/categorylist'
                style={({ isActive }) => ({
                  color: isActive ? 'greenyellow' : 'white',
                })}>
                Create Category
              </NavLink>
            </li>
            <li>
              <NavLink
                className=' py-2 px-3 block mb-4 hover:bg-gray-800 rounded-sm'
                to='/admin/productlist'
                style={({ isActive }) => ({
                  color: isActive ? 'greenyellow' : 'white',
                })}>
                Create Product
              </NavLink>
            </li>
            <li>
              <NavLink
                className='py-2 px-3 block mb-4 hover:bg-gray-800 rounded-sm'
                to='/admin/allproductslist'
                style={({ isActive }) => ({
                  color: isActive ? 'greenyellow' : 'white',
                })}>
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink
                className=' py-2 px-3 block mb-4 hover:bg-gray-800 rounded-sm'
                to='/admin/userlist'
                style={({ isActive }) => ({
                  color: isActive ? 'greenyellow' : 'white',
                })}>
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                className=' py-2 px-3 block mb-4 hover:bg-gray-800 rounded-sm'
                to='/admin/orderlist'
                style={({ isActive }) => ({
                  color: isActive ? 'greenyellow' : 'white',
                })}>
                Manage Orders
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  )
}
