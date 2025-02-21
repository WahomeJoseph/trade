/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/features/auth/AuthSlice.js";
import { useProfileMutation } from "../../redux/api/UsersApi";
// import { Loader } from "../../components/Loader.jsx";

export const Profile = () => {
    const [username, setuserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const { userInfo } = useSelector((state) => state.auth)
    const [updateProfile, { isLoading }] = useProfileMutation()

    useEffect(() => {
        setuserName(userInfo.username)
        setEmail(userInfo.email)
    }, [userInfo.username, userInfo.email]);

    const dispatch = useDispatch()

    const handleUpdate = async (e) => {
        e.prevent()
        if (password !== password) {
            toast.error('Password must match!')
        } else {
            try {
                const res = await updateProfile({ _id: userInfo.id, username, email, password }).unwrap()
                dispatch(setCredentials({ ...res }))
                toast.success('Profile updated successfully!')
            } catch (error) {
                toast.error('Profile update failed!', error.message)
            }
        }
    }

    return (
        <div className="container mx-auto p-4 mt-40">
            <div className="flex justify-center items-center md:flex md:space-x-4">
                <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

                <form onSubmit={handleUpdate} className="w-full md:w-1/2">
                    <div className="mb-4">
                        <label htmlFor="" className='block text-white mb-2'>Username:</label>
                        <input type="text" value={username} onChange={(e) => setuserName(e.target.value)} placeholder='username' className='form-input p-4 rounded-sm w-full' />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="" className='block text-white mb-2'>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email address' className='form-input p-4 rounded-sm w-full' />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="" className='block text-white mb-2'>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' className='form-input p-4 rounded-sm w-full' />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="" className='block text-white mb-2'>Confirm Password:</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='confirm password' className='form-input p-4 rounded-sm w-full' />
                    </div>

                    <div className="flex justify-between items-center p-4">
                        <button className='bg-transparent text-white px-4 py-2 rounded-sm my-4 hover:bg-red-600'>Update</button>
                        <Link to='/user-orders' className='bg-transparent text-white px-4 py-2 rounded-sm my-4 hover:bg-red-600'>My Orders</Link>
                    </div>
                </form>
            </div>


        </div>
    )
}