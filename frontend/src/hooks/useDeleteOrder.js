import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";

const useDeleteOrder = () => {
    const [loading, setLoading] = useState(false);

    const deleteOrder = async (orderId) => {
        setLoading(true);
        try {
            await axiosInstance.delete(`/order/${orderId}`);
            toast.success("Order deleted successfully");
            return { success: true };
        } catch (err) {
            toast.error(err.response?.data?.message || "Order deletion failed");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return { deleteOrder, loading };
};

export default useDeleteOrder;