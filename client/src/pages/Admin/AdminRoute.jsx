/* eslint-disable no-unused-vars */
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const AdminRoute = () => {
    const {userInfo} = useSelector((state) => state.auth)
    return userInfo && userInfo.isAdmin ? <Outlet/> : <Navigate to="/login" replace/>
}