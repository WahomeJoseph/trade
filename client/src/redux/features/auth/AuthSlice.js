import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userInfo: localStorage.getItem("userInfo") && localStorage.getItem("userInfo") !== 'undefined'
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  token: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload.user
      state.token = action.payload.token

      localStorage.setItem("userInfo", JSON.stringify(action.payload))
      localStorage.setItem("accessToken", action.payload.token)

      const expirationTime = new Date().getTime() + 60 * 60 * 1000 //1hr
      localStorage.setItem("expirationTime", expirationTime)

      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      }

    },
    logout: (state) => {
      state.userInfo = null
      state.token = null
      state.refreshToken = null
      localStorage.removeItem("userInfo")
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("expirationTime")
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer