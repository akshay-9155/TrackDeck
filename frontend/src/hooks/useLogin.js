// src/hooks/useLogin.js
import { useState } from "react";
import { useDispatch } from "react-redux";
import axiosInstance, { setAccessToken } from "../utils/axiosInstance";
import { setUser } from "../features/authSlice";
import toast from "react-hot-toast";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post("/auth/login", { email, password });

            const { user, accessToken } = response.data.data;

            // 🔐 Save access token in memory for Axios
            setAccessToken(accessToken);

            // ✅ Update Redux store
            dispatch(setUser({ ...user, accessToken }));

            return { success: true };
        } catch (error) {
            console.log(error);
            const message = error.response?.data?.message || "Login failed";
            toast.error(message);
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return { login, loading };
};

export default useLogin;
