import axios from 'axios';
import {PROXY} from '../Constants/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { error, loading } from './orderslice';

export const fetchusers = createAsyncThunk(
  'getUsers/fetchusers',
  async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo?.access}`,
      },
    };
    const response = await axios.get(`${PROXY}/users/`, config);
    return response.data;
    
    
  }
);

const getUsersSlice = createSlice({
    name:'getuser',
    initialState:{
        error: null,
        loading: false,
        users: [] 
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
            .addCase(fetchusers.pending, (state) => {
                            state.loading = true;
                        })
                        .addCase(fetchusers.fulfilled, (state, action) => {
                            state.loading = false;
                            state.users = action.payload;
                        })
                        .addCase(fetchusers.rejected, (state, action) => {
                            state.loading = false;
                            state.error = action.error.message || "error";
                        }); 
    }
})
export default getUsersSlice.reducer
export const {users, loading, error} = getUsersSlice.actions