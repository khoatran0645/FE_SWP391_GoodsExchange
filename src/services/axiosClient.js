import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BE_BASE_URL,
  timeout: 10000,
  headers: {},
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // console.log("config", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    // console.log("response", response);
    // if (response.status == 200) {
    //   toast.success("Success");
    // }
    return response;
  },
  (error) => {
    console.log("error", error.response.data.Message);
    if (error.response) {
      if (error.response.status === 400) {
        toast.error(error.response.data.Message);
      } else if (error.response.status === 401) {
        // Optionally, you can redirect to a login page
        window.location.href = "/login";
      } else if (error.response.status === 404) {
        // Handle not found error (e.g., show a notification)
        // toast.error(error.response.data.Message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.Message,
        });
      } else if (error.response.status >= 500 && error.response.status < 600) {
        // Handle server errors (e.g., show a notification)
        // toast.error("Server error");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Server error",
        });
      }
    } else if (error.request) {
      // Handle network errors (e.g., no internet connection)
      // toast.error("Network error");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Network error",
      });
    } else {
      // Handle other errors
      // toast.error("An unexpected error occurred");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An unexpected error occurred",
      });
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
