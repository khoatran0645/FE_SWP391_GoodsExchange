import { create } from "zustand";
import axiosClient from "../services/axiosClient";
import { API_GET_PRODUCTS, API_LOGIN } from "./../constant";
export const useStore = create((set) => ({
  //* init state
  loading: false,
  error: null,
  users: [],
  colorMode: "light",
  auth: false,
  products: null,

  //* actions
  toggleAuth: () => set((state) => ({ auth: !state.auth })),
  toggleMode: () =>
    set((state) => ({
      colorMode: state.colorMode === "light" ? "dark" : "light",
    })),
  // getUsers: async () => {
  //   set({ loading: true });
  //   try {
  //     const { data } = await axiosClient.get("/users");
  //     set({ users: data });
  //   } catch (error) {
  //     set({ error: error.message });
  //   } finally {
  //     set({ loading: false });
  //   }
  // },
  getProducts: async () => {
    set({ loading: true });
    try {
      const { data } = await axiosClient.post(API_GET_PRODUCTS);
      set({ products: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  postLogin: async (form) => {
    set({ loading: true });
    try {
      console.log(form);
      const { data } = await axiosClient.post(API_LOGIN, {
        username: form.username,
        password: form.password,
      });
      set({ products: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));
