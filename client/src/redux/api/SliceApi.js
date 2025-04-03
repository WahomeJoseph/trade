import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../features/Constants.js'
import { logout } from '../features/auth/authSlice.js'

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState()?.auth?.userInfo?.token ||
            localStorage.getItem('token') ||
            getState()?.auth?.userToken
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    
    if (result?.error?.status === 401) {
      api.dispatch(logout()); 
      window.location.href = '/login';
    }
    return result;
  };

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User', 'Products', 'Order', 'Category'],
    endpoints: () => ({})
})