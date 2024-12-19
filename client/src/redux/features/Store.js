// configure redux middleware
import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query/react'
import { apiSlice } from '../api/SliceApi'

const store = configureStore ({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().cocat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)
export default store