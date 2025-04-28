import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000", // 🔥 use env variables
  withCredentials: true, // so cookies are sent automatically
});

export default axiosInstance;
