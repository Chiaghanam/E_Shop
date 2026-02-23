import axios from 'axios';
import {PROXY} from '../Constants/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loading } from './myOrderslice';


export const orderDelivered = createAsyncThunk(
  'orderDelivered/orderDelivered',
  async (_id) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo?.access}`,
      },
    };
    const response = await axios.put(`${PROXY}/orders/${_id}/delivered`,{}, config);
    return response.data;
    
    
  }
);

const orderDeliveredSlice = createSlice({
    name:'orderDelivered',
    initialState:{
        loading: null,
        error: null,
        success: false
    },
    extraReducers: (builder)=> {
        builder
            .addCase(orderDelivered.pending, (state) => {
                state.loading = true;
            })
            .addCase(orderDelivered.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(orderDelivered.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || action.payload;
            })

    }});
    export default orderDeliveredSlice.reducer;
