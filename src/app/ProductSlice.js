import axiosClient from "../services/axiosClient";
import {
  API_GET_PRODUCTS_HOMEPAGE,
  API_CREATE_PRODUCT,
  API_GET_PRODUCT_BY_ID,
  API_GET_ALL_PRODUCT_MOD,
  API_APPROVE_PRODUCT_MOD,
  API_DENY_PRODUCT_MOD,
  API_GET_PRODUCT_SELLER,
  API_GET_ALL_CATEGORIES,
  API_SEARCH_PRODUCTS_FOR_USER,
} from "./../constant";

const initialState = {
  isLoading: false,
  error: null,
  productList: null,
  productDetail: null,
  sellerProductList: null,
};

export const createProductSlice = (set) => ({
  ...initialState,

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
      const { data } = await axiosClient.post(API_CREATE_PRODUCT, form);
      set({ response: data });
    } catch (error) {
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },

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
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

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

  getSellerProduct: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axiosClient.post(API_GET_PRODUCT_SELLER);
      set({ sellerProductList: data });
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
});
