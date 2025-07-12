import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import roomReducer from "./features/roomSlice";
import chatReducer from "./features/chatSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomReducer,
    chat: chatReducer,
  },
});

export default store;
