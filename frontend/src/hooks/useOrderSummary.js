import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const useOrderSummary = () => {
    const [summary, setSummary] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { refreshOrderSummary } = useSelector(state => state.order);

    const fetchSummary = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get("/order/summary/me");
            setSummary(res?.data?.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch summary");
            toast.error(err.response?.data?.message || "Failed to fetch summary");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSummary();
    }, [refreshOrderSummary]);

    return { summary, loading, error, fetchSummary };
};

export default useOrderSummary;