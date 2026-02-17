import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const useChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);

    try {
      const response = await axiosInstance.post("/auth/changepassword", {
        currentPassword,
        newPassword,
      });

      const message =
        response?.data?.message || "Password changed successfully";

      toast.success(message);

      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to change password";

      toast.error(message);

      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading };
};

export default useChangePassword;