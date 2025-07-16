import { useState } from "react";
import axiosInstance from "../utils/axiosInstance.jsx";
import { toast } from "react-hot-toast";

const useCreateOrder = () => {
    const [loading, setLoading] = useState(false);

    const createOrder = async (orderData) => {
        setLoading(true);
        try {
            const res = await axiosInstance.post("/order", orderData);
            toast.success("Order created successfully");
            return { success: true, data: res.data.data };
        } catch (err) {
            // console.log(err);
            toast.error(err.response?.data?.message || "Order creation failed");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return { createOrder, loading };
};

export default useCreateOrder;