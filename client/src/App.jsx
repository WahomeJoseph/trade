/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { Navigation } from './pages/Authentication/Navbar.jsx'
import { Login } from './pages/Authentication/Login.jsx'
import { Register } from './pages/Authentication/Register.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import { Profile } from './pages/Users/Profile.jsx'
import { AdminRoute } from './pages/Admin/AdminRoute.jsx'
import { Category } from './pages/Admin/Category.jsx'
import { Orders } from './pages/Admin/Orders.jsx'
import { ProductUpdate } from './pages/Admin/ProductUpdate.jsx'
import { Dashboard } from './pages/Admin/Dashboard.jsx'
import { Users } from './pages/Admin/Users.jsx'
import { Hero } from './pages/hero/Hero.jsx'
import { Products } from './pages/Admin/Products.jsx'
import { AddProduct } from './pages/Admin/AddProduct.jsx'
import { Cart } from './pages/cart/Cart.jsx'
import { Shop } from './pages/shop/Shop.jsx'

const App = () => {
  return (
    <Router>
      <Toaster />
      <Navigation />

      <Routes>

        {/* global routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Hero />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/shop' element={<Shop />} />

        {/* protected routes */}
        <Route path='/' element={<ProtectedRoute />}>
          <Route path='profile' element={<Profile />} />
          <Route path='orders' element={<Orders />} />
        </Route>

        {/* admin routes */}
        <Route path='/admin' element={<AdminRoute />}>
          <Route path='category' element={<Category />} />
          <Route path='addproduct' element={<AddProduct />} />
          <Route path='products' element={<Products />} />
          <Route path='users' element={<Users />} />
          <Route path='update' element={<ProductUpdate />} />
          <Route path='dashboard' element={<Dashboard />} />
        </Route>

      </Routes>
      <main>
        <Outlet />
      </main>
    </Router>
  )
}

export default App
