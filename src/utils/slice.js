import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
  initialState: {
    allProd: null,
    cartItems: [],
    index: null,
    cart: false,
    amount: [],
  },
  name: "slice",
  reducers: {
    addAllProd: (state, action) => {
      state.allProd = action.payload;
    },
    addCartItems: (state, action) => {
      state.cartItems.push(action.payload);
    },
    removeCartItems: (state, action) => {
      const index = action.payload;

      state.cartItems.splice(index, 1);
    },
    clearCart: (state, action) => {
      state.cartItems.length = 0;
    },
    showCart: (state, action) => {
      state.cart = action.payload;
    },
    addAmount: (state, action) => {
      state.amount.push(action.payload);
    },
    removeAmount: (state, action) => {
      const index = action.payload;

      state.amount.splice(index, 1);
    },
    removeAllAmount: (state) => {
      state.amount.length = 0;
    },
  },
});

export const {
  addAllProd,
  addCartItems,
  removeCartItems,
  clearCart,
  showCart,
  addAmount,
  removeAmount,
  removeAllAmount,
} = slice.actions;
export default slice.reducer;
