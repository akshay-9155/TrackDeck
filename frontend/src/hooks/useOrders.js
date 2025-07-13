// src/hooks/useOrders.js
import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import {
    setOrders,
    setLoading,
    setError,
} from "../features/orderSlice";

const useOrders = (filters) => {
    const dispatch = useDispatch();
    const [loading, setLocalLoading] = useState(false);
    const [error, setLocalError] = useState(null);
    const fetchOrders = async () => {
        dispatch(setLoading(true));
        setLocalLoading(true);
        setLocalError(null);

        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await axiosInstance.get(`/order?${queryParams}`);
            dispatch(setOrders(response.data?.message?.orders || []));
        } catch (err) {
            console.error("Failed to fetch orders:", err);
            const message = err.response?.data?.message || "Failed to load orders";
            setLocalError(message);
            dispatch(setError(message));
        } finally {
            dispatch(setLoading(false));
            setLocalLoading(false);
        }
    };
    useEffect(() => {
        fetchOrders();
    },[filters]);

    return { loading, error, fetchOrders };
};

export default useOrders;
