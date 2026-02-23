import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PROXY } from "../Constants/api";

export const registerUser = createAsyncThunk(
    'register/registerUser',
    async ({name, username, email, password }, thunkAPI) => {
        try { 
            const response = await axios.post(PROXY + '/users/register/', { name, username, email, password });
            console.log('Backend response:', response);
            console.log('Response data:', response.data);
            return response.data;
        } catch (error) {
            console.error('Registration error:', error);
            return thunkAPI.rejectWithValue('Registration failed');
        }
    }
)

const registerslice = createSlice({
    name: "register",
  initialState: {
    userInfo: (() => {
      const storedUserInfo = localStorage.getItem('userInfo');
      // Check if storedUserInfo is not null or the string "undefined" before parsing
      if (storedUserInfo && storedUserInfo !== "undefined") {
        try {
        console.log("Stored userInfo found:", storedUserInfo);
          return JSON.parse(storedUserInfo);
        } catch (e) {
          console.error("Error parsing userInfo from localStorage:", e);
          // Clear the invalid item from localStorage to prevent future errors
          localStorage.removeItem('userInfo');
          return null;
        }
      }
      return null;
    })(),
    error: null,
    loading: false,
    success: false,
  },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false; 
            state.success = true;
            state.userInfo = action.payload;
            if (action.payload) {
                localStorage.setItem('userInfo', JSON.stringify(action.payload));
            }


        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.userInfo = null;
            state.success = false;
            state.error = action.payload || action.error.message;
            localStorage.removeItem('userInfo');
        });
       
    }
});
export default registerslice.reducer;
export const {pending, fulfilled, rejected} = registerslice.actions;