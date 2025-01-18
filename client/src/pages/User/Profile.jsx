/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/features/auth/AuthSlice.js";
import { userProfileMutation } from "../../redux/api/UsersApi";
import { Loader } from "../../components/Loader.jsx";

export const Profile = () => {
    const [username, setuserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const {userInfo} = useSelector((state) => state.auth)
    const [updateProfile, { isLoading }] = userProfileMutation()

    useEffect(() => {
        setuserName(userInfo.username)
        setEmail(userInfo.email)
    }, [userInfo.username, userInfo.email]);

    const dispatch = useDispatch()

    return (
        <div className="container mx-auto p-4 mt-40">
            <div className="flex justify-center items-center md:flex md:space-x-4">
                <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

                <form action="">
                    <div className="mb-4">
                        <label htmlFor="" className='block text-white mb-2'>Username</label>
                        <input type="text" value={username} onChange={(e) => setuserName(e.target.value)} placeholder='username' className='form-input p-4 rounded-sm w-full' />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="" className='block text-white mb-2'>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email address' className='form-input p-4 rounded-sm w-full' />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="" className='block text-white mb-2'>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' className='form-input p-4 rounded-sm w-full' />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="" className='block text-white mb-2'>Confirm Password</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='confirm password' className='form-input p-4 rounded-sm w-full' />
                    </div>

                    <div className="flex justify-between items-center p-4">
                       <button className='bg-transparent text-white px-4 py-2 rounded-sm my-4 hover:bg-red-600'>Update</button>
                       <Link to='/user-orders' className='bg-transparent text-white px-4 py-2 rounded-sm my-4 hover:bg-red-600'></Link>
                    </div>
                </form>
            </div>
            
        </div>
    )
}