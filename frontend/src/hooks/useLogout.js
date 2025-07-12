import { useState } from "react";
import { useDispatch } from "react-redux";
import axiosInstance, { setAccessToken } from "../utils/axiosInstance.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/authSlice.jsx";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = async () => {
        setLoading(true);
        setError(null);

        try {
            await axiosInstance.post("/auth/logout");

            // Clear token in memory
            dispatch(setAccessToken(null));

            // Clear user from Redux
            
            toast.success("Logged out successfully");
            navigate("/login");
            dispatch(logoutUser());

            return { success: true };
        } catch (err) {
            console.error("Logout error:", err);
            toast.error(err.response?.data?.message || "Logout failed");
            setError(err.response?.data?.message || "Logout failed");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return { logout, loading, error };
};

export default useLogout;
