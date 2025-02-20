/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../../redux/api/UsersApi'
import { Loader } from '../../components/Loader'
import { toast } from 'react-toastify'
import { setCredentials } from "../../redux/features/auth/AuthSlice";

export const Login = () => {
    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()
    const { userInfo } = useSelector((state) => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const result = await login({ email, password }).unwrap()
            console.log('Login Successful!', result)
            dispatch(setCredentials(result))
            toast.success('Login successful')
            navigate(redirect)
        } catch (error) {
            console.log('Login Failed!', error)
            toast.error('Invalid credentials', error?.data?.message)
        }
    }

    return (
        <div className='flex bg-cover items-center justify-center bg-center h-screen'>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <section className='relative mx-4 md:pt-12 items-center flex-flex-wrap opacity-80 md:mt-20 z-index-10'>
                <span className='block text-gray-100 text-center text-2xl italic md:text-3xl font-semi-bold'>Welcome Back to <strong className='text-[#7231ff] bg-gray-900 p-2 not-italic'> Walevi Liqour Store 🍻 🥃 🍾 </strong>.</span>
                <form onSubmit={handleLogin} className='space-y-4 bg-gray-900 p-8 rounded-sm'>
                <h2 className="text-[2rem] p-4 text-white font-bold">Log In</h2>
                    <div className='my-2'>
                    {/* sm:flex sm:flex-col sm:flex-wrap sm:flex-grow-1 sm:mx-auto sm:mr-5 bg-gray-900 p-8 rounded-md shadow-sm shadow-[#7231ff] sm:w-[40rem] */}
                        <label htmlFor="email" className='block text-lg font-bold text-white'> Email Address:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' className='mt-1 p-4 text-white border rounded-sm w-full border border-[#7231ff] outline-none focus:outline-[#7231ff]' />
                    </div>
                    <div className='my-2'>
                        <label htmlFor="password" className='block text-xl font-semibold text-white'>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='mt-1 p-4 text-white border rounded-sm w-full border border-[#7231ff] outline-none focus:outline-[#7231ff]' />
                    </div>
                    <button disabled={isLoading} className='w-1/4 text-white border px-4 py-2 cursor-pointer hover:border-[#7231ff] rounded-sm my-4'>{isLoading ? 'Signing In...' : 'Log In'}</button>
                    {isLoading && <Loader />}
                </form>

                <div className='mt-4'>
                    <span className='text-white text-xl'>Have no Account? {''}
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className='text-white hover:text-[#7231ff]'>Register</Link>
                    </span>
                </div>
            </section>
        </div>
    )
}
