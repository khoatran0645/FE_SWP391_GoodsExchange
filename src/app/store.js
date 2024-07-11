import { create } from "zustand";
import axiosClient from "../services/axiosClient";
import { immer } from "zustand/middleware/immer";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import {
  API_GET_ALL_MODERATOR_LIST,
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
  API_REGISTER,
  API_USER_PROFILE_ID,
  API_CREATE_MODERATOR_ACCOUNT,
  API_UPDATE_PROFILE,
  API_POST_RATING,


  API_CHANGING_PASSWORD,

  API_PATCH_STATUS_MODERATOR,

} from "./../constant";
import { toast } from "react-toastify";

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

        // USERPROFILE
        getProfileUserById: async (id) => {
          set({ isLoading: true });

          try {
            const { data } = await axiosClient.get(
              API_USER_PROFILE_ID.replace("{id}", id)
            );

            set({ userProfile: data.data });
          } catch (error) {
            set({ error: error.message });
          } finally {
            set({ isLoading: false });
          }
        },
        UpdateProfileUser: async (form) => {
          set({ isLoading: true });

          try {
            const { data } = await axiosClient.put(API_UPDATE_PROFILE, form);

            set({ UserProfile: data });
          } catch (error) {
            set({ error: error.message });
          } finally {
            set({ isLoading: false });
          }
        },

        ChangingPasswordOfCurrentlyUser: async (form) => {
          set({ isLoading: true });

          try {
            const { data } = await axiosClient.patch(
              API_CHANGING_PASSWORD,
              form
            );

            set({ ChangingPassword: data });
          } catch (error) {
            if (error.response && error.response.status === 400) {
              // Extract validation errors
              const validationErrors = error.response.data.errors;
              set({ error: validationErrors });
            } else {
              set({ error: error.message });
            }
          } finally {
            set({ isLoading: false });
          }
        },

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
            // console.log("productList", data);
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
            // console.log("form", form);
            const { data } = await axiosClient.post(API_CREATE_PRODUCT, form);
            // toast.success(
            //   "Product created successfully. Please wait for Moderator approval."
            // );
            set({ response: data });
          } catch (error) {
            console.log("error", error);
            set({ error: error });
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
        // ADMIN API
        postListModerator: async (pageIndex, pageSize) => {
          set({ isLoading: true });
          try {
            const { data } = await axiosClient.post(
              API_GET_ALL_MODERATOR_LIST.replace(
                "{PageIndex}",
                pageIndex
              ).replace("{PageSize}", pageSize)
            );
            set({ moderatorList: data.data.items });
          } catch (error) {
            set({ error: error.message });
          } finally {
            set({ isLoading: false });
          }
        },

        postCreateModeratorAccount: async (form) => {
          set({ isLoading: true });
          try {
            const { data } = await axiosClient.post(
              API_CREATE_MODERATOR_ACCOUNT,
              form
            );
            // toast.success("");
            set({ response: data });
          } catch (error) {
            set({ error: error.message });
          } finally {
            set({ isLoading: false });
          }
        },

        postLogin: async (form) => {
          set({ isLoading: true });
          try {
            // console.log(form);
            const { data } = await axiosClient.post(API_LOGIN, form);
            // console.log("data", data);
            set({ userInfo: data });
          } catch (error) {
            set({ error: error.Message });
          } finally {
            set({ isLoading: false });
          }
          // return get().userInfo;
        },
        // registerAPI
        postRegister: async (form) => {
          set({ isLoading: true });
          try {
            const { data } = await axiosClient.post(API_REGISTER, form);
            toast.success("");
            set({ response: data });
          } catch (error) {
            set({ error: error.message });
          } finally {
            set({ isLoading: false });
          }
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

        //API Rating
        sendRatingFromBuyer: async (form) => {
          set({ isLoading: true });
          try {
            console.log("Sending rating data:", form);
            const { data } = await axiosClient.post(API_POST_RATING, form);
            toast.success(
              "Rating created successfully"
            );
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
            const { data } = await axiosClient.post(
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
            const { data } = await axiosClient.post(
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
            console.log("Sending report data:", form);
            const { data } = await axiosClient.post(API_POST_REPORT, form);
            toast.success(
              "Report created successfully. Please wait for Moderator approval."
            );
            set({ response: data });
            console.log("Report response:", data);
          } catch (error) {
            set({ error: error.message });
            console.error(
              "Error sending report:",
              error.response?.data || error.message
            );
            return { isSuccessed: false, message: error.message };
          } finally {
            set({ isLoading: false });
          }
        },
        // DEACTIVE MODERATOR
        patchStatusModerator: async (id, isAcive) => {
          set({ isLoading: true });
          try {
            const { data } = await axiosClient.patch(
              API_PATCH_STATUS_MODERATOR,
              { id: id, status: isAcive }
            );
            set({ response: data });
          } catch (error) {
            set({ error: error.message });
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
