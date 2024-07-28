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
  userInfo: null,
  auth: false,
  response: null,
};

export const createUserSlice = (set) => ({
  ...initialState,

  setAuth: (auth) => set({ auth: auth }),

  postLogin: async (form) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.post(API_LOGIN, form);
      set({ userInfo: data });
      set({ auth: true });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  postRegister: async (form) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.post(API_REGISTER, form);
      set({ response: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  getProfileUserById: async (id) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.get(
        API_USER_PROFILE_ID.replace("{id}", id)
      );
      set({ userProfile: data.data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  updateProfileUser: async (form) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.put(API_UPDATE_PROFILE, form);
      set({ response: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  changingPasswordOfCurrentlyUser: async (form) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.patch(API_CHANGING_PASSWORD, form);
      set({ response: data });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const validationErrors = error.response.data.errors;
        set({ error: validationErrors });
      } else {
        setError(set, error);
      }
    } finally {
      setLoading(set, false);
    }
  },

  // ADMIN API
  postListModerator: async (pageIndex, pageSize) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.post(
        API_GET_ALL_MODERATOR_LIST.replace("{PageIndex}", pageIndex).replace(
          "{PageSize}",
          pageSize
        )
      );
      set({ moderatorList: data.data.items });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  postCreateModeratorAccount: async (form) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.post(
        API_CREATE_MODERATOR_ACCOUNT,
        form
      );
      set({ response: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  // DEACTIVATE MODERATOR
  patchStatusModerator: async (id, isActive) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.patch(
        API_PATCH_STATUS_MODERATOR.replace("{id}", id).replace(
          "{status}",
          isActive
        )
      );
      set({ response: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },
});
