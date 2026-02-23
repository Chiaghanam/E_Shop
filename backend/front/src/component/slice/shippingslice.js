import { createSlice } from "@reduxjs/toolkit";

const shippingslice = createSlice({
    name: "shipping",
    initialState: {
        error: null,
        loading: false,
        shippingInfo: JSON.parse(localStorage.getItem("shippingInfo")) || {},
    },
    reducers: {
        setShippingInfo(state, action) {
            state.shippingInfo = action.payload;
            localStorage.setItem("shippingInfo", JSON.stringify(action.payload));
        },
    },
});

export const { setShippingInfo } = shippingslice.actions;
export default shippingslice.reducer;