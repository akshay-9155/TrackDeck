// src/hooks/useSignup.js
import { useState } from "react";
import { useDispatch } from "react-redux";
import axiosInstance, { setAccessToken } from "../utils/axiosInstance";
import { setUser } from "../features/authSlice";
import toast from "react-hot-toast";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const signup = async (formData) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post("/auth/register", formData);

            const { user, accessToken } = response.data.data;

            setAccessToken(accessToken);
            dispatch(setUser({ ...user, accessToken }));

            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || "Signup failed";
            toast.error(message);
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return { signup, loading };
};

export default useSignup;
