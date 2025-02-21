/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Loader } from '../../components/Loader'
import { useRegisterMutation } from '../../redux/api/UsersApi.js'
import { setCredentials } from '../../redux/features/auth/AuthSlice.js'

export const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [register, { isLoading }] = useRegisterMutation()
    const { userInfo } = useSelector((state) => state.auth)
    const { search } = useLocation()
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

        if (!username || !email) {
            toast.error('All inputs are required')
            isLoading(false)
        }
        if (password !== confirmPassword) {
            toast.error('Password must match!')
        }
        else {
            try {
                const result = await register({ username, email, password }).unwrap()
                dispatch(setCredentials(result))
                toast.success('Registration successful')
                navigate('/login')
            } catch (error) {
                console.log(error);
                toast.error('Failed to Register Account!')
            }
        }
    }
    
    return (
        <div className='flex bg-cover bg-center h-screen'>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <section className='md:pl-80 sm:pl-20 pt-2 items-center bg-black flex-flex-wrap opacity-80 mt-12 z-index-10'>
                <span className='text-white text-center text-3xl italic font-semi-bold'>Welcome To<strong className='text-[#7231ff] not-italic'> Walevi Liqour Store 🍻 🥃 🍾 </strong>.</span>
                <h2 className="text-4xl p-4 text-white text-center font-bold">Create New Account</h2>
                <form onSubmit={handleRegister} className='container p-8 rounded-md shadow-sm shadow-[#7231ff] w-[40rem]'>
                    <div className='my-2'>
                        <label htmlFor="username" className='block text-xl font-semibold text-white'>Username:</label>
                        <input type="name" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' className='mt-1 p-4 text-white border rounded-sm w-full border border-[#7231ff] outline-none focus:outline-[#7231ff]' />
                    </div>
                    <div className='my-2'>
                        <label htmlFor="email" className='block text-xl font-semibold text-white'>Email Address:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' className='mt-1 p-4 text-white border rounded-sm w-full border border-[#7231ff] outline-none focus:outline-[#7231ff]' />
                    </div>
                    <div className='my-2'>
                        <label htmlFor="password" className='block text-xl font-semibold text-white'>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='mt-1 p-4 text-white border rounded-sm w-full border border-[#7231ff] outline-none focus:outline-[#7231ff]' />
                    </div>
                    <div className='my-2'>
                        <label htmlFor="password" className='block text-xl font-semibold text-white'>Confirm Password:</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='confirm Password' className='mt-1 p-4 text-white border rounded-sm w-full border border-[#7231ff] outline-none focus:outline-[#7231ff]' />
                    </div>

                    <button disabled={isLoading} className='text-white border px-4 py-2 cursor-pointer hover:border-[#7231ff] rounded-sm my-4'>{isLoading ? 'Signing Up...' : 'Register'}</button>
                    {isLoading && <Loader />}
                </form>

                <div className='mt-4'>
                    <span className='text-white text-xl'>Have an Account? {''}
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className='text-white hover:text-[#7231ff]'>Log In</Link>
                    </span>
                </div>
            </section>
        </div>
    )
}