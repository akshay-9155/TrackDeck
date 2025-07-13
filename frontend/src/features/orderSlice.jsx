// src/features/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  orderSummary: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setOrderSummary: (state, action) => {
      state.orderSummary = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearOrders: (state) => {
      state.orders = [];
      state.orderSummary = null;
    },
  },
});

export const { setOrders, setOrderSummary, setLoading, setError, clearOrders } =
  orderSlice.actions;

export default orderSlice.reducer;
