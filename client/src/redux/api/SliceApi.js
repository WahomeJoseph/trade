import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../features/Constants.js'

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL })

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User', 'Product', 'Order', 'Category'],
    endpoints: () => ({})
})