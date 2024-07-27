import axiosClient from "../services/axiosClient";
import { toast } from "react-toastify";
import {
  API_GET_ALL_CATEGORIES,
  API_CREATE_CATEGORY,
  API_UPDATE_CATEGORY,
  API_DELETE_CATEGORY,
} from "./../constant";

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

  createCategory: async (form) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosClient.post(API_CREATE_CATEGORY, form);
      set({ response: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  updateCategory: async (form) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosClient.put(API_UPDATE_CATEGORY, form);
      set({ response: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteCategory: async (id) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosClient.delete(
        API_DELETE_CATEGORY.replace("{id}", id)
      );
      set({ response: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
});
