import React from 'react'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { PROXY } from '../Constants/api';

 export const fetchProductDetail = createAsyncThunk('fetchProductDetail', async (id) => {
        const response = await axios.get(`${PROXY}/productDetail/${id}/`);
        return response.data;
    });

   
   export const ProductDetailslice = createSlice({
        name: 'productDetail',
        initialState: {
            product: {}, // Changed from an empty array to an empty object
            loading: false,
            error: null
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchProductDetail.pending, (state) => {
                    state.loading = true;
                })
                .addCase(fetchProductDetail.fulfilled, (state, action) => {
                    state.loading = false;
                    state.product = action.payload;
                })
                .addCase(fetchProductDetail.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                });
        }
    });



export default ProductDetailslice.reducer;
