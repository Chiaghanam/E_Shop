import axios from 'axios';
import {PROXY} from '../Constants/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchOrderProfiles = createAsyncThunk(
  'orderProfiles/fetchOrderProfiles',
  async (_id) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo?.access}`,
      },
    };
    const response = await axios.get(`${PROXY}/orders/${_id}/`, config);
    return response.data;
  }
);

const orderprofileslice = createSlice({
    name: 'orderProfiles',
    initialState: {
        orderProfiles: {
          shippingAddress: {},
          user: {},
          orderitem: []

        },
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrderProfiles.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrderProfiles.fulfilled, (state, action) => {
                state.loading = false;
                state.orderProfiles = action.payload;
            })
            .addCase(fetchOrderProfiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            }); 
    }
});
export default orderprofileslice.reducer;
export const {orderProfiles, loading, error} = orderprofileslice.actions;