/* eslint-disable no-unused-vars */
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Nav from "../Auth/Nav";

export const AdminRoute = () => {
    const {userInfo} = useSelector((state) => state.auth)
    return userInfo && userInfo.isAdmin ? <Outlet/> : <Navigate to="/login" replace/>
}