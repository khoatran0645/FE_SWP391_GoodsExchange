import { create } from "zustand";
import axiosClient from "../services/axiosClient";
import { immer } from "zustand/middleware/immer";
import {
  API_GET_ALL_CATEGORIES,
  API_GET_ALL_PRODUCTS,
  API_LOGIN,
} from "./../constant";

const useStore = create(
  immer((set) => ({
    //* init state
    isLoading: false,
    error: null,

    users: [],
    colorMode: "light",
    auth: false,
    products: null,
    categories: null,
    userInfo: null,

    //* sync actions
    toggleAuth: () => set((state) => ({ auth: !state.auth })),
    toggleMode: () =>
      set((state) => ({
        colorMode: state.colorMode === "light" ? "dark" : "light",
      })),

    //* async actions
    // PRODUCT API
    getProducts: async () => {
      set({ isLoading: true });
      try {
        const { data } = await axiosClient.post(API_GET_ALL_PRODUCTS);
        set({ products: data });
      } catch (error) {
        set({ error: error.message });
      } finally {
        set({ isLoading: false });
      }
    },

    postLogin: async (form) => {
      set({ isLoading: true });
      try {
        console.log(form);
        const { data } = await axiosClient.post(API_LOGIN, form);
        set({ userInfo: data });
      } catch (error) {
        set({ error: error.message });
      } finally {
        set({ isLoading: false });
      }
      // return get().userInfo;
    },

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
  }))
);

export default useStore;
