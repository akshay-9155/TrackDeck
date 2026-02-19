// src/utils/axiosInstance.jsx
import axios from "axios";
import store from "../store";
import { logoutUser, setUser } from "../features/authSlice";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1",
  withCredentials: true,
});

// helper to read accessToken from redux store safely
const getAccessTokenFromStore = () => {
  try {
    const state = store.getState();
    return state?.auth?.user?.accessToken ?? null;
  } catch {
    return null;
  }
};

// ✅ Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessTokenFromStore();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;
let refreshSubscribers = [];

// Add request to queue
const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

// Execute all queued requests
const onRefreshed = (newAccessToken) => {
  refreshSubscribers.forEach((callback) => callback(newAccessToken));
  refreshSubscribers = [];
};

// ✅ Response Interceptor
const skipRefreshRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/verify-email",
  "/auth/refreshAccessToken",
];

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) {
      return Promise.reject(error);
    }
    const is401 = error.response?.status === 401;
    const isRetry = originalRequest._retry;
    const isPublicRoute = skipRefreshRoutes.some((route) =>
      originalRequest.url.includes(route),
    );

    if (!is401 || isRetry || isPublicRoute) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeTokenRefresh((newAccessToken) => {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          resolve(axiosInstance(originalRequest));
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const res = await axiosInstance.post("/auth/refreshAccessToken");
      console.log(res);
      const newAccessToken = res.data?.data?.accessToken;
      console.log("New AccessToken: ", newAccessToken);
      if (!newAccessToken) {
        throw new Error("No access token received");
      }

      // ✅ update accessToken in Redux
      store.dispatch(
        setUser({
          ...store.getState().auth.user,
          accessToken: newAccessToken,
        }),
      );
      onRefreshed(newAccessToken);
      isRefreshing = false;

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      isRefreshing = false;
      refreshSubscribers = [];
      store.dispatch(logoutUser());
      return Promise.reject(refreshError);
    }
  },
);

export default axiosInstance;
