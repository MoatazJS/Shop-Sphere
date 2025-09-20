import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: 0,
  },
  reducers: {},
});

export const cartReducer = cartSlice.reducer;
