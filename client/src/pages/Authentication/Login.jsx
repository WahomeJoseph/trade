/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../redux/api/UsersApi';
import { Loader } from '../../components/Loader';
import { toast } from 'react-hot-toast';
import { setCredentials } from "../../redux/features/auth/AuthSlice";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const result = await login({ email, password }).unwrap();
            console.log('Login Successful!', result);
            dispatch(setCredentials(result));
            toast.success('Login successful');
            navigate(redirect);
        } catch (error) {
            console.log('Login Failed!', error);
            toast.error('Invalid credentials', error?.data?.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-cover bg-center">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <section className="relative mx-4 p-6 bg-gray-900 bg-opacity-80 rounded-lg shadow-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                <span className="block text-white text-center text-2xl md:text-3xl italic font-semibold mb-4">
                    Welcome Back to <strong className="text-[#7231ff] not-italic">Walevi Liquor Store 🍻 🍾</strong>.
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl text-white text-center font-bold mb-4">Log In</h2>
                <form onSubmit={handleLogin} className="space-y-5 p-3">
                    <div>
                        <label htmlFor="email" className="block text-lg font-semibold text-white">Email Address:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            className="mt-1 p-3 text-white border rounded-sm w-full border-gray-100 outline-none focus:outline-[#7231ff]"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-lg font-semibold  text-white">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="mt-1 p-3 text-white border rounded-sm w-full border-gray-100 outline-none focus:ring-[#7231ff]"
                        />
                    </div>

                    <button
                        disabled={isLoading}
                        className="w-1/2 py-3 text-lg justify-center text-white border border-gray-100 mt-3 rounded-sm hover:border-[#7231ff] focus:outline-none">
                        {isLoading ? 'Signing In...' : 'Log In'}
                    </button>
                    {isLoading && <Loader />}
                </form>
                <div className="mt-4 text-left p-4">
                    <span className="text-lg tracking-wide text-white">
                        Have no Account?{' '}
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-[#7231ff] hover:text-white">
                            Register
                        </Link>
                    </span>
                </div>
            </section>
        </div>
    );
};
