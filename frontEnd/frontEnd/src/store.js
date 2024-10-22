import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
import cartEventReducer from "./slices/cartEventSlice";
// import productReducer from "./slices/productSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    cartEvent: cartEventReducer,
    // products: productReducer,
  },
  //   devTools: process.env.NODE_ENV !== 'production',
});

export default store;
