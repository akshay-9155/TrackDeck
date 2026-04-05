import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";

const useRestoreOrder = () => {
    const [loading, setLoading] = useState(false);

    const restoreOrder = async (orderId) => {
        setLoading(true);
        try {
            const res = await axiosInstance.patch(`/order/${orderId}/restore`);
            toast.success(res?.data?.message || "✅ Order restored successfully");
            return { success: true };
        } catch (err) {
            toast.error(err.response?.data?.message || "Order restoration failed");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return { restoreOrder, loading };
};

export default useRestoreOrder;
