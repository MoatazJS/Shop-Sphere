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
    incrementCart: (state) => {
      state.items += 1;
    },
    decrementCart: (state) => {
      if (state.items > 0) state.items -= 1;
    },
  },
});

export const { setCartItems, incrementCart, decrementCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
