import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import userReducer from "./features/userSlice";
import orderReducer from "./features/orderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    order: orderReducer,
  },
});

export default store;
