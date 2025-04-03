import { createSlice } from '@reduxjs/toolkit';

const validateUserInfo = (userInfo) => {
  try {
    const parsed = JSON.parse(userInfo);
    return parsed?.token && parsed?.role ? parsed : null;
  } catch {
    return null;
  }
};

const initialState = {
  userInfo: validateUserInfo(localStorage.getItem('userInfo')),
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { userInfo, token } = action.payload;
      state.userInfo = userInfo;
      state.token = token;
      state.isAuthenticated = true;

      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('token', token);
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentUser = (state) => state.auth.userInfo;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsAdmin = (state) => state.auth.userInfo?.role === 'admin';

export default authSlice.reducer;