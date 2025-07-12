import axios from "axios";
import store from "../store";
import { logoutUser, setUser } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";

const dispatch = useDispatch();
// In-memory access token
const accessToken = useSelector((state) => state?.auth?.user?.accessToken) || null;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1",
  withCredentials: true, // send cookies
});

// Request Interceptor: Add access token
axiosInstance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 & retry

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
        const res = await axiosInstance.post("/auth/refreshAccessToken"); // refreshToken stored in httpOnly cookie
        const newAccessToken = res.data?.message?.accessToken;
        dispatch(setAccessToken(newAccessToken));
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        dispatch(logoutUser());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
