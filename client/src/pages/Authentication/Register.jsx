/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Loader } from '../../components/Loader'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useRegisterMutation } from '../../redux/api/UsersApi.js'
import { setCredentials } from '../../redux/features/auth/AuthSlice.js'

export const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

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
    }, [navigate, redirect, userInfo])

    const handleRegister = async (e) => {
        e.preventDefault()

        if (!username || !email) {
            toast.error('All Inputs are Required!')
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
                console.log(error)
                toast.error('Failed to Register Account!')
            }
        }
    }

    return (
        <div className='relative flex items-center justify-center min-h-screen bg-cover bg-center'>
            <div className='absolute inset-0 bg-black bg-opacity-50'></div>
            <section className='relative md:mx-[10rem] sm:my-20 p-5 bg-transparent shadow-[0px_0px_20px_0px_rgba(165,_39,_255,_0.48)] bg-opacity-80 rounded-sm md:w-full lg:max-w-xl xl:max-w-2xl'>
                <span className='block text-white text-center text-2xl font-semi-bold'>
                    Welcome To <strong className='text-[#7231ff]'>Core Tech Store</strong>.
                </span>
                <h2 className='text-2xl text-white text-center font-bold p-2'>Create New Account</h2>
                <form onSubmit={handleRegister} className='space-y-4 p-3'>
                    <div className='space-y-2'>
                        <label htmlFor='username' className='block text-xl font-semi-bold text-white'>Username:</label>
                        <input type='name' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' className='p-4 text-gray-100 bg-[#101011] border border-gray-900 rounded-sm w-full outline-none' />
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor='email' className='block text-xl font-semi-bold text-white'>Email Address:</label>
                        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' className='p-4 text-gray-100 bg-[#101011] border border-gray-900 rounded-sm w-full outline-none' />
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor='password' className='block text-xl font-semi-bold text-white'>Password:</label>
                        <div className='relative'>
                            <input type={showPassword ? 'text' : 'password'} 
                            value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='p-4 text-gray-100 bg-[#101011] border border-gray-900 rounded-sm w-full outline-none' />

                            <span onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer'>
                                {showPassword ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
                            </span>
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor='password' className='block text-xl font-semi-bold text-white'>Confirm Password:</label>
                        <div className='relative'>
                            <input type={showPassword ? 'text' : 'password'} 
                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='confirm Password' className='p-4 text-gray-100 bg-[#101011] border border-gray-900 rounded-sm w-full outline-none' />
                            <span onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer'>
                                {showPassword ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
                            </span>
                        </div>
                    </div>

                    <button disabled={isLoading}
                        className='w-full px-10 cursor-pointer py-4 bg-transparent border border-gray-900 bg-gray-900 mt-5 mb-2 text-gray-100 hover:shadow-[0px_0px_20px_0px_rgba(165,_39,_255,_0.48)] hover:outline-none rounded-sm text-lg font-bold'>
                        {isLoading ? 'Signing Up...' : 'Register'}
                    </button>
                    {isLoading && <Loader />}
                </form>
                <div className='mt-1 text-left p-4'>
                    <span className='text-lg tracking-wide text-white'>
                        Have an Account? {''}
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className='text-[#7231ff]'>
                            Log In
                        </Link>
                    </span>
                </div>
            </section>
        </div>
    )
}