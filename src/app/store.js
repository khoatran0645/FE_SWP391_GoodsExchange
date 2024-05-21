import { create } from "zustand";

export const useStore = create((set) => ({
  colorMode: "light",
  toggleMode: () =>
    set((state) => ({ colorMode: state.colorMode === "light" ? "dark" : "light" })),
  auth: false,
  toggleAuth: () => set((state) => ({ auth: !state.auth })),
}));
