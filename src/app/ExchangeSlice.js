import { API_GET_ALL_REQUEST_TRADE_LIST } from "../constant";
import axiosClient from "../services/axiosClient";
// import toast from "react-hot-toast";

const initialState = {
  response: null,
  getRequestListData: null,
  isLoading: false,
  error: null,
};

export const createExchangeSlice = (set) => ({
  ...initialState,

  //Create Exxchange
  SendRequest: async (form) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosClient.post("/Exchange/send-request", form);
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
});
