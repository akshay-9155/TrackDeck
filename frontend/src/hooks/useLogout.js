import { useState } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../utils/axiosInstance.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logoutUser, setAccessToken, setUser } from "../features/authSlice.jsx";
import { clearOrders } from "../features/orderSlice.jsx";
import { setUserProfile } from "../features/userSlice.jsx";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await axiosInstance.post("/auth/logout",{}, {withCredentials: true});
            // Clear token in memory
            dispatch(setAccessToken(null));
            dispatch(setUser(null));
            dispatch(clearOrders());
            dispatch(setUserProfile(null));

            // Clear user from Redux
            
            toast.success(res?.data?.message || "✅ User logged out successfully");
            navigate("/login");
            dispatch(logoutUser());

            return { success: true };
        } catch (err) {
            // console.error("Logout error:", err);
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
