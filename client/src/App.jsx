/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import Nav from './pages/Auth/Nav'
import './App.css'

const App = () => {
  return (
    <Router>
    <ToastContainer/>
    <Nav/>
    <Routes>    
    </Routes>
    <main>
      <Outlet/>
    </main>
    </Router>
  )
}

export default App
