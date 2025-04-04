import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../features/Constants.js'

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
        const token  = localStorage.getItem('accessToken')
        console.log('Auth Tokens', token); 
        console.log('Auth Headers', headers)

        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Users', 'Products', 'Orders', 'Category'],
    endpoints: () => ({})
})