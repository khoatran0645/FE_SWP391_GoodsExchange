import { create } from "zustand";
import axiosClient from "../services/axiosClient";
import { immer } from "zustand/middleware/immer";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import {
  API_GET_ALL_CATEGORIES,
  API_GET_PRODUCTS_HOMEPAGE,
  API_CREATE_PRODUCT,
  API_GET_PRODUCT_BY_ID,
  API_LOGIN,
  API_SEARCH_PRODUCTS_FOR_USER,
  API_POST_REPORT,
  API_GET_ALL_REPORTS,
  API_GET_ALL_PRODUCT_MOD,
  API_APPROVE_PRODUCT_MOD,
  API_DENY_PRODUCT_MOD,
  API_APPROVE_REPORT_MOD,
  API_DENY_REPORT_MOD,
} from "./../constant";

const useStore = create(
  devtools(
    persist(
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
              API_GET_PRODUCTS_HOMEPAGE.replace(
                "{PageIndex}",
                pageIndex
              ).replace("{PageSize}", pageSize)
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

        // manage
        // post all product
        postAllProduct: async (pageIndex, pageSize) => {
          set({ isLoading: true });
          try {
            const { data } = await axiosClient.post(
              API_GET_ALL_PRODUCT_MOD.replace("{PageIndex}", pageIndex).replace(
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
        // Review product
        approveProduct: async (item) => {
          set({ isLoading: true });
          try {
            const { data } = await axiosClient.patch(
              API_APPROVE_PRODUCT_MOD.replace("{id}", item.productId)
            );
            set({ response: data });
          } catch (error) {
            set({ error: error.message });
          } finally {
            set({ isLoading: false });
          }
        },

        denyProduct: async (item) => {
          set({ isLoading: true });
          try {
            const { data } = await axiosClient.patch(
              API_DENY_PRODUCT_MOD.replace("{id}", item.productId)
            );
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
            // console.log(form);
            const { data } = await axiosClient.post(API_LOGIN, form);
            console.log("data", data);
            set({ userInfo: data });
          } catch (error) {
            set({ error: error.Message });
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

        // Manage Report
        getAllReports: async (pageIndex, pageSize) => {
          set({ isLoading: true });
          try {
            console.log();
            const { data } = await axiosClient.get(
              API_GET_ALL_REPORTS.replace("{PageIndex}", pageIndex).replace(
                "{PageSize}",
                pageSize
              )
            );
            set({ reportList: data });
          } catch (error) {
            set({ error: error.message });
          } finally {
            set({ isLoading: false });
          }
          // return get().userInfo;
        },

        // review report
        approveReport: async (item, isApproved) => {
          set({ isLoading: true });
          try {
            const { data } = await axiosClient.patch(
              API_APPROVE_REPORT_MOD.replace("{id}", item.reportId).replace(
                "{status}",
                isApproved
              )
            );
            set({ response: data });
          } catch (error) {
            set({ error: error.message });
          } finally {
            set({ isLoading: false });
          }
        },

        denyReport: async (item) => {
          set({ isLoading: true });
          try {
            const { data } = await axiosClient.patch(
              API_DENY_REPORT_MOD.replace("{id}", item.reportId)
            );
            set({ response: data });
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

        // SEND REPORT
        sendReportFromBuyer: async (form) => {
          set({ isLoading: true });
          try {
            console.log("Sending report data:", form); // Log the payload being sent
            const { data } = await axiosClient.post(API_POST_REPORT, form);
            set({ response: data });
            console.log("Report response:", data);
            return data; // Return the response data
          } catch (error) {
            set({ error: error.message });
            console.error(
              "Error sending report:",
              error.response?.data || error.message
            ); // Log more details on the error
            return { isSuccessed: false, message: error.message }; // Return an error response
          } finally {
            set({ isLoading: false });
          }
        },
      })),
      {
        // name: "goods-storage", // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      }
    )
  )
);

export default useStore;
