import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const useOrderSummary = () => {
    const [summary, setSummary] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    }, []);

    return { summary, loading, error, fetchSummary };
};

export default useOrderSummary;