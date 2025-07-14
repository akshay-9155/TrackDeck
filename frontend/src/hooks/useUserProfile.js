import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/authSlice";
import { setUserProfile } from "../features/userSlice";

const useUserProfile = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const { userProfile } = useSelector(state => state.user);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get("/user/profile");
            dispatch(setUserProfile(res?.data?.data));
        } catch (err) {
            toast.error("Failed to fetch profile");
        } finally {
            setLoading(false);
        }
    };
    const updateUserProfile = async (profileData) => {
        setLoading(true);
        try {
            const res = await axiosInstance.put("/user/profile", profileData);
            toast.success("Profile updated successfully");
            dispatch(setUserProfile(res?.data?.data));
            return { success: true };
        } catch (err) {
            toast.error(err.response?.data?.message || "Update failed");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    const deleteAccount = async () => {
        setLoading(true);
        try {
            await axiosInstance.delete("/user/delete");
            dispatch(setUserProfile(null));
            dispatch(logoutUser())
            toast.success("Account deleted successfully");
            return { success: true };
        } catch (err) {
            toast.error("Failed to delete account");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);
    return { userProfile, loading, fetchProfile, updateUserProfile, deleteAccount };
};

export default useUserProfile;