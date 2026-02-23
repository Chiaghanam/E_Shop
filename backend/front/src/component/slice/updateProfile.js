import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PROXY } from "../Constants/api";

const fetchUpdateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (userData, { getState, rejectWithValue }) => {
    try {
      const {
        login: { userInfo },
      } = getState();
        const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
        const { data } = await axios.put(
          PROXY +`/users/update/`,
          userData,
          config
        );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState: {loading: false, success: false, error: null, profile: {}},
  reducers: {
    resetUpdateProfile: (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
        state.profile = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchUpdateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.profile = action.payload;
      })
      .addCase(fetchUpdateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });       
    },
});

export const { resetUpdateProfile } = updateProfileSlice.actions;
export { fetchUpdateProfile };
export default updateProfileSlice.reducer;
