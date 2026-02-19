// src/hooks/useForgotPassword.js
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const useForgotPassword = () => {
    const [loading, setLoading] = useState(false);

    const forgotPassword = async (email) => {
        setLoading(true);
        try {
            await axiosInstance.post("/auth/forgotpassword", { email });

            toast.success("If the email exists, a reset link has been sent.");
            return { success: true };

        } catch (error) {
            const message =
                error.response?.data?.message || "Something went wrong";

            toast.error(message);
            return { success: false };

        } finally {
            setLoading(false);
        }
    };

    return { forgotPassword, loading };
};

export default useForgotPassword;