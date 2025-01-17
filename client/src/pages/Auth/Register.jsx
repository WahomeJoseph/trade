/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Loader } from '../../components/Loader'
import { useRegisterMutation } from '../../redux/api/UserApi.js'
import {setCredentials} from '../../redux/features/auth/AuthSlice.js' 

import { CiUser } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

export const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [register, { isLoading }] = useRegisterMutation()
    const [userInfo] = useSelector((state) => state.auth)
    const [search] = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo]);

    const handleRegister = async (e) => {
        e.preventDefault()

        if (username === '') {
            toast.error('Username cannot be empty!')
        }
        if (email === '') {
            toast.error('Email cannot be empty!')
        }
        if (password !== confirmPassword) {
            toast.error('Password must match!')
        } 
        else {
            try {
                const result = await register({username, email, password}).unwrap()
                dispatch(setCredentials(result))
                toast.success('Registration successful')
            } catch (error) {
                console.log(error);
                toast.error('Registration unsuccessful!')
            }
        }
        
    }
    return (
        <div>
            <section className='pl-[10rem flex-flex-wrap'>
                <div className='mr-16 mt-20'>
                    <h1 className="text-2xl font-semi-bold">Create New Account</h1>

                    <form onSubmit={handleRegister} className='container w-[40rem]'>
                    <div className='my-2'>
                            <label htmlFor="username" className='flex flex-row items-center space-x-2 text-sm font-semibold text-white'><CiUser />:Username</label>
                            <input type="name" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' className='mt-1 p-2 border rounded-sm w-full'/>
                        </div>
                        <div className='my-2'>
                            <label htmlFor="email" className='block text-sm font-semibold text-white'><MdOutlineMail />:Email Address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' className='mt-1 p-2 border rounded-sm w-full'/>
                        </div>
                        <div className='my-2'>
                            <label htmlFor="password" className='block text-sm font-semibold text-white'><RiLockPasswordLine />:Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='mt-1 p-2 border rounded-sm w-full'/>
                        </div>
                        <div className='my-2'>
                            <label htmlFor="password" className='block text-sm font-semibold text-white'><RiLockPasswordLine />:Confirm Password</label>
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='confirm Password' className='mt-1 p-2 border rounded-sm w-full'/>
                        </div>

                        <button disabled={isLoading} className='text-white px-4 py-2 rounded-sm my-4'>{isLoading ? 'Signing In...' : 'Log In'}</button>
                        {isLoading && <Loader />}
                    </form>

                    <div className='mt-4'>
                        <span className='text-white'>Have an Account? {''}
                            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className='text-white hover:text-underline'>Log In</Link>
                        </span>
                    </div>
                </div>
            </section>
        </div>
    )
}