import axiosClient from "../services/axiosClient";
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

const setLoading = (set, isLoading) => set({ isLoading });
const setError = (set, error) =>
  set({ error: { message: error.message, code: error.code } });

export const createCategorySlice = (set) => ({
  ...initialState,

  getAllCategories: async () => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.get(API_GET_ALL_CATEGORIES);
      set({ categories: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  createCategory: async (form) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.post(API_CREATE_CATEGORY, form);
      set({ response: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  updateCategory: async (form) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.put(
        API_UPDATE_CATEGORY.replace("{id}", form?.CategoryId),
        form
      );
      set({ response: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  deleteCategory: async (id) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.delete(
        API_DELETE_CATEGORY.replace("{id}", id)
      );
      set({ response: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },
});
