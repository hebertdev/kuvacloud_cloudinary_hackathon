import axios from "axios";
import { getToken, deleteToken } from "./auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      deleteToken();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
