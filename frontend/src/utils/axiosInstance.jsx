// src/utils/axiosInstance.jsx
import axios from "axios";
import store from "../store";
import { logoutUser, setUser } from "../features/authSlice";

let accessToken = null;

// ✅ Setter to allow updating token from useLogin etc.
export const setAccessToken = (token) => {
  accessToken = token;
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1",
  withCredentials: true,
});

// ✅ Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor
const skipRefreshRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/verify-email",
];

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const is401 = error.response?.status === 401;
    const isRetry = originalRequest._retry;
    const isRefreshCall = originalRequest.url.includes(
      "/auth/refreshAccessToken"
    );
    const isPublicRoute = skipRefreshRoutes.some((route) =>
      originalRequest.url.includes(route)
    );

    if (is401 && !isRetry && !isRefreshCall && !isPublicRoute) {
      originalRequest._retry = true;
      try {
        const res = await axiosInstance.post("/auth/refreshAccessToken");
        const newAccessToken = res.data?.data?.accessToken;

        // ✅ update accessToken in memory and Redux
        setAccessToken(newAccessToken);
        store.dispatch(
          setUser({
            ...store.getState().auth.user,
            accessToken: newAccessToken,
          })
        );

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        store.dispatch(logoutUser());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
