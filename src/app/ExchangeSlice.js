import axiosClient from "../services/axiosClient";
import {
  API_SEND_TRADE_REQUEST,
  API_GET_ALL_REQUEST_TRADE_LIST,
} from "../constant";
// import toast from "react-hot-toast";

const initialState = {
  response: null,
  getRequestListData: null,
  isLoading: false,
  error: null,
};

export const createExchangeSlice = (set) => ({
  ...initialState,

  // Create Exchange
  sendRequest: async (form) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosClient.post(API_SEND_TRADE_REQUEST, form);
      set({ response: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  getRequestList: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axiosClient.get(API_GET_ALL_REQUEST_TRADE_LIST);
      set({ getRequestTradeData: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  getReceiveList: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axiosClient.get(API_GET_ALL_RECEIVE_TRADE_LIST);
      set({ getReceiveTradeData: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
});
