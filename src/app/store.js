import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { createAuthSlice } from "./AuthSlice";
import { createProductSlice } from "./ProductSlice";
import { createUserSlice } from "./UserSlice";

const useStore = create(
  devtools(
    persist(
      immer((set) => ({
        ...createAuthSlice(set),
        ...createProductSlice(set),
        ...createUserSlice(set),

        reset: () =>
          set((state) => {
            state.auth = false;
            state.userInfo = null;
            state.isLoading = false;
            state.error = null;
            state.productList = null;
            state.productDetail = null;
            state.userProfile = null;
            state.sellerProductList = null;
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
