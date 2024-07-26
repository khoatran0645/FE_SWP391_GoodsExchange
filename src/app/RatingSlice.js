import axiosClient from "../services/axiosClient";
import { toast } from "react-toastify";
import { API_POST_RATING } from "./../constant";

const initialState = {
  response: null,
  isLoading: false,
  error: null,
};

export const createRatingSlice = (set) => ({
  ...initialState,

  sendRatingFromBuyer: async (form) => {
    set({ isLoading: true });
    try {
      console.log("Sending rating data:", form);
      const { data } = await axiosClient.post(API_POST_RATING, form);
      toast.success("Rating created successfully");
      set({ response: data });
      console.log("Rating response:", data);
    } catch (error) {
      set({ error: error.message });
      console.error(
        "Error sending rating:",
        error.response?.data || error.message
      );
      return { isSuccessed: false, message: error.message };
    } finally {
      set({ isLoading: false });
    }
  },
});
