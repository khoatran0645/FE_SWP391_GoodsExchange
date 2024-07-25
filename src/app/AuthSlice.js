import axiosClient from "../services/axiosClient";
import { API_LOGIN, API_REGISTER } from "./../constant";

const initialState = {
  auth: false,
  userInfo: null,
  isLoading: false,
  error: null,
};

export const createAuthSlice = (set) => ({
  ...initialState,

  setAuth: (auth) => set({ auth: auth }),

  postLogin: async (form) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosClient.post(API_LOGIN, form);
      set({ userInfo: data });
    } catch (error) {
      set({ error: error.Message });
    } finally {
      set({ isLoading: false });
    }
  },

  postRegister: async (form) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosClient.post(API_REGISTER, form);
      set({ response: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
});
