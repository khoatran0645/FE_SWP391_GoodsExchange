import axiosClient from "../services/axiosClient";
import toast from "react-hot-toast";

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
      const { data } = await axiosClient.get("/Exchange/send-request-list");
      set({ getRequestListData: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
});
