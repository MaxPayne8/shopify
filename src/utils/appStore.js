import { configureStore } from "@reduxjs/toolkit";
import sliceReducer from "./slice";

const appStore = configureStore({
  reducer: {
    slice: sliceReducer,
  },
});

export default appStore;
