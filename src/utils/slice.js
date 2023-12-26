import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
  initialState: {
    allProd: null,
    cartItems: [],
    index: null,
    cart: false,
    amount: [],
    user: [],
    totalItems: [],
    amntIndex: null,
    stock: [],
    prodName: null,
    showStock: false,
  },
  name: "slice",
  reducers: {
    addAllProd: (state, action) => {
      state.allProd = action.payload;
    },
    addCartItems: (state, action) => {
      state.cartItems.push(action.payload);
    },

    clearCart: (state) => {
      state.cartItems.length = 0;
      state.amount.length = 0;
      state.totalItems.length = 0;
    },
    showCart: (state, action) => {
      state.cart = action.payload;
    },
    addAmount: (state, action) => {
      state.amount.push(action.payload);
    },
    removeAmount: (state, action) => {
      if (state.amount[state.amntIndex] === action.payload) {
        state.amount.splice(state.amntIndex, 1);
      } else state.amount[state.amntIndex] -= action.payload;
    },

    userData: (state, action) => {
      state.user.push(action.payload);
    },
    addTotalItems: (state, action) => {
      state.totalItems.push(action.payload);
    },
    addTotalItemsIndex: (state, action) => {
      state.totalItems[action.payload]++;
    },
    addAmntIndex: (state, action) => {
      state.amntIndex = action.payload;
    },
    addAmountIndex: (state, action) => {
      state.amount[state.amntIndex] += action.payload;
    },
    removeItems: (state, action) => {
      if (state.totalItems[action.payload] === 1) {
        state.totalItems.splice(action.payload, 1);
        state.cartItems.splice(action.payload, 1);
        state.stock.splice(action.payload, 1);
      } else {
        state.totalItems[action.payload]--;
      }
    },
    addStock: (state, action) => {
      state.stock.push(action.payload);
    },
    addProdName: (state, action) => {
      state.prodName = action.payload;
    },
    addShowStock: (state, action) => {
      state.showStock = action.payload;
    },
    removeStock: (state) => {
      state.stock.splice(state.amntIndex, 1);
    },
  },
});

export const {
  addAllProd,
  addCartItems,

  clearCart,
  showCart,
  addAmount,
  removeAmount,

  userData,
  addTotalItems,
  addTotalItemsIndex,
  addAmntIndex,
  addAmountIndex,
  removeItems,
  addStock,
  addProdName,
  addShowStock,
  removeStock,
} = slice.actions;
export default slice.reducer;
