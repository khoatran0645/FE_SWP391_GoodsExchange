import axiosClient from "../services/axiosClient";
import { toast } from "react-toastify";
import { API_POST_RATING } from "../constant";

const initialState = {
  response: null,
  isLoading: false,
  error: null,
};

const setLoading = (set, isLoading) => set({ isLoading });
const setError = (set, error) => set({ error: { message: error.message, code: error.code } });

export const createRatingSlice = (set) => ({
  ...initialState,

  sendRatingFromBuyer: async (form) => {
    setLoading(set, true);
    try {
      console.log("Sending rating data:", form);
      const { data } = await axiosClient.post(API_POST_RATING, form);
      toast.success("Rating created successfully");
      set({ response: data });
      console.log("Rating response:", data);
      return { isSuccessed: true, message: "Rating created successfully" };
    } catch (error) {
      setError(set, error);
      console.error("Error sending rating:", error.response?.data || error.message);
      return { isSuccessed: false, message: error.message };
    } finally {
      setLoading(set, false);
    }
  },
});
