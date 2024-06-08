import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { router } from "@/helpers/router.ts";
import { IUser } from "@/types/User.ts";
import { baseUrl } from "@/api/baseUrl.ts";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user") as string) as IUser | null,
    returnUrl: null,
  }),
  actions: {
    async login(login: string, password: string) {
      const response = await fetchWrapper.post(`${baseUrl}/auth/login`, {
        login,
        password,
      });

      this.user = response;

      localStorage.setItem("user", JSON.stringify(response));

      await router.push(this.returnUrl || "/");
    },
    async register(login: string, password: string) {
      const response = await fetchWrapper.post(`${baseUrl}/auth/register`, {
        login,
        password,
      });

      this.user = response;

      localStorage.setItem("user", JSON.stringify(response));

      await router.push(this.returnUrl || "/");
    },
    async logout() {
      this.user = null;
      localStorage.removeItem("user");
      await router.push("/");
    },
    async updateDiscountBalance(bonus: number, discount: number = 0) {
      if (this.user) {
        const updatedUser = {
          ...this.user,
          discountBalance: this.user.discountBalance - discount + bonus,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        this.user = updatedUser;
      }
    },
  },
});
