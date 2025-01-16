/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../../redux/api/UsersApi'
import { Loader } from '../../components/Loader'

export const Login = () => {
    const [data, setData] = useState('')

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

    return (
        <div>
            <section className='pl-[10rem flex-flex-wrap'>
                <div className='mr-16 mt-20'>
                    <h1 className="text-2xl font-semi-bold">Log In</h1>

                    <form className='container w-[40rem]'>
                        <div className='my-2'>
                            <label htmlFor="email" className='block text-sm font-semibold text-white'> Email Address</label>
                            <input type="email" value={data} onChange={(e) => setData(e.target.value)} className='mt-1 p-2 border rounded-sm w-full'/>
                        </div>
                        <div className='my-2'>
                            <label htmlFor="password" className='block text-sm font-semibold text-white'>Password</label>
                            <input type="email" value={data} onChange={(e) => setData(e.target.value)} className='mt-1 p-2 border rounded-sm w-full'/>
                        </div>

                        <button disabled={isLoading} className='text-white px-4 py-2 rounded-sm my-4'>{isLoading ? 'Signing In...' : 'Log In'}</button>
                        {isLoading && <Loader />}
                    </form>

                    <div className='mt-4'>
                        <span className='text-white'>New User? {''}
                            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className='text-white hover:text-underline'>Register</Link>
                        </span>
                    </div>
                </div>
            </section>
        </div>
    )
}
