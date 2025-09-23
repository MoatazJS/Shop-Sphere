import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slices/cartSlice";
import { tokenReducer } from "./slices/tokenSlice";

export const store = configureStore({
  reducer: { cart: cartReducer, token: tokenReducer },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
