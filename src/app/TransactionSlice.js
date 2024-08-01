import axiosClient from "../services/axiosClient";
import {
    
    API_GET_TRANSACTIONS_COMPLETE,
  } from "../constant";

const initialState = {
    response: null,
    getSData: null,
    getTransactionsCompleteList: null,
    isLoading: false,
    error: null,
  };
  
  const setLoading = (set, isLoading) => set({ isLoading });
  const setError = (set, error) =>
    set({ error: { message: error.message, code: error.code } });

  export const createTransactionSlice = (set) => ({
    ...initialState,
  getTransactionsCompleteList: async () => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.post(API_GET_TRANSACTIONS_COMPLETE);
      set({ transactionCompleteData: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },
});