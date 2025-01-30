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
    const {userInfo} = useSelector((state) => state.auth)

    const {search} = useLocation()
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
            const result = await login({email, password}).unwrap()
            dispatch(setCredentials(result))
            toast.success('Login successful')
        } catch (error) {
            console.log(error)
            toast.error('Invalid credentials')
    }
  }

    return (
        <div className='flex bg-cover bg-center h-screen'>
            {/* Background Video */}
            <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
                <source src="/loginbg.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <section className='pl-80 pt-12 items-center flex-flex-wrap opacity-80 mt-20 z-index-10'>
            <span className='text-white text-center text-3xl italic font-semi-bold'>Welcome Back to <strong className='text-[#7231ff] not-italic'> Walevi Liqour Store 🍻 🥃 🍾 </strong>.</span>
                    <h2 className="text-2xl p-4 text-white text-justify font-semi-bold">Log In</h2>
                    <form onSubmit={handleLogin} className='bg-[#000000] p-8 rounded-md shadow-sm shadow-[#7231ff] w-[40rem]'>
                        <div className='my-2'>
                            <label htmlFor="email" className='block text-xl font-semibold text-white'> Email Address:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' className='mt-1 p-4 text-white border rounded-sm w-full border border-[#7231ff] outline-none focus:outline-[#7231ff]'/>
                        </div>
                        <div className='my-2'>
                            <label htmlFor="password" className='block text-xl font-semibold text-white'>Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='mt-1 p-4 text-white border rounded-sm w-full border border-[#7231ff] outline-none focus:outline-[#7231ff]'/>
                        </div>
                        <button disabled={isLoading} className='text-white border px-4 py-2 cursor-pointer hover:border-[#7231ff] rounded-sm my-4'>{isLoading ? 'Signing Up...' : 'Log In'}</button>
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
