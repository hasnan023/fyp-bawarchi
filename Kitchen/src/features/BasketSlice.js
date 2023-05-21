import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      if (state.items.find((item) => item.id === action.payload.id)) {
        state.items = [
          ...state.items.filter((item) => item.id !== action.payload.id),
          {
            ...state.items.filter((item) => item.id === action.payload.id)[0],
            quantity: action.payload.quantity,
          },
        ];
      } else {
        state.items = [...state.items, action.payload];
      }
      return state;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;
