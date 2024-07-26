import axiosClient from "../services/axiosClient";
import { toast } from "react-toastify";
import {
  API_POST_REPORT,
  API_GET_ALL_REPORTS,
  API_APPROVE_REPORT_MOD,
  API_DENY_REPORT_MOD,
} from "./../constant";

const initialState = {
  response: null,
  reportList: null,
  isLoading: false,
  error: null,
};

export const createReportSlice = (set) => ({
  ...initialState,

  // SEND REPORT
  sendReportFromBuyer: async (form) => {
    set({ isLoading: true });
    try {
      console.log("Sending report data:", form);
      const { data } = await axiosClient.post(API_POST_REPORT, form);
      toast.success(
        "Report created successfully. Please wait for Moderator approval."
      );
      set({ response: data });
      console.log("Report response:", data);
    } catch (error) {
      set({ error: error.message });
      console.error(
        "Error sending report:",
        error.response?.data || error.message
      );
      return { isSuccessed: false, message: error.message };
    } finally {
      set({ isLoading: false });
    }
  },
  // Manage Report
  getAllReports: async (pageIndex, pageSize) => {
    set({ isLoading: true });
    try {
      console.log();
      const { data } = await axiosClient.get(
        API_GET_ALL_REPORTS.replace("{PageIndex}", pageIndex).replace(
          "{PageSize}",
          pageSize
        )
      );
      set({ reportList: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  // review report
  approveReport: async (item, isApproved) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosClient.patch(
        API_APPROVE_REPORT_MOD.replace("{id}", item.reportId).replace(
          "{status}",
          isApproved
        )
      );
      set({ response: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  denyReport: async (item) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosClient.patch(
        API_DENY_REPORT_MOD.replace("{id}", item.reportId)
      );
      set({ response: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
});
