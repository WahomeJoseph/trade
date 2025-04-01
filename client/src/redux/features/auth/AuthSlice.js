import { createSlice } from '@reduxjs/toolkit';

// Helper function to validate userInfo in localStorage
const validateUserInfo = (userInfo) => {
  try {
    const parsedUserInfo = JSON.parse(userInfo);
    return parsedUserInfo && typeof parsedUserInfo === 'object' ? parsedUserInfo : null;
  } catch {
    return null;
  }
};

const initialState = {
  userInfo: validateUserInfo(localStorage.getItem('userInfo')),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const userInfo = action.payload;
      state.userInfo = userInfo;

      localStorage.setItem('userInfo', JSON.stringify(userInfo));

      const expirationTime = new Date().getTime() + 60 * 60 * 1000;
      localStorage.setItem('expirationTime', expirationTime);
    },
    logout: (state) => {
      state.userInfo = null;

      localStorage.removeItem('userInfo');
      localStorage.removeItem('expirationTime');

      // Redirect to login page without reloading
      // (Use a redirect action or React Router in your component)
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;