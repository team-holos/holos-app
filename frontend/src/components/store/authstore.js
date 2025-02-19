import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  token: localStorage.getItem("token") || null, // Ensure token is retrieved on app start
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },
  isLoggedIn: () => !!get().token, // Returns true if token exists
  clearToken: () => {
    localStorage.removeItem("token");
    set({ token: null });
  },
}));

export default useAuthStore;



