/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
import { Navigation } from "./pages/Authentication/Navbar.jsx";
import { Login } from "./pages/Authentication/Login.jsx";
import { Register } from "./pages/Authentication/Register.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { Profile } from "./pages/Users/Profile.jsx";
import { AdminRoute } from "./pages/Admin/AdminRoute.jsx";
import Category from "./pages/Admin/Category.jsx"
import UsersPage from "./pages/Admin/UsersPage.jsx"
import { Orders } from "./pages/Admin/Orders.jsx"
import { Product } from "./pages/Admin/Product.jsx";

const App = () => {
  return (
    <Router>
      {/* <ToastContainer /> */}
      <Navigation />

      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />} />
        </Route>
        {/* authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* admin routes */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="users" element={<UsersPage />} />
          <Route path="category" element={<Category />} />
          <Route path="products" element={<Product />} />
          <Route path="orders" element={<Orders />} />
        </Route>

      </Routes>
      <main>
        <Outlet />
      </main>
    </Router>
  );
};

export default App;
