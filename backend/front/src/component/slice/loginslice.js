import axios from 'axios';
import {PROXY} from '../Constants/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';


export const fetchUserInfo = createAsyncThunk(
  'login/fetchUserInfo',
  async ({ username, password }, thunkAPI) => {
    try {
      console.log('Attempting login with:', { username, password });
      const response = await axios.post(PROXY + '/api/token/', { username, password });
      console.log('Full Login response:', response.data);
      console.log('Token fields in response:', {
        access: response.data.access,
        refresh: response.data.refresh,
        token: response.data.token
      });
      return response.data; 
    } catch (error) {
      console.error('Login error response:', error.response?.data);
      console.error('Login error status:', error.response?.status);
      return thunkAPI.rejectWithValue(error.response?.data?.detail || 'Login failed');
    }
  }
);
// const register = useSelector((state) => state.register);

const loginSlice = createSlice({
  
  name: 'login',
  initialState: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
    error: null,
    loading: false,
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        console.log('Storing userInfo in Redux:', action.payload);
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
        console.log('Stored in localStorage:', JSON.parse(localStorage.getItem('userInfo')));
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.userInfo = null;
        state.error = action.payload || action.error.message;
        localStorage.removeItem('userInfo');
      });
  },
});

export const { logout, pending, fulfilled, rejected } = loginSlice.actions;
export default loginSlice.reducer;