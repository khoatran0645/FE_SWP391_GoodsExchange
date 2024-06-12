import { create } from "zustand";
import axiosClient from "../services/axiosClient";
import { immer } from "zustand/middleware/immer";
import {
  API_GET_ALL_CATEGORIES,
  API_GET_PRODUCTS_HOMEPAGE,
  API_CREATE_PRODUCT,
  API_GET_PRODUCT_BY_ID,
  API_LOGIN,
  API_SEARCH_PRODUCTS_FOR_USER,
} from "./../constant";

const useStore = create(
  immer((set) => ({
    //* init state
    isLoading: false,
    error: null,
    respone: null,

    users: [],
    colorMode: "light",
    auth: false,
    productList: null,
    productDetail: null,
    categories: null,
    userInfo: null,
    searchResult: null,
    
    //* sync actions
    setAuth: (auth) => set({ auth: auth }),
    toggleMode: () =>
      set((state) => ({
        colorMode: state.colorMode === "light" ? "dark" : "light",
      })),

    //* async actions
    // PRODUCT API
    getProductsForHomePage: async (pageIndex, pageSize) => {
      set({ isLoading: true });
      try {
        const { data } = await axiosClient.post(
          API_GET_PRODUCTS_HOMEPAGE.replace("{PageIndex}", pageIndex).replace(
            "{PageSize}",
            pageSize
          )
        );
        set({ productList: data });
        set({ productDetail: null });
      } catch (error) {
        set({ error: error.message });
      } finally {
        set({ isLoading: false });
      }
    },
    getProductById: async (id) => {
      set({ isLoading: true });
      try {
        const { data } = await axiosClient.get(
          API_GET_PRODUCT_BY_ID.replace("{id}", id)
        );
        set({ productDetail: data });
      } catch (error) {
        set({ error: error.message });
      } finally {
        set({ isLoading: false });
      }
    },
    createNewProduct: async (form) => {
      set({ isLoading: true });
      try {
        const { data } = await axiosClient.post(API_CREATE_PRODUCT, form);
        set({ response: data });
      } catch (error) {
        set({ error: error.message });
      } finally {
        set({ isLoading: false });
      }
    },

    // user API
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
    // SEARCH PRODUCT BY USER

    getSearchProductForUser: async (keyword) => {
      set({ isLoading: true });
      // console.log(min);
      // console.log(max);
      try {
        const { data } = await axiosClient.post(
          API_SEARCH_PRODUCTS_FOR_USER.replace("{keyword}", keyword)
          // .replace("{minPrice}", min)
          // .replace("{maxPrice}", max)
        );

        set({ searchResult: data });
      } catch (error) {
        set({ error: error.message });
      } finally {
        set({ isLoading: false });
      }
    },
  }))
);

export default useStore;
