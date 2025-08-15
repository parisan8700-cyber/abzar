import { create } from "zustand";

const useAuthStore = create((set) => ({
  isLoggedIn: false, 

  login: (token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
    set({ isLoggedIn: true });
  },
  

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    set({ isLoggedIn: false });
  },

  checkAuth: () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      set({ isLoggedIn: !!token });
    }
  },
}));

export default useAuthStore;
