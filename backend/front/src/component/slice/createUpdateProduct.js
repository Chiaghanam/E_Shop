import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PROXY } from "../Constants/api";

// CREATE product
export const createProduct = createAsyncThunk(
  "createUpdateProduct/create",
  async (formDataObj, { rejectWithValue }) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.access}`,
        },
      };
      const response = await axios.post(`${PROXY}/product/create/`, formDataObj, config);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || err.message);
    }
  }
);

// UPDATE product
export const updateProduct = createAsyncThunk(
  "createUpdateProduct/update",
  async ({ _id, formData }, { rejectWithValue }) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.access}`,
        },
      };
      const response = await axios.put(`${PROXY}/product/edit/${_id}/`, formData, config);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || err.message);
    }
  }
);

const createUpdateProductSlice = createSlice({
  name: "createUpdateProduct",
  initialState: { loading: false, success: false, error: null, product: {} },
  reducers: {
    resetCreateUpdateProduct: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.product = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.product = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // UPDATE
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.product = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCreateUpdateProduct } = createUpdateProductSlice.actions;
export default createUpdateProductSlice.reducer;