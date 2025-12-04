// src/lib/apiClient.ts
import axios from "axios";
import { useAuthStore } from "@/store/authStore";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api",
  withCredentials: false,
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (
      error.response?.status === 401 &&
      !original._retry &&
      typeof window !== "undefined"
    ) {
      original._retry = true;
      const { refreshToken, setTokens, logout } = useAuthStore.getState();
      if (!refreshToken) {
        logout();
        return Promise.reject(error);
      }
      try {
        const resp = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api"}/auth/refresh`,
          { refreshToken }
        );
        const newAccess = resp.data.accessToken;
        setTokens(newAccess, refreshToken);
        original.headers["Authorization"] = `Bearer ${newAccess}`;
        return apiClient(original);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        logout();
      }
    }
    return Promise.reject(error);
  }
);
