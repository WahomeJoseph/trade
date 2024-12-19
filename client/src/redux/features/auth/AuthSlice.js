import {createSlice} from '@reduxjs/toolkit'

// obj
const initialState ={
    userInfo: localStorage.getItem('userInfo')
     ? JSON.parse(localStorage.getItem('userInfo'))
     : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
})