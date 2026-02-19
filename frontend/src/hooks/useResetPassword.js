// src/hooks/useResetPassword.js
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const useResetPassword = () => {
    const [loading, setLoading] = useState(false);

    const resetPassword = async (token, password, confirmPassword) => {
        setLoading(true);
        try {
            await axiosInstance.post(`/auth/resetpassword/${token}`, {
                password,
                confirmPassword,
            });

            toast.success("Password reset successfully");
            return { success: true };

        } catch (error) {
            const message =
                error.response?.data?.message || "Reset failed";

            toast.error(message);
            return { success: false };

        } finally {
            setLoading(false);
        }
    };

    return { resetPassword, loading };
};

export default useResetPassword;