/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../../redux/api/UsersApi'
import { Loader } from '../../components/Loader'
import { toast } from 'react-hot-toast'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { FaEye, FaEyeSlash } from "react-icons/fa"

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

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

            dispatch(setCredentials({
                user: result.user,
                token: result.token,
                refreshToken: result.refreshToken
            }))

            toast.success('Login successful')
            navigate(redirect)
        } catch (error) {
            console.log('Login Failed!', error)
            toast.error(error?.data?.message || 'Invalid credentials')
        }
    }

    return (
        <div className='relative flex items-center justify-center min-h-screen bg-cover bg-center'>
            <div className='absolute inset-0 bg-black bg-opacity-50'></div>
            <section className='relative md:mx-[10rem] p-5 bg-transparent shadow-[0px_0px_20px_0px_rgba(165,_39,_255,_0.48)] bg-opacity-80 rounded-sm sm:mx-10 md:w-full lg:max-w-xl xl:max-w-2xl'>
                <span className='block text-white text-center text-2xl font-semi-bold'>
                    Welcome Back to <strong className='text-[#7231ff] not-italic'>Core Tech Store</strong>.
                </span>
                <h2 className='text-2xl text-white text-center font-bold p-2'>Log In</h2>
                <form onSubmit={handleLogin} className='space-y-4 p-3'>
                    <article className='space-y-2'>
                        <label htmlFor='email' className='block text-xl font-semi-bold text-gray-100'>Email Address:</label>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email Address'
                            className='p-4 text-gray-100 bg-[#101011] border border-gray-900 rounded-sm w-full outline-none'
                        />
                    </article>
                    <article className='space-y-2'>
                        <label htmlFor='password' className='block text-xl font-semi-bold text-gray-100'>Password:</label>
                        <div className='relative'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Password'
                                className='p-4 text-gray-100 bg-[#101011] border border-gray-900 rounded-sm w-full outline-none'
                            />
                            <span onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer'>
                                {showPassword ? <FaEyeSlash size={32} /> : <FaEye size={24} />}
                            </span>
                        </div>
                    </article>

                    <button
                        disabled={isLoading}
                        className='w-full px-10 cursor-pointer py-4 bg-transparent border border-gray-900 bg-gray-900 mt-5 mb-2 text-gray-100 hover:shadow-[0px_0px_20px_0px_rgba(165,_39,_255,_0.48)] hover:outline-none rounded-sm text-lg font-bold'>
                        {isLoading ? 'Signing In...' : 'Log In'}
                    </button>
                    {isLoading && <Loader />}
                </form>
                <div className='mt-1 text-left p-4'>
                    <span className='text-lg tracking-wide text-white'>
                        Have no Account?{' '}
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className='text-[#7231ff]'>
                            Register
                        </Link>
                    </span>
                </div>
            </section>
        </div>
    )
}
