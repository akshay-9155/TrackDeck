import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";

const useMoveOrderToBin = () => {
    const [loading, setLoading] = useState(false);

    const moveToBin = async (orderId) => {
        setLoading(true);
        try {
            const res = await axiosInstance.delete(`/order/${orderId}`);
            toast.success(res?.data?.message || "✅ Order moved to bin successfully");
            return { success: true };
        } catch (err) {
            toast.error(err.response?.data?.message || "Order movement to bin failed");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return { moveToBin, loading };
};

export default useMoveOrderToBin;