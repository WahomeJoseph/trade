import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { apiSlice } from '../api/SliceApi.js'
import authReducer from '../features/auth/authSlice.js'
import shopReducer from '../features/shop/ShopApi.js'

const store = configureStore ({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        shop: shopReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)
export default store