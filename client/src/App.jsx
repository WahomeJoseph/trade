/* eslint-disable no-unused-vars */
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Nav from "./pages/Auth/Nav.jsx";
import "./App.css";
import { Login } from "./pages/Auth/Login.jsx";
import { Register } from "./pages/Auth/Register.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { Profile } from "./pages/User/Profile.jsx";
import { AdminRoute } from "./components/AdminRoute.jsx";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Nav />

      <Routes>
        <Route path="/" element={<ProtectedRoute/>}>
          <Route path="profile" element={<Profile/>} />
        </Route>

        <Route path="/login" element={Login} />
        <Route path="/register" element={Register} />

        {/* Admin */}
        <Route path="/admin" element={<AdminRoute/>}></Route>
      </Routes>
      <main>
        <Outlet />
      </main>
    </Router>
  );
};

export default App;
