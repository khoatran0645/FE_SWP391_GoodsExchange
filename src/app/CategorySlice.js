import axiosClient from "../services/axiosClient";
import { toast } from "react-toastify";
import { API_GET_ALL_CATEGORIES } from "./../constant";

const initialState = {
  response: null,
  categories: null,
  isLoading: false,
  error: null,
};

export const createCategorySlice = (set) => ({
  ...initialState,

  getAllCategories: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axiosClient.get(API_GET_ALL_CATEGORIES);

      set({ categories: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
});
