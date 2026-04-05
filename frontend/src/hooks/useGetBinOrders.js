import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const useGetBinOrders = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [binOrders, setBinOrders] = useState([]);

    const getBinOrders = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await axiosInstance.get("/order/bin");
            setBinOrders(res.data.data);
            return res.data.data;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch orders");
            toast.error(err.response?.data?.message || "Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBinOrders();
    }, []);

    return { loading, error, binOrders, getBinOrders };
}

export default useGetBinOrders;