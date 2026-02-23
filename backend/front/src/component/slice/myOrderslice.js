import axios from 'axios';
import {PROXY} from '../Constants/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { error, loading } from './orderslice';

export const fetchMyOrders = createAsyncThunk(
  'getMyOrders/fetchMyOrders',
  async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo?.access}`,
      },
    };
    const response = await axios.get(`${PROXY}/myorders/`, config);
    return response.data;
    
    
  }
);

const myOrdersSlice = createSlice({
    name:'myOrders',
    initialState:{
        error: null,
        loading: false,
        orders: [] 
    },
    reducers:{
      // logdata(action, state){
      //   if(action.payload>0){
      //     console.log(action.payload)
      //   }
      // }
    },
    extraReducers:(builder) =>{
        builder
            .addCase(fetchMyOrders.pending, (state) => {
                            state.loading = true;
                        })
                        .addCase(fetchMyOrders.fulfilled, (state, action) => {
                            state.loading = false;
                            state.orders = action.payload;
                        })
                        .addCase(fetchMyOrders.rejected, (state, action) => {
                            state.loading = false;
                            state.error = action.error.message || "error";
                        }); 
    }
})
export default myOrdersSlice.reducer
export const {orders, loading, error} = myOrdersSlice.actions