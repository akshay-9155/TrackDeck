// src/hooks/useSignup.js
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const signup = async (formData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/register", formData);

      toast.success(response.data.message || "Check your email to verify");

      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Signup failed";
      toast.error(message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

export default useSignup;