import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    payments: null,
    loading: false,
    error: null,
  },
    reducers: {
        paymentMethod: (state, action) => {
            state.payments = action.payload;
            localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
        }},
});
export const { paymentMethod } = paymentSlice.actions;
export default paymentSlice.reducer;