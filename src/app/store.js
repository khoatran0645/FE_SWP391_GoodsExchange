import { create } from "zustand";
import axiosClient from "../services/axiosClient";
import { API_GET_PRODUCTS, API_LOGIN } from "./../constant";
import { useQuery } from "@tanstack/react-query";

const useStore = create((set) => ({
  //* init state
  isLoading: false,
  error: null,

  users: [],
  colorMode: "light",
  auth: false,
  products: null,
  userInfo: null,

  //* actions
  toggleAuth: () => set((state) => ({ auth: !state.auth })),
  toggleMode: () =>
    set((state) => ({
      colorMode: state.colorMode === "light" ? "dark" : "light",
    })),
  // getUsers: async () => {
  //   set({ isLoading: true });
  //   try {
  //     const { data } = await axiosClient.get("/users");
  //     set({ users: data });
  //   } catch (error) {
  //     set({ error: error.message });
  //   } finally {
  //     set({ isLoading: false });
  //   }
  // },
  getProducts: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axiosClient.post(API_GET_PRODUCTS);
      set({ products: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  postLogin: async (form) => {
    console.log("login");
    set({ isLoading: true });
    try {
      console.log(form);
      const { data } = await axiosClient.post(API_LOGIN, {
        userName: form.username,
        password: form.password,
      });
      set({ userInfo: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useStore;
