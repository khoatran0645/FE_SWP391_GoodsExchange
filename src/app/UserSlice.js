import axiosClient from "../services/axiosClient";
import {
  API_LOGIN,
  API_REGISTER,
  API_USER_PROFILE_ID,
  API_UPDATE_PROFILE,
  API_CHANGING_PASSWORD,
  API_GET_ALL_MODERATOR_LIST,
  API_CREATE_MODERATOR_ACCOUNT,
  API_PATCH_STATUS_MODERATOR,
} from "./../constant";

const initialState = {
  isLoading: false,
  error: null,
  userProfile: null,
  auth: false,
  response: null,
};

export const createUserSlice = (set) => ({
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

  updateProfileUser: async (form) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosClient.put(API_UPDATE_PROFILE, form);
      set({ response: data });
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
  // ADMIN API
  postListModerator: async (pageIndex, pageSize) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosClient.post(
        API_GET_ALL_MODERATOR_LIST.replace("{PageIndex}", pageIndex).replace(
          "{PageSize}",
          pageSize
        )
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

      set({ response: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  // DEACTIVE MODERATOR
  patchStatusModerator: async (id, isAcive) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosClient.patch(
        API_PATCH_STATUS_MODERATOR.replace("{id}", id).replace(
          "{status}",
          isAcive
        )
      );
      set({ response: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
});
