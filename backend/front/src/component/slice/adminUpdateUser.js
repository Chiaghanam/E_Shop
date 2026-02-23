import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PROXY } from "../Constants/api";


export const FetchUser = createAsyncThunk(
  "Update/FetchUser",
  async (id, {  rejectWithValue }) => {
    try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo?.access}`,
      },
    };
      const response = await axios.get(PROXY + `/users/update/${id}/`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const UpdateUser = createAsyncThunk(
  "Update/UpdateUser",
  async ({ id, data }, {  rejectWithValue }) => {
    try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo?.access}`,
      },
    };

      const response = await axios.put(
        PROXY + `/users/update/${id}/`,
        data,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const adminUpdateUserSlice = createSlice({
  name: "adminUpdateUser",
  initialState: {
    error: null,
    loading: false,
    success: false,
    data: {},
  },
  extraReducers: (builder) => {
    builder
      // FetchUser cases
      .addCase(FetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(FetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "error";
      })

      // UpdateUser cases
      .addCase(UpdateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.success=true;
      })
      .addCase(UpdateUser.rejected, (state, action) => {
        state.loading = false;
        state.success=false;
        state.error = action.payload?.error || "error";
      });
  },
});

export default adminUpdateUserSlice.reducer;