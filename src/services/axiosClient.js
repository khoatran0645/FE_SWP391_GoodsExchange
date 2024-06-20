import axios from "axios";
// import { BE_BASE_URL } from "../constant";
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BE_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      return Promise.reject(error.response);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
