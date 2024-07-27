import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { createProductSlice } from "./ProductSlice";
import { createUserSlice } from "./UserSlice";
import { createReportSlice } from "./ReportSlice";
import { createCategorySlice } from "./CategorySlice";
import { createRatingSlice } from "./RatingSlice";
import { createExchangeSlice } from "./ExchangeSlice";

const useStore = create(
  devtools(
    persist(
      immer((set) => ({
        ...createCategorySlice(set),
        ...createProductSlice(set),
        ...createUserSlice(set),
        ...createRatingSlice(set),
        ...createReportSlice(set),
        ...createExchangeSlice(set),

        reset: () =>
          set((state) => {
            state.auth = false;
            state.userInfo = null;
            state.isLoading = false;
            state.response = null;
            state.error = null;
            state.productList = null;
            state.productDetail = null;
            state.userProfile = null;
            state.sellerProductList = null;
            state.reportList = null;
          }),

        toggleMode: () =>
          set((state) => ({
            colorMode: state.colorMode === "light" ? "dark" : "light",
          })),
      })),
      {
        // name: "goods-storage",
        // storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export default useStore;
