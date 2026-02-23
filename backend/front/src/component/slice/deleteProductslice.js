import axios from 'axios';
import {PROXY} from '../Constants/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// import { error, loading } from './orderslice';

export const deleteproducts = createAsyncThunk(
  'delete/deleteproducts',
  async (_id) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo?.access}`,
      },
    };
    const response = await axios.delete(`${PROXY}/product/delete/${_id}/`, config);
    return response.data;
    
    
  }
);

const deleteProductSlice = createSlice({
    name:'deleteproduct',
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
            .addCase(deleteproducts.pending, (state) => {
                            state.loading = true;
                        })
                        .addCase(deleteproducts.fulfilled, (state, action) => {
                            state.loading = false;
                            state.success = true;
                        })
                        .addCase(deleteproducts.rejected, (state, action) => {
                            state.loading = false;
                            state.error = action.error.message || "error";
                        }); 
    }
})
export default deleteProductSlice.reducer
// export const {success, loading, error} = deleteUserSlice.actions