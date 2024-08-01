import axiosClient from "../services/axiosClient";
import {
  API_SEND_TRADE_REQUEST,
  API_GET_ALL_REQUEST_TRADE_LIST,
  API_GET_ALL_RECEIVE_TRADE_LIST,
  API_APPROVE_TRADE,
  API_DENY_TRADE,
  API_GET_ALL_CANCEL_REQUEST_TRADE_LIST,
  API_GET_TRANSACTIONS_COMPLETE,
} from "../constant";

const initialState = {
  response: null,
  getRequestListData: null,
  getReceiveTradeData: null,
  isLoading: false,
  error: null,
};

const setLoading = (set, isLoading) => set({ isLoading });
const setError = (set, error) =>
  set({ error: { message: error.message, code: error.code } });

export const createExchangeSlice = (set) => ({
  ...initialState,

  // Create Exchange
  sendRequest: async (form) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.post(API_SEND_TRADE_REQUEST, form);
      console.log(data);
      set({ response: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  getRequestList: async () => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.get(API_GET_ALL_REQUEST_TRADE_LIST);
      set({ getRequestListData: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  getReceiveList: async () => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.get(API_GET_ALL_RECEIVE_TRADE_LIST);
      set({ getReceiveTradeData: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  getCancelRequestList: async () => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.get(
        API_GET_ALL_CANCEL_REQUEST_TRADE_LIST
      );
      set({ getCancelTradeData: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  // Approve trade
  approveTrade: async (requestId) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.post(
        API_APPROVE_TRADE.replace("{requestId}", requestId)
      );
      set({ response: data });
      console.log("approveTrade: ", data);
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  // Deny trade
  denyTrade: async (requestId) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.post(
        API_DENY_TRADE.replace("{requestId}", requestId)
      );
      set({ response: data });
      console.log("denyTrade: ", data);
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  //get Transaction Complete
  getTransactionsCompleteList: async () => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.get(API_GET_TRANSACTIONS_COMPLETE);
      set({ transactionCompleteData: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },
});
