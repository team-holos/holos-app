import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  token: null,
  setToken: (token) => set({ token }),
  //isLoggedIn: () => !!get().token,
  isLoggedIn: () => {return true},
  clearToken: () => set({ token: null }),
}));

export default useAuthStore;