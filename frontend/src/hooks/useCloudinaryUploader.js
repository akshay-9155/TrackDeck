// hooks/useCloudinaryUploader.js
import { useState } from "react";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const useCloudinaryUploader = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const uploadImage = async (file, type) => {
        setLoading(true);
        setError(null);

        try {
            // 1. Get signature
            const sigRes = await axiosInstance.get(`/auth/cloudinary/signature?type=${type}`);
            const { signature, timestamp, folder, apiKey, cloudName } = sigRes.data.data;

            // 2. Prepare form data
            const formData = new FormData();
            formData.append("file", file);
            formData.append("api_key", apiKey);
            formData.append("timestamp", timestamp);
            formData.append("signature", signature);
            formData.append("folder", folder);

            // 3. Upload to Cloudinary
            const cloudRes = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, formData);
            return cloudRes.data.secure_url;
        } catch (err) {
            setError("Upload failed. Try again.");
            toast.error(err.response?.data?.message || "Image Upload failed. Try again.");
            console.error(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { uploadImage, loading, error };
};

export default useCloudinaryUploader;
