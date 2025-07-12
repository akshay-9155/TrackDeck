import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setAccessToken: (state, action) => {
      state.user = {...state.user, accessToken: action.payload}
    }
  },
});

export const { setUser, logoutUser, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
