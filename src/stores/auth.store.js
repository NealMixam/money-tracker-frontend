import { defineStore } from "pinia";
import { authApi } from "@/api/auth.api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
    isLoading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async register(payload) {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await authApi.register(payload);
        this.setToken(data.token);
        await this.fetchMe();
      } catch (e) {
        this.error = e.message;
        throw e;
      } finally {
        this.isLoading = false;
      }
    },

    async login(payload) {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await authApi.login(payload);
        this.setToken(data.token);
        await this.fetchMe();
      } catch (e) {
        this.error = e.message;
        throw e;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchMe() {
      const user = await authApi.me();
      this.user = user;
    },

    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
    },

    async init() {
      if (this.token) {
        try {
          await this.fetchMe();
        } catch {
          this.logout();
        }
      }
    },
  },
});
