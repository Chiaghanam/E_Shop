import axios from 'axios';
import {PROXY} from '../Constants/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// import { error, loading } from './orderslice';

export const deleteusers = createAsyncThunk(
  'delete/deleteusers',
  async (id) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo?.access}`,
      },
    };
    const response = await axios.delete(`${PROXY}/users/delete/${id}/`, config);
    return response.data;
    
    
  }
);

const deleteUserSlice = createSlice({
    name:'deleteuser',
    initialState:{
        error: null,
        loading: false,
        success: false, 
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
            .addCase(deleteusers.pending, (state) => {
                            state.loading = true;
                        })
                        .addCase(deleteusers.fulfilled, (state, action) => {
                            state.loading = false;
                            state.success = true;
                        })
                        .addCase(deleteusers.rejected, (state, action) => {
                            state.loading = false;
                            state.error = action.error.message || "error";
                        }); 
    }
})
export default deleteUserSlice.reducer
export const {success, loading, error} = deleteUserSlice.actions