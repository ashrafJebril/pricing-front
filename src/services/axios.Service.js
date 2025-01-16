import axios from "axios";

const baseURL = "http://localhost:3000/v1/api";

const axiosInstance = axios.create({
  baseURL, // Load base URL from .env
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
