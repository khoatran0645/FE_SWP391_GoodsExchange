import axiosClient from "../services/axiosClient";
import { API_USER_PROFILE_ID, API_UPDATE_PROFILE, API_CHANGING_PASSWORD } from "./../constant";

const initialState = {
  isLoading: false,
  error: null,
  userProfile: null,
};

export const createUserSlice = (set) => ({
  ...initialState,

  getProfileUserById: async (id) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosClient.get(API_USER_PROFILE_ID.replace("{id}", id));
      set({ userProfile: data.data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfileUser: async (form) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosClient.put(API_UPDATE_PROFILE, form);
      set({ userProfile: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  changingPasswordOfCurrentlyUser: async (form) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosClient.patch(API_CHANGING_PASSWORD, form);
      set({ response: data });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const validationErrors = error.response.data.errors;
        set({ error: validationErrors });
      } else {
        set({ error: error.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },
});
