// src/hooks/useVerifyEmail.js
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "../features/authSlice";

const useVerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const verifyEmail = async (token) => {
    setLoading(true);
    if(!token) return { success: false };
    try {
      const response = await axiosInstance.get(
        `/auth/register/verifyemail/${token}`,
      );
      const { accessToken, user } = response.data.data;
      dispatch(setAccessToken(accessToken));
      dispatch(setUser({ ...user, accessToken }));
      toast.success(response.data.message || "Email verified successfully");
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed";
      toast.error(message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { verifyEmail, loading };
};

export default useVerifyEmail;
