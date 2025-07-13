import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";

const useUpdateOrder = () => {
    const [loading, setLoading] = useState(false);

    const updateOrder = async (orderId, orderData) => {
        setLoading(true);
        try {
            const res = await axiosInstance.put(`/order/${orderId}`, orderData);
            toast.success("Order updated successfully");
            return { success: true, data: res.data.data };
        } catch (err) {
            toast.error(err.response?.data?.message || "Order update failed");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return { updateOrder, loading };
};

export default useUpdateOrder;