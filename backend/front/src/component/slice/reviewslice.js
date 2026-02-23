import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PROXY } from "../Constants/api";

export const createReview = createAsyncThunk(
  "reviews/createReview",
  async ({ id, reviewData }, { rejectWithValue }) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      
      if (!userInfo || !userInfo.access) {
        return rejectWithValue('User not authenticated. Please login.');
      }

      console.log('Product ID:', id);
      console.log('Review Data being sent:', reviewData);

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userInfo.access}`
        }
      };

      const response = await axios.post(
        `${PROXY}/product/${id}/review/`,
        reviewData,
        config
      );
      
      console.log('Response from server:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error details:', error.response?.data);
      const errorMessage = error.response?.data?.detail || error.message || 'Failed to submit review';
      return rejectWithValue(errorMessage);
    } 
  }
);

const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    error: null,
    loading: false,
    review: [],
    success: false
  },
  reducers: {
    resetReview: (state) => {
      state.error = null;
      state.loading = false;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.review = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
        state.success = false;
      });
  }
});

export const { resetReview } = reviewSlice.actions;
export default reviewSlice.reducer;