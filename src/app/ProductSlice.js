import axiosClient from "../services/axiosClient";
import {
  API_GET_PRODUCTS_HOMEPAGE,
  API_CREATE_PRODUCT,
  API_GET_PRODUCT_BY_ID,
  API_GET_ALL_PRODUCT_MOD,
  API_APPROVE_PRODUCT_MOD,
  API_DENY_PRODUCT_MOD,
  API_GET_PRODUCT_SELLER,
  API_SEARCH_PRODUCTS_FOR_USER,
  API_UPDATE_PRODUCT,
} from "../constant";

const initialState = {
  isLoading: false,
  error: null,
  response: null,
  productList: null,
  productDetail: null,
  sellerProductList: null,
  searchResult: null,
};

const setLoading = (set, isLoading) => set({ isLoading });
const setError = (set, error) =>
  set({ error: { message: error.message, code: error.code } });

export const createProductSlice = (set) => ({
  ...initialState,

  getProductsForHomePage: async (pageIndex, pageSize) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.post(
        API_GET_PRODUCTS_HOMEPAGE.replace("{PageIndex}", pageIndex).replace(
          "{PageSize}",
          pageSize
        )
      );
      set({ productList: data, productDetail: null });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  getProductById: async (id) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.get(
        API_GET_PRODUCT_BY_ID.replace("{id}", id)
      );
      set({ productDetail: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  createNewProduct: async (form) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.post(API_CREATE_PRODUCT, form);
      set({ response: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  postAllProduct: async (pageIndex, pageSize) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.post(
        API_GET_ALL_PRODUCT_MOD.replace("{PageIndex}", pageIndex).replace(
          "{PageSize}",
          pageSize
        )
      );
      set({ productList: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  approveProduct: async (productId) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.patch(
        API_APPROVE_PRODUCT_MOD.replace("{id}", productId)
      );
      set({ response: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  denyProduct: async (productId) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.patch(
        API_DENY_PRODUCT_MOD.replace("{id}", productId)
      );
      set({ response: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  getSellerProduct: async () => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.post(API_GET_PRODUCT_SELLER);
      set({ sellerProductList: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  getSearchProductForUser: async (keyword) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.post(
        API_SEARCH_PRODUCTS_FOR_USER.replace("{keyword}", keyword)
      );
      set({ searchResult: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  updateProduct: async (form) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.put(API_UPDATE_PRODUCT, form);
      set({ response: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },
});
