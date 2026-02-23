import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { PROXY } from '../Constants/api';
// import { PRODUCTS_FAIL, PRODUCTS_REQUEST, PRODUCTS_SUCCESS } from '../Constants/ProductConstants';  

export const fetchtopproduct = createAsyncThunk('fetchtopproduct', async() =>{
    const response = await axios.get(`${PROXY}/topproducts/`)
    return response.data;

}  )

export const topProductSlice = createSlice({
  name: 'topProducts',
  initialState: {
    isloading: false,
    error: null,
    data: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchtopproduct.pending, (state)=>{
        state.isloading = true;
        state.data = [];
    })
    builder.addCase(fetchtopproduct.fulfilled, (state, action)=>{
      state.isloading = false;
      state.data = action.payload;
      // action.type = String;
    })
    builder.addCase(fetchtopproduct.rejected, (state, action)=>{
      state.isloading = false;
      state.error = action.error.message;
      // action.type = String;
    })
  }
});
export default topProductSlice.reducer;