import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { PROXY } from "../Constants/api";



export const createOrder = createAsyncThunk(
  'orderslice/createOrder',
  async (orderItems, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const userInfo = state.login?.userInfo;
      
      console.log('=== Order Creation Debug ===');
      console.log('Full userInfo object:', userInfo);
      console.log('userInfo keys:', userInfo ? Object.keys(userInfo) : 'null');
      
      if (!userInfo) {
        return rejectWithValue({ detail: 'Authentication required. Please log in again.' });
      }
      
      // Log all possible token fields
      console.log('Possible token fields:');
      console.log('  access:', userInfo.access);
      console.log('  refresh:', userInfo.refresh);
      console.log('  token:', userInfo.token);
      
      // Try to get token from different possible locations
      const token = userInfo.access || userInfo.token || userInfo.accessToken;
      
      console.log('Selected token for use:', token);
      console.log('Token type:', typeof token);
      console.log('Token length:', token ? token.length : 'N/A');
      
      if (!token) {
        return rejectWithValue({ detail: 'No valid token found. Please log in again.' });
      }
      
      console.log('Authorization header will be:', `Bearer ${token.substring(0, 20)}...`);
      
      const response = await axios.post(PROXY + '/orders/add/', orderItems, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      
      return response.data; 
    } catch (error) {
      console.error('Order creation error:', error);
      console.error('Error response:', error.response?.data);
      return rejectWithValue(error.response?.data || { detail: 'Failed to create order' });
    }
  }
);    

const orderslice = createSlice({
    name: 'orderslice',
    initialState: {
        order: [],
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
      // clearOrder(state, action){
      //   localStorage.cartItems = []
      // }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createOrder.pending, (state) => {
            state.loading = true;   
            state.error = null;
            state.success = false;
        })
        .addCase(createOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.order = action.payload;
            state.success = true;
            state.error = null;
        })
        .addCase(createOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Failed to create order';
            state.success = false;
        });
    },
});
export default orderslice.reducer;
export const {order, loading, error, success} = orderslice.actions;
