import axiosClient from "../services/axiosClient";
import { toast } from "react-toastify";
import {
  API_POST_REPORT,
  API_GET_ALL_REPORTS,
  API_APPROVE_REPORT_MOD,
  API_DENY_REPORT_MOD,
} from "../constant";

const initialState = {
  response: null,
  reportList: null,
  isLoading: false,
  error: null,
};

const setLoading = (set, isLoading) => set({ isLoading });
const setError = (set, error) => set({ error: { message: error.message, code: error.code } });

export const createReportSlice = (set) => ({
  ...initialState,

  // SEND REPORT
  sendReportFromBuyer: async (form) => {
    setLoading(set, true);
    try {
      console.log("Sending report data:", form);
      const { data } = await axiosClient.post(API_POST_REPORT, form);
      toast.success("Report created successfully. Please wait for Moderator approval.");
      set({ response: data });
      console.log("Report response:", data);
      return { isSuccessed: true, message: "Report created successfully" };
    } catch (error) {
      setError(set, error);
      console.error("Error sending report:", error.response?.data || error.message);
      return { isSuccessed: false, message: error.message };
    } finally {
      setLoading(set, false);
    }
  },

  // Manage Report
  getAllReports: async (pageIndex, pageSize) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.get(
        API_GET_ALL_REPORTS.replace("{PageIndex}", pageIndex).replace("{PageSize}", pageSize)
      );
      set({ reportList: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  // Review report
  approveReport: async (item, isApproved) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.patch(
        API_APPROVE_REPORT_MOD.replace("{id}", item.reportId).replace("{status}", isApproved)
      );
      set({ response: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  denyReport: async (item) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.patch(
        API_DENY_REPORT_MOD.replace("{id}", item.reportId)
      );
      set({ response: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },
});
