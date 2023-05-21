import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/BasketSlice";
import userReducer from "./features/UserSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});
