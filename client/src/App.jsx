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

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Nav />

      <Routes>
        <Route path="/login" element={Login} />
      </Routes>
      <main>
        <Outlet />
      </main>
    </Router>
  );
};

export default App;
