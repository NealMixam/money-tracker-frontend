import { http } from "./http";

export const authApi = {
  register(payload) {
    return http.post("/register", payload);
  },
  login(payload) {
    return http.post("/login", payload);
  },
  me() {
    return http.get("/me");
  },
};
