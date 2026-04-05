import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";

const useClearBin = () => {
    const [loading, setLoading] = useState(false);

    const clearBin = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.delete("/order/bin");
            toast.success(res?.data?.message || "✅ Bin cleared successfully");
            return { success: true };
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to clear bin");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return { clearBin, loading };
};

export default useClearBin;
