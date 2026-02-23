import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PROXY } from "../Constants/api";


export const FetchOrders = createAsyncThunk(
  "Orders/FetchOrders",
  async ( _, {  rejectWithValue }) => {
    try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        'Authorization': `Bearer ${userInfo?.access}`,
      },
    };
      const response = await axios.get(PROXY +'/orders/', config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const adminAllOrderSlice = createSlice({
  name: "adminAllOrders",
  initialState: {
    error: null,
    loading: false,
    orders: [],
    },
    extraReducers: (builder) => {
        builder
            // FetchOrders cases    
            .addCase(FetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
            )
            .addCase(FetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            }
            )
            .addCase(FetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                
            }
            );
    },
});

export default adminAllOrderSlice.reducer;