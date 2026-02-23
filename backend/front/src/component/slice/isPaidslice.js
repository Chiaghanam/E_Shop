import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PROXY } from "../Constants/api";



export const fetchOrderIsPaid = createAsyncThunk('put/fetchOrderIsPaid', 
    async (_id, paymentResult)=> {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo?.access}`,
      },
    };
    const response = await axios.put(`${PROXY}/orders/${_id}/pay`,paymentResult, config);
    return response.data;
  }
) 

const isPaidSlice = createSlice({
    name: 'isPaid',
    initialState: {
        loading: false,
        error: null,
        success: false
    },
    extraReducers:(builder) => {
        builder
            .addCase(fetchOrderIsPaid.pending, (state)=>{
                state.loading= true;
            }
            )
            .addCase(fetchOrderIsPaid.fulfilled, (state, action)=>{
                state.loading = false;
                state.error = null;
                state.success = true;
                
            })
            .addCase(fetchOrderIsPaid.rejected, (state, action)=> {
                state.loading = false;
                state.error = action.payload.error || 'error';
            })

    }
    
}
)
export default isPaidSlice.reducer;
export const {pending, fulfilled, rejected} = isPaidSlice.actions;