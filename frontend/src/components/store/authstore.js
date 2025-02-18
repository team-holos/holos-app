import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  token: null,
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },
  isLoggedIn: () => !!get().token,
  clearToken: () => {
    localStorage.removeItem("token");
    set({ token: null });
  },
}));

useAuthStore.getState().setToken(localStorage.getItem("token"));

export default useAuthStore;

