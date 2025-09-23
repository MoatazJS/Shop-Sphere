import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: number;
}

const initialState: CartState = {
  items: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<number>) => {
      state.items = action.payload;
    },
  },
});

export const { setCartItems } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
