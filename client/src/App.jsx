/* eslint-disable no-unused-vars */
import React from 'react'
import {Outlet} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import Nav from './pages/Auth/Nav'
import './App.css'

const App = () => {
  return (
    <>
    <ToastContainer/>
    <Nav/>
    <main>
      <Outlet/>
    </main>
    </>
  )
}

export default App
